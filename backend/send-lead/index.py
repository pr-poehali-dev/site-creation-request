import os
import json
import urllib.request


def handler(event: dict, context) -> dict:
    """Прокси: принимает заявку с сайта и отправляет её через relay API в Telegram"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    call_time = body.get("callTime", "").strip()
    source = body.get("source", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    api_key = os.environ.get("RELAY_API_KEY", "")
    if not api_key:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Relay API не настроен"}),
        }

    lines = [
        "Новая заявка с сайта",
        "",
        f"Имя: {name}",
        f"Телефон: {phone}",
        f"Когда перезвонить: {call_time or 'не указано'}",
    ]
    if source:
        lines.append(f"Источник: {source}")

    text = "\n".join(lines)
    payload = json.dumps({"text": text}).encode("utf-8")

    req = urllib.request.Request(
        "http://80.76.33.199:8081/send",
        data=payload,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            relay_resp = resp.read()
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        return {
            "statusCode": 502,
            "headers": cors_headers,
            "body": json.dumps({"error": "Relay API error", "details": error_body}),
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
