#!/bin/bash
# =============================================================================
# migrate-images.sh — скачивает все картинки с CDN и заменяет ссылки в коде
# Использование: bash scripts/migrate-images.sh
# =============================================================================

set -e

IMAGES_DIR="public/images"
SRC_FILE="src/pages/Index.tsx"

echo "→ Создаём папку $IMAGES_DIR"
mkdir -p "$IMAGES_DIR"

# Список всех CDN-ссылок
URLS=(
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/49a9383e-fa69-46f1-a618-b4beda50fd1e.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/05467dc2-9496-46b9-b7ca-d2b982e53b11.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/7ed2157e-51d8-4cd0-817b-40ae29cbb681.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/b28b6b6f-2dbd-4393-95f1-88529e441bf1.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/7522e5a5-00cd-4285-9572-ff923a5b251d.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/d5d571af-6a7c-405e-b22c-0c739ba77d1b.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/f92e8f1b-a945-47c3-9d46-aa1ce75fafb3.png"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/56643ce7-a7be-4d71-b2a5-e031833b8901.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/1dcd3797-4bb8-445a-bb4b-626aab2a2cbd.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/b1395206-2a22-484f-9626-c1afe019ace9.jpg"
  "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/84741645-38d5-4d64-91d8-2d42516b863b.jpg"
  "https://cdn.poehali.dev/files/3bbca03a-1d6c-48ec-972c-2c622e394360.png"
  "https://cdn.poehali.dev/files/5e7dd13e-a840-4073-88dc-fbb32cab61c2.png"
  "https://cdn.poehali.dev/files/9fdfe580-3c4f-4a3a-849b-f73586a4dd9a.png"
  "https://cdn.poehali.dev/files/250f3905-20a1-47cd-aa4e-f5a47561992c.png"
  "https://cdn.poehali.dev/files/2e77adc5-8061-45cc-930e-b31d88a00664.png"
  "https://cdn.poehali.dev/files/d3be9dcd-8e1b-46b6-8595-f67712a3e37c.png"
  "https://cdn.poehali.dev/files/6090d6e1-3f6a-49e3-93b9-7b1a6fb268c0.png"
  "https://cdn.poehali.dev/files/0f672596-714b-43f7-9d42-d594727be277.png"
  "https://cdn.poehali.dev/files/d4abd92f-d58d-4dc4-8f54-27cb64e83df3.png"
  "https://cdn.poehali.dev/files/b20eabde-e5be-4397-bb4b-8f2e394c5031.jpg"
  "https://cdn.poehali.dev/files/02077f24-a23c-42f7-855b-315f1b6667e8.png"
  "https://cdn.poehali.dev/files/5cd0de12-0ff2-4d1e-8afe-3b490e178dab.png"
  "https://cdn.poehali.dev/files/dda84f56-873a-4b83-ae02-8ee1f5715ee0.png"
  "https://cdn.poehali.dev/files/08ef7a6a-a14f-4c96-ad0b-a122b373b4b0.png"
  "https://cdn.poehali.dev/files/cafcd858-3c57-4a75-8c5e-3361f92fdec9.png"
)

echo ""
echo "→ Скачиваем ${#URLS[@]} картинок..."
echo ""

for URL in "${URLS[@]}"; do
  FILENAME=$(basename "$URL")
  DEST="$IMAGES_DIR/$FILENAME"

  if [ -f "$DEST" ]; then
    echo "  [пропуск] $FILENAME (уже есть)"
  else
    echo "  [скачиваю] $FILENAME"
    curl -fsSL "$URL" -o "$DEST"
  fi
done

echo ""
echo "→ Заменяем ссылки в $SRC_FILE"

# Делаем резервную копию
cp "$SRC_FILE" "${SRC_FILE}.backup"

# Заменяем все CDN-ссылки на локальные /images/имя-файла
sed -i 's|https://cdn\.poehali\.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/\([^"]*\)"|/images/\1"|g' "$SRC_FILE"
sed -i 's|https://cdn\.poehali\.dev/files/\([^"]*\)"|/images/\1"|g' "$SRC_FILE"

echo ""
echo "✓ Готово! Проверь результат:"
echo "  - Картинки: $IMAGES_DIR/ ($(ls $IMAGES_DIR | wc -l) файлов)"
echo "  - Резервная копия кода: ${SRC_FILE}.backup"
echo ""
echo "Следующий шаг — пересобери билд:"
echo "  npm run build"
