import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SEND_LEAD_URL = "https://functions.poehali.dev/9cf5e35e-11a2-4c0b-9b02-347ea38ec4c8";
const CONFIRM_CODE = "3462";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
}

export default function LeadModal({ open, onClose, source }: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (open) {
      setName("");
      setPhone("");
      setCode("");
      setSent(false);
      setError("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollYRef.current = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyWidth = body.style.width;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.width = "100%";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.width = prevBodyWidth;
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" as ScrollBehavior });
    };
  }, [open, onClose]);

  const codeOk = code.trim() === CONFIRM_CODE;
  const canSubmit = !!(name.trim() && phone.trim() && codeOk && !loading);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    if (!codeOk) {
      setError("Неверный код подтверждения");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = JSON.stringify({ name: name.trim(), phone: phone.trim(), callTime: "Как можно скорее", source });
      // text/plain не вызывает preflight OPTIONS — обходит CORS на preview-домене
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: payload,
      });
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // тело не распарсилось — считаем успехом если статус 2xx
        if (res.ok) {
          data = { ok: true };
        }
      }
      if (data.ok) {
        setSent(true);
        // Цель Яндекс.Метрики — только после успешной отправки
        type YmFn = (id: number, action: string, goal: string) => void;
        const w = window as Window & { ym?: YmFn };
        if (w.ym) w.ym(108595408, "reachGoal", "form_submit");
      } else {
        setError(data.error || "Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch (e) {
      console.error("[LeadModal] fetch error:", e);
      setError("Ошибка соединения. Проверьте интернет и попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const inp: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    minWidth: 0,
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    padding: "0.6rem 0.85rem",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: "#111827",
    outline: "none",
    background: "#fff",
    display: "block",
    appearance: "none" as const,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "1rem 0",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 16,
        width: "92%",
        maxWidth: 420,
        margin: "0 auto",
        padding: "1.5rem",
        position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        boxSizing: "border-box",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 12,
            background: "none", border: "none", cursor: "pointer",
            padding: 6, borderRadius: 6, color: "#9CA3AF", lineHeight: 0,
          }}
        >
          <Icon name="X" size={18} />
        </button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111827", marginBottom: 8 }}>
              Заявка отправлена!
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#6B7280" }}>
              Мы свяжемся с вами в ближайшее время
            </div>
            <button onClick={onClose} style={{
              marginTop: "1.5rem", background: "#2563EB", color: "#fff",
              border: "none", borderRadius: 8, padding: "0.65rem 2rem",
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem",
              cursor: "pointer",
            }}>
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <div style={{
              fontFamily: "Inter, sans-serif", fontWeight: 700,
              fontSize: "1.1rem", color: "#111827", marginBottom: "1.25rem",
              paddingRight: "1.5rem",
            }}>
              Получить консультацию бесплатно
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div>
                <label style={labelStyle}>Имя</label>
                <input
                  style={inp}
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div>
                <label style={labelStyle}>Телефон</label>
                <input
                  style={inp}
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              {/* Блок получения кода */}
              <div style={{
                background: "#FFF7ED",
                border: "1px solid #FED7AA",
                borderRadius: 10,
                padding: "0.85rem 1rem",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <Icon name="Phone" size={16} style={{ color: "#EA580C", flexShrink: 0, marginTop: 2 }} />
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.82rem",
                    color: "#92400E",
                    margin: 0,
                    lineHeight: "1.4",
                  }}>
                    Чтобы получить код подтверждения, позвоните по номеру{" "}
                    <a
                      href="tel:+74999612341"
                      style={{
                        color: "#EA580C",
                        fontWeight: 700,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      +7 (499) 961-23-41
                    </a>
                    . Робот продиктует код.
                  </p>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Код подтверждения</label>
                <input
                  style={{
                    ...inp,
                    borderColor: code && !codeOk ? "#EF4444" : code && codeOk ? "#22C55E" : "#D1D5DB",
                    letterSpacing: "0.15em",
                  }}
                  placeholder="Введите код"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="off"
                />
                {code && !codeOk && (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#EF4444", margin: "4px 0 0" }}>
                    Неверный код подтверждения
                  </p>
                )}
              </div>

              {error && (
                <div style={{ color: "#EF4444", fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  background: canSubmit ? "#2563EB" : "#D1D5DB",
                  color: canSubmit ? "#fff" : "#9CA3AF",
                  border: "none", borderRadius: 8,
                  padding: "0.75rem",
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "Inter, sans-serif", fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  transition: "background 0.2s, color 0.2s",
                  marginTop: 4,
                }}
              >
                {loading ? "Отправляем..." : "Отправить"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}