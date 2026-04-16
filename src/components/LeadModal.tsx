import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SEND_LEAD_URL = "https://functions.poehali.dev/9cf5e35e-11a2-4c0b-9b02-347ea38ec4c8";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 9);
const MINUTES = [0, 10, 20, 30, 40, 50];

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
}

export default function LeadModal({ open, onClose, source }: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [callMode, setCallMode] = useState<"asap" | "custom">("asap");
  const [callHour, setCallHour] = useState("9");
  const [callMin, setCallMin] = useState("0");
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (open) {
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setName("");
      setPhone("");
      setCallMode("asap");
      setCallHour("9");
      setCallMin("0");
      setSent(false);
      setError("");
    }
  }, [open]);

  // Блокировка body-скролла без position:fixed (избегаем iOS-глюков)
  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;

    // Единственный надёжный способ на iOS без смещения layout:
    // touch-action на body + overflow hidden на html
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    // Фиксируем ширину body явно, чтобы не схлопнулась при скрытии скроллбара
    body.style.width = "100%";

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.width = prevBodyWidth;
      // Восстанавливаем позицию скролла
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" as ScrollBehavior });
    };
  }, [open, onClose]);

  const captchaOk = parseInt(captchaInput, 10) === captcha.answer;
  const canSubmit = !!(name.trim() && phone.trim() && captchaOk && !loading);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    try {
      const h = String(callHour).padStart(2, "0");
      const m = String(callMin).padStart(2, "0");
      const callTimeValue = callMode === "asap" ? "Как можно скорее" : `${h}:${m}`;
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, callTime: callTimeValue, source }),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
      } else {
        setError("Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const inp: React.CSSProperties = {
    // width: 100% + box-sizing гарантируют что input не вылезет за padding родителя
    width: "100%",
    boxSizing: "border-box",
    minWidth: 0, // сброс дефолтного min-width у input
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    padding: "0.6rem 0.85rem",
    fontFamily: "Inter, sans-serif",
    // 16px минимум — предотвращает zoom на iOS при фокусе
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

  const selectStyle: React.CSSProperties = {
    flex: "1 1 0",
    minWidth: 0,
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    padding: "0.6rem 0.25rem",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: "#111827",
    outline: "none",
    background: "#fff",
    textAlign: "center",
    cursor: "pointer",
    boxSizing: "border-box",
    width: "100%",
  };

  const modeBtn = (active: boolean): React.CSSProperties => ({
    flex: "1 1 0",
    minWidth: 0, // критично: без этого flex-кнопки не сжимаются
    padding: "0.55rem 0.25rem",
    borderRadius: 8,
    border: "2px solid",
    borderColor: active ? "#2563EB" : "#D1D5DB",
    background: active ? "#EFF6FF" : "#fff",
    color: active ? "#2563EB" : "#374151",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxSizing: "border-box",
  });

  return (
    // Оверлей: position:fixed inset:0 — не добавляем ширину сверх viewport
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        // НЕ используем backdropFilter — он создаёт stacking context и глючит на iOS
        overflowY: "auto",
        overflowX: "hidden",
        // Центрируем через padding вместо flex — flex на iOS иногда считает ширину неверно
        padding: "1rem 0",
        boxSizing: "border-box",
      }}
    >
      {/* Внутренний контейнер: явная ширина через margin+padding, не через flex */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          // margin auto + width = надёжнее чем flex-центрирование на iOS
          width: "92%",
          maxWidth: 420,
          margin: "0 auto",
          padding: "1.5rem",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
          // НЕ ставим overflowY:auto здесь — это вызывает баг с клавиатурой на iOS
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 12,
            background: "none", border: "none", cursor: "pointer",
            padding: 6, borderRadius: 6, color: "#9CA3AF",
            lineHeight: 0,
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
              paddingRight: "1.5rem", // место под кнопку закрытия
            }}>
              Оставить заявку
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

              <div>
                <label style={labelStyle}>Когда перезвонить</label>
                {/* Flex-контейнер кнопок: overflow:hidden предотвращает выход за пределы */}
                <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
                  <button onClick={() => setCallMode("asap")} style={modeBtn(callMode === "asap")}>
                    Как можно скорее
                  </button>
                  <button onClick={() => setCallMode("custom")} style={modeBtn(callMode === "custom")}>
                    Выбрать время
                  </button>
                </div>

                {callMode === "custom" && (
                  <div style={{
                    border: "2px solid #2563EB",
                    borderRadius: 10,
                    background: "#EFF6FF",
                    padding: "0.85rem 0.75rem",
                    marginTop: 8,
                    boxSizing: "border-box",
                  }}>
                    <div style={{
                      fontFamily: "Inter, sans-serif", fontSize: "0.78rem",
                      fontWeight: 600, color: "#2563EB", marginBottom: 10,
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <Icon name="Clock" size={14} />
                      Выберите удобное время звонка
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <select
                        value={callHour}
                        onChange={(e) => setCallHour(e.target.value)}
                        style={selectStyle}
                      >
                        {HOURS.map(h => (
                          <option key={h} value={String(h)}>{String(h).padStart(2, "0")}</option>
                        ))}
                      </select>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#374151", flexShrink: 0 }}>:</span>
                      <select
                        value={callMin}
                        onChange={(e) => setCallMin(e.target.value)}
                        style={selectStyle}
                      >
                        {MINUTES.map(m => (
                          <option key={m} value={String(m)}>{String(m).padStart(2, "0")}</option>
                        ))}
                      </select>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "#6B7280", flexShrink: 0, whiteSpace: "nowrap" }}>
                        09–21
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Подтверждение: {captcha.a} + {captcha.b} = ?</label>
                <input
                  style={{
                    ...inp,
                    borderColor: captchaInput && !captchaOk ? "#EF4444" : captchaInput && captchaOk ? "#22C55E" : "#D1D5DB",
                  }}
                  placeholder="Введите ответ"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  type="number"
                  inputMode="numeric"
                />
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
