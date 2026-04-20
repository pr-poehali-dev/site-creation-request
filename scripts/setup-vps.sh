#!/bin/bash
# =============================================================================
# setup-vps.sh — полная установка сайта на VPS (Ubuntu 24 + Nginx + Python)
# Запускать на VPS: bash setup-vps.sh твой-домен.ru
# =============================================================================

set -e

DOMAIN=${1:-"localhost"}
SITE_DIR="/var/www/site"
LEAD_DIR="/var/www/lead-api"

echo ""
echo "======================================================"
echo "  Установка сайта: $DOMAIN"
echo "======================================================"
echo ""

# ── 1. Node.js ────────────────────────────────────────────
echo "→ [1/6] Устанавливаем Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "  Node.js $(node -v) установлен"

# ── 2. Папки ──────────────────────────────────────────────
echo ""
echo "→ [2/6] Создаём папки..."
sudo mkdir -p "$SITE_DIR"
sudo mkdir -p "$LEAD_DIR"
sudo chown -R $USER:$USER "$SITE_DIR" "$LEAD_DIR"
echo "  Папки созданы: $SITE_DIR, $LEAD_DIR"

# ── 3. Python-зависимости для формы заявок ────────────────
echo ""
echo "→ [3/6] Устанавливаем Flask и зависимости..."
pip install flask requests gunicorn 2>/dev/null || pip3 install flask requests gunicorn
echo "  Flask установлен"

# ── 4. Создаём форму заявок ───────────────────────────────
echo ""
echo "→ [4/6] Создаём API формы заявок..."

cat > "$LEAD_DIR/app.py" << 'PYEOF'
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Настройки Telegram — задай через переменные окружения:
#   export TELEGRAM_TOKEN="токен-твоего-бота"
#   export TELEGRAM_CHAT_ID="твой-chat-id"
TELEGRAM_TOKEN  = os.environ.get("TELEGRAM_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

def cors(resp, code=200):
    resp.headers["Access-Control-Allow-Origin"]  = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp, code

@app.route("/lead", methods=["POST", "OPTIONS"])
def lead():
    if request.method == "OPTIONS":
        return cors(jsonify({}))

    data = request.get_json(silent=True) or {}
    name     = data.get("name", "—")
    phone    = data.get("phone", "—")
    source   = data.get("source", "—")
    callTime = data.get("callTime", "—")

    text = (
        f"🏠 Новая заявка!\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Источник: {source}\n"
        f"Время звонка: {callTime}"
    )

    if TELEGRAM_TOKEN and TELEGRAM_CHAT_ID:
        try:
            requests.post(
                f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                json={"chat_id": TELEGRAM_CHAT_ID, "text": text},
                timeout=5
            )
        except Exception as e:
            print(f"Telegram error: {e}")

    return cors(jsonify({"ok": True}))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
PYEOF

echo "  app.py создан в $LEAD_DIR"

# ── 5. Создаём systemd-сервис для Flask ──────────────────
echo ""
echo "→ [5/6] Регистрируем сервис lead-api..."

sudo tee /etc/systemd/system/lead-api.service > /dev/null << EOF
[Unit]
Description=Lead API (форма заявок)
After=network.target

[Service]
User=$USER
WorkingDirectory=$LEAD_DIR
ExecStart=$(which gunicorn) -w 2 -b 127.0.0.1:5000 app:app
Restart=always
Environment="TELEGRAM_TOKEN="
Environment="TELEGRAM_CHAT_ID="

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable lead-api
sudo systemctl start lead-api
echo "  Сервис lead-api запущен"

# ── 6. Nginx ──────────────────────────────────────────────
echo ""
echo "→ [6/6] Настраиваем Nginx для $DOMAIN..."

sudo tee /etc/nginx/sites-available/site > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    root $SITE_DIR/dist;
    index index.html;

    # Статика с кешированием
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    # SPA — все пути на index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Форма заявок → Flask
    location /lead {
        proxy_pass http://127.0.0.1:5000/lead;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/site /etc/nginx/sites-enabled/site
sudo nginx -t && sudo systemctl reload nginx
echo "  Nginx настроен"

echo ""
echo "======================================================"
echo "  Готово! Что дальше:"
echo "======================================================"
echo ""
echo "1. Залей исходники сайта в $SITE_DIR"
echo "   (скачай zip через Скачать → Скачать код, распакуй)"
echo ""
echo "2. В файле src/pages/Index.tsx замени URL формы:"
echo '   const SEND_LEAD_URL = "https://'"$DOMAIN"'/lead";'
echo ""
echo "3. Скачай картинки (запусти на своей машине):"
echo "   bash scripts/migrate-images.sh"
echo "   npm run build"
echo "   scp -r dist/ user@$DOMAIN:$SITE_DIR/"
echo ""
echo "4. Добавь токен Telegram в сервис:"
echo "   sudo nano /etc/systemd/system/lead-api.service"
echo "   # Вставь TELEGRAM_TOKEN и TELEGRAM_CHAT_ID"
echo "   sudo systemctl daemon-reload && sudo systemctl restart lead-api"
echo ""
echo "5. Для HTTPS (рекомендуется):"
echo "   sudo apt install certbot python3-certbot-nginx"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
