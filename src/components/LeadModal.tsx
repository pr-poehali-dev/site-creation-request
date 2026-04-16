import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SEND_LEAD_URL = "https://functions.poehali.dev/9cf5e35e-11a2-4c0b-9b02-347ea38ec4c8";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 9); // 9..21
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.addEventListener("keydown", onKey);
      // Блокируем прокрутку body, сохраняем позицию
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      if (open) {
        // Восстанавливаем прокрутку без сдвига
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflowY = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [open, onClose]);

  const captchaOk = parseInt(captchaInput, 10) === captcha.answer;
  const callTimeOk = callMode === "asap" || true; // час/мин всегда выбраны по умолчанию
  const canSubmit = name.trim() && phone.trim() && captchaOk && callTimeOk && !loading;

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
    width: "100%", boxSizing: "border-box",
    border: "1px solid #D1D5DB", borderRadius: 8,
    padding: "0.6rem 0.85rem", fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem", color: "#111827", outline: "none",
    background: "#fff",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: "0.8rem",
    fontWeight: 600, color: "#374151", marginBottom: 6, display: "block",
  };
  const selectStyle: React.CSSProperties = {
    flex: 1, border: "1px solid #D1D5DB", borderRadius: 8,
    padding: "0.6rem 0.5rem", fontFamily: "Inter, sans-serif",
    fontSize: "0.95rem", color: "#111827", outline: "none",
    background: "#fff", textAlign: "center",
    appearance: "none" as const, cursor: "pointer",
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflowX: "hidden", overflowY: "auto",
        WebkitOverflowScrolling: "touch" as const,
      }}
    >
      <div style={{
        background: "#fff", borderRadius: 16,
        width: "calc(100% - 2rem)", maxWidth: 440,
        padding: "1.5rem", position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        maxHeight: "90dvh", overflowY: "auto",
        margin: "1rem auto", flexShrink: 0,
        boxSizing: "border-box",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14, background: "none",
            border: "none", cursor: "pointer", padding: 4, borderRadius: 6,
            color: "#9CA3AF",
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
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#111827", marginBottom: "1.5rem" }}>
              Оставить заявку
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Имя</label>
                <input
                  style={inp}
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                />
              </div>

              <div>
                <label style={labelStyle}>Когда перезвонить</label>
                <div style={{ display: "flex", gap: 8, marginBottom: callMode === "custom" ? 10 : 0 }}>
                  <button
                    onClick={() => setCallMode("asap")}
                    style={{
                      flex: 1, padding: "0.55rem 0.5rem",
                      borderRadius: 8, border: "2px solid",
                      borderColor: callMode === "asap" ? "#2563EB" : "#D1D5DB",
                      background: callMode === "asap" ? "#EFF6FF" : "#fff",
                      color: callMode === "asap" ? "#2563EB" : "#374151",
                      fontFamily: "Inter, sans-serif", fontSize: "0.78rem",
                      fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    Как можно скорее
                  </button>
                  <button
                    onClick={() => setCallMode("custom")}
                    style={{
                      flex: 1, padding: "0.55rem 0.5rem",
                      borderRadius: 8, border: "2px solid",
                      borderColor: callMode === "custom" ? "#2563EB" : "#D1D5DB",
                      background: callMode === "custom" ? "#EFF6FF" : "#fff",
                      color: callMode === "custom" ? "#2563EB" : "#374151",
                      fontFamily: "Inter, sans-serif", fontSize: "0.78rem",
                      fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    Выбрать время
                  </button>
                </div>

                {callMode === "custom" && (
                  <div style={{
                    border: "2px solid #2563EB", borderRadius: 10,
                    background: "#EFF6FF", padding: "0.85rem 1rem",
                    marginTop: 2,
                  }}>
                    <div style={{
                      fontFamily: "Inter, sans-serif", fontSize: "0.78rem",
                      fontWeight: 600, color: "#2563EB", marginBottom: 10,
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <Icon name="Clock" size={14} />
                      Выберите удобное время звонка
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <select
                        value={callHour}
                        onChange={(e) => setCallHour(e.target.value)}
                        style={selectStyle}
                      >
                        {HOURS.map(h => (
                          <option key={h} value={String(h)}>{String(h).padStart(2, "0")}</option>
                        ))}
                      </select>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#374151" }}>:</span>
                      <select
                        value={callMin}
                        onChange={(e) => setCallMin(e.target.value)}
                        style={selectStyle}
                      >
                        {MINUTES.map(m => (
                          <option key={m} value={String(m)}>{String(m).padStart(2, "0")}</option>
                        ))}
                      </select>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                        (с 09:00 до 21:00)
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
                  padding: "0.75rem", width: "100%",
                  fontFamily: "Inter, sans-serif", fontWeight: 700,
                  fontSize: "0.9rem", cursor: canSubmit ? "pointer" : "not-allowed",
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