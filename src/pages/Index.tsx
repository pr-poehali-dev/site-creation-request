import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Типы (под будущую БД) ──────────────────────────────────────────────────

interface Developer {
  id: number;
  name: string;
  logo?: string;
  projectsCount: number;
}

interface Project {
  id: number;
  name: string;
  developerId: number;
  district: string;
  address: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  deadline: string;
  deadlineYear: number;
  img: string;
  badge?: string;
  rooms: number[];
  class: "Комфорт" | "Бизнес" | "Премиум" | "Элит";
  metroDistance: number;
  metroName: string;
}

// ─── Заглушки (удалить когда подключите БД) ─────────────────────────────────

const MOCK_DEVELOPERS: Developer[] = [];
const MOCK_PROJECTS: Project[] = [];

// ─── Данные фильтров (статика) ───────────────────────────────────────────────

const DISTRICTS = ["Все районы", "ЦАО", "СВАО", "ВАО", "ЮВАО", "ЮАО", "ЮЗАО", "ЗАО", "СЗАО", "САО", "Новая Москва"];
const DEADLINES = ["Любой срок", "2025", "2026", "2027", "2028+"];
const CLASSES = ["Любой класс", "Комфорт", "Бизнес", "Премиум", "Элит"];
const ROOM_LABELS = ["Студия", "1", "2", "3", "4+"];

// ─── UI helpers ──────────────────────────────────────────────────────────────

const fmtPrice = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + " млн";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + " тыс";
  return String(n);
};

function NavBar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [mob, setMob] = useState(false);
  const links = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Новостройки" },
    { id: "developers", label: "Застройщики" },
    { id: "about", label: "О сервисе" },
    { id: "contact", label: "Контакты" },
  ];
  const go = (id: string) => { setPage(id); setMob(false); window.scrollTo({ top: 0 }); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        height: 64, display: "flex", alignItems: "center",
        padding: "0 clamp(1rem,4vw,3rem)", gap: "2rem",
      }}>
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="Building2" size={18} style={{ color: "#fff" }} />
          </div>
          <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Новостройки<span style={{ color: "var(--accent)" }}>МСК</span>
          </span>
        </button>

        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", flex: 1 }} className="hidden md:flex">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500,
              color: page === l.id ? "var(--accent)" : "var(--text-secondary)",
              padding: "0.4rem 0.8rem", borderRadius: "var(--radius-sm)",
              background: page === l.id ? "var(--accent-light)" : "transparent",
              transition: "all 0.15s",
            } as React.CSSProperties}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginLeft: "auto" }}>
          <button className="btn-primary" onClick={() => go("contact")} style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}>
            <Icon name="Phone" size={14} />
            Консультация
          </button>
          <button onClick={() => setMob(!mob)} className="md:hidden btn-ghost" style={{ padding: "0.5rem" }}>
            <Icon name={mob ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {mob && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "#fff", borderBottom: "1px solid var(--border)", padding: "1rem" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: "0.95rem",
              color: page === l.id ? "var(--accent)" : "var(--text-primary)",
              padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)",
              borderBottom: "1px solid var(--border)",
            }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function EmptyState({ icon, title, text, action, actionLabel }: {
  icon: string; title: string; text: string; action?: () => void; actionLabel?: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon as "Building2"} size={30} style={{ color: "var(--accent)" }} />
      </div>
      <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)" }}>{title}</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: 380, lineHeight: 1.6 }}>{text}</p>
      {action && actionLabel && (
        <button className="btn-primary" onClick={action} style={{ marginTop: "0.5rem" }}>{actionLabel}</button>
      )}
    </div>
  );
}

function ComingSoonBadge({ label = "Скоро" }: { label?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--orange-light)", color: "var(--orange)", fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 6 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", display: "inline-block" }} />
      {label}
    </span>
  );
}

// ─── Страница: Главная ───────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const [search, setSearch] = useState("");
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%)",
        padding: "5rem clamp(1rem,5vw,5rem) 4rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "60%", height: "160%", background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40%", left: "-5%", width: "40%", height: "120%", background: "rgba(255,255,255,0.03)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", borderRadius: 100, padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
            <Icon name="MapPin" size={14} style={{ color: "#93C5FD" }} />
            <span style={{ color: "#BFDBFE", fontSize: "0.82rem", fontWeight: 500 }}>Москва и Московская область</span>
          </div>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-0.03em" }}>
            Все новостройки Москвы<br />в одном месте
          </h1>
          <p style={{ color: "#BFDBFE", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 520 }}>
            Сравнивайте объекты, изучайте застройщиков, находите лучшие условия — без звонков и навязчивой рекламы
          </p>

          {/* Search bar */}
          <div style={{ background: "#fff", borderRadius: "var(--radius)", padding: "0.5rem", display: "flex", gap: "0.5rem", maxWidth: 580, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 0.75rem" }}>
              <Icon name="Search" size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ЖК, застройщик или район..."
                style={{ border: "none", outline: "none", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%", fontFamily: "Inter, sans-serif" }}
                onKeyDown={e => e.key === "Enter" && go("catalog")}
              />
            </div>
            <button className="btn-primary" onClick={() => go("catalog")} style={{ flexShrink: 0 }}>
              Найти
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {["Комфорт-класс", "Бизнес-класс", "Премиум", "С отделкой"].map(tag => (
              <button key={tag} onClick={() => go("catalog")} style={{
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#BFDBFE", fontSize: "0.78rem", fontWeight: 500,
                padding: "0.3rem 0.8rem", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Hero stats */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
          {[
            { v: "0", l: "Объектов", icon: "Building2", note: "Скоро появятся" },
            { v: "0", l: "Застройщиков", icon: "Users", note: "Добавляем" },
            { v: "0", l: "Квартир", icon: "Key", note: "В базе" },
          ].map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.12)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon as "Building2"} size={18} style={{ color: "#93C5FD" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>{s.v}</div>
                <div style={{ color: "#93C5FD", fontSize: "0.78rem", marginTop: 2 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: "#fff", padding: "4rem clamp(1rem,5vw,5rem)" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Как это работает</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.95rem" }}>Три шага до вашей квартиры</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "2rem" }}>
          {[
            { n: "01", icon: "Search", title: "Выберите параметры", text: "Укажите бюджет, район, количество комнат и класс жилья — покажем подходящие варианты" },
            { n: "02", icon: "LayoutGrid", title: "Сравните объекты", text: "Смотрите планировки, инфраструктуру, условия ипотеки и отзывы о застройщиках в одном месте" },
            { n: "03", icon: "Phone", title: "Получите консультацию", text: "Наш эксперт подберёт лучшие условия и сопроводит сделку от выбора до ключей" },
          ].map(s => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 44, height: 44, background: "var(--accent-light)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={s.icon as "Search"} size={20} style={{ color: "var(--accent)" }} />
                </div>
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--border-strong)" }}>{s.n}</span>
              </div>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>{s.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog preview — пустой с заглушкой */}
      <div style={{ padding: "4rem clamp(1rem,5vw,5rem)", background: "var(--bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,1.8rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Актуальные новостройки
            </h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", fontSize: "0.875rem" }}>Объекты появятся здесь после добавления в базу</p>
          </div>
          <button className="btn-secondary" onClick={() => { setPage("catalog"); window.scrollTo({ top: 0 }); }}>
            Все объекты <Icon name="ArrowRight" size={15} />
          </button>
        </div>

        <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "4rem 2rem" }}>
          <EmptyState
            icon="Building2"
            title="База объектов пополняется"
            text="Мы добавляем новостройки и застройщиков. Оставьте заявку — и мы свяжемся, когда появятся подходящие варианты."
            action={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}
            actionLabel="Оставить заявку"
          />
        </div>
      </div>

      {/* Why us */}
      <div style={{ background: "#fff", padding: "4rem clamp(1rem,5vw,5rem)", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2rem" }}>
          {[
            { icon: "ShieldCheck", title: "Проверенные объекты", text: "Добавляем только аккредитованные новостройки от надёжных застройщиков" },
            { icon: "Banknote", title: "Без скрытых комиссий", text: "Сервис бесплатный. Зарабатываем только на партнёрских договорах" },
            { icon: "Clock", title: "Актуальные данные", text: "Цены и наличие квартир обновляются напрямую от застройщиков" },
            { icon: "HeadphonesIcon", title: "Личный менеджер", text: "Опытный эксперт бесплатно сопроводит вас на всех этапах покупки" },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ width: 44, height: 44, background: "var(--accent-light)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={f.icon as "Search"} size={20} style={{ color: "var(--accent)" }} />
              </div>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>{f.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.84rem", lineHeight: 1.6 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "var(--accent)", padding: "4rem clamp(1rem,5vw,5rem)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
          Помочь с выбором квартиры?
        </h2>
        <p style={{ color: "#BFDBFE", fontSize: "1rem", marginBottom: "2rem" }}>Оставьте заявку — эксперт перезвонит в течение 15 минут</p>
        <button className="btn-secondary" onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}>
          <Icon name="MessageCircle" size={16} />
          Получить бесплатную консультацию
        </button>
      </div>
    </div>
  );
}

// ─── Страница: Каталог ───────────────────────────────────────────────────────

function CatalogPage() {
  const [district, setDistrict] = useState("Все районы");
  const [deadline, setDeadline] = useState("Любой срок");
  const [cls, setCls] = useState("Любой класс");
  const [rooms, setRooms] = useState<number[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const toggleRoom = (i: number) => setRooms(r => r.includes(i) ? r.filter(x => x !== i) : [...r, i]);
  const resetFilters = () => { setDistrict("Все районы"); setDeadline("Любой срок"); setCls("Любой класс"); setRooms([]); setPriceMin(""); setPriceMax(""); };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar filters */}
      <aside style={{
        width: showFilters ? 280 : 0, flexShrink: 0, overflow: "hidden",
        background: "#fff", borderRight: "1px solid var(--border)",
        transition: "width 0.25s ease",
        padding: showFilters ? "2rem 1.25rem" : "0",
      }}>
        {showFilters && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1rem" }}>Фильтры</h3>
              <button className="btn-ghost" onClick={resetFilters} style={{ fontSize: "0.78rem", padding: "0.25rem 0.5rem", color: "var(--accent)" }}>Сбросить</button>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Район</label>
              <select className="sel" value={district} onChange={e => setDistrict(e.target.value)}>
                {DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Класс жилья</label>
              <select className="sel" value={cls} onChange={e => setCls(e.target.value)}>
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Срок сдачи</label>
              <select className="sel" value={deadline} onChange={e => setDeadline(e.target.value)}>
                {DEADLINES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Комнат</label>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {ROOM_LABELS.map((l, i) => (
                  <button key={l} className={`tag ${rooms.includes(i) ? "active" : ""}`} onClick={() => toggleRoom(i)}>{l}</button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Цена, ₽</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input className="inp" placeholder="от" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{ textAlign: "center" }} />
                <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>—</span>
                <input className="inp" placeholder="до" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{ textAlign: "center" }} />
              </div>
            </div>

            <button className="btn-primary" style={{ width: "100%" }}>
              <Icon name="SlidersHorizontal" size={15} />
              Применить
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button className="btn-secondary" onClick={() => setShowFilters(!showFilters)} style={{ padding: "0.55rem 1rem", fontSize: "0.82rem" }}>
              <Icon name="SlidersHorizontal" size={15} />
              {showFilters ? "Скрыть фильтры" : "Фильтры"}
            </button>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Найдено: <strong style={{ color: "var(--text-primary)" }}>0</strong> объектов
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <select className="sel" style={{ width: "auto" }}>
              <option>По умолчанию</option>
              <option>Цена: по возрастанию</option>
              <option>Цена: по убыванию</option>
              <option>Срок сдачи</option>
            </select>
          </div>
        </div>

        {/* Quick pills */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["Все", "Со скидкой", "С ипотекой 0%", "Готовые", "С отделкой", "Рядом с метро"].map((p, i) => (
            <button key={p} className={`pill ${i === 0 ? "active" : ""}`}>{p}</button>
          ))}
        </div>

        {/* Empty state */}
        <div className="card" style={{ boxShadow: "none" }}>
          <EmptyState
            icon="Search"
            title="Объекты не добавлены"
            text="База новостроек пока пуста. Мы активно работаем над наполнением каталога — заходите позже или оставьте заявку на подбор."
          />
        </div>
      </div>
    </div>
  );
}

// ─── Страница: Застройщики ───────────────────────────────────────────────────

function DevelopersPage() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          Застройщики
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Проверенные девелоперы Москвы с актуальными проектами</p>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
          <Icon name="Search" size={15} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
          <input className="inp" placeholder="Поиск застройщика..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "2.5rem" }} />
        </div>
        <select className="sel" style={{ width: 180 }}>
          <option>Все</option>
          <option>Топ по надёжности</option>
          <option>По алфавиту</option>
        </select>
      </div>

      <div className="card" style={{ boxShadow: "none", padding: "1rem" }}>
        <EmptyState
          icon="Users"
          title="Застройщики добавляются"
          text="Список девелоперов появится после верификации партнёров. Если хотите добавить своего застройщика — свяжитесь с нами."
        />
      </div>

      {/* Placeholder skeleton info */}
      <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "var(--accent-light)", borderRadius: "var(--radius)", border: "1px solid #BFDBFE", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <Icon name="Info" size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--accent-text)", marginBottom: "0.25rem" }}>Как добавить застройщика?</p>
          <p style={{ fontSize: "0.84rem", color: "var(--accent-text)", lineHeight: 1.6 }}>
            Для застройщиков работает бесплатный размещение. Заполните заявку — и ваши объекты появятся в каталоге после проверки.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Страница: О сервисе ─────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1E3A8A, #2563EB)", padding: "5rem clamp(1rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 640 }}>
          <ComingSoonBadge label="В разработке" />
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.15, marginTop: "1rem", marginBottom: "1rem", letterSpacing: "-0.03em" }}>
            Сервис для поиска<br />новостроек в Москве
          </h1>
          <p style={{ color: "#BFDBFE", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            Мы создаём удобный агрегатор, где покупатели находят лучшие новостройки, а застройщики получают прямой канал продаж без лишних посредников.
          </p>
          <button className="btn-secondary" onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}>
            Связаться с нами <Icon name="ArrowRight" size={15} />
          </button>
        </div>
      </div>

      <div style={{ padding: "4rem clamp(1rem,5vw,5rem)" }}>
        {/* Mission */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginBottom: "5rem" }}>
          <div>
            <div style={{ display: "inline-block", background: "var(--accent-light)", color: "var(--accent)", fontWeight: 600, fontSize: "0.75rem", padding: "0.25rem 0.75rem", borderRadius: 100, marginBottom: "1.25rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Наша миссия
            </div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,1.9rem)", color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              Сделать рынок новостроек прозрачным
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.75 }}>
              Рынок первичной недвижимости Москвы огромен и непрозрачен. Покупателям сложно сравнивать объекты, проверять застройщиков и понимать реальные условия. Мы это меняем.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "Eye", title: "Прозрачность", text: "Реальные цены и актуальные данные от застройщиков" },
              { icon: "Scale", title: "Объективность", text: "Не продаём конкретные объекты — показываем всё" },
              { icon: "Lock", title: "Безопасность", text: "Только аккредитованные и проверенные проекты" },
              { icon: "Zap", title: "Скорость", text: "Находите подходящие варианты за минуты, а не часы" },
            ].map(v => (
              <div key={v.title} className="card" style={{ padding: "1.25rem" }}>
                <div style={{ width: 36, height: 36, background: "var(--accent-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                  <Icon name={v.icon as "Eye"} size={17} style={{ color: "var(--accent)" }} />
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>{v.title}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: 1.5 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "2.5rem" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.3rem", marginBottom: "2rem", letterSpacing: "-0.02em" }}>
            Что мы запускаем
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Каталог новостроек", status: "soon", text: "Все жилые комплексы Москвы с фотографиями, планировками и ценами" },
              { label: "Профили застройщиков", status: "soon", text: "История, рейтинг, сданные объекты и отзывы по каждому девелоперу" },
              { label: "Ипотечный калькулятор", status: "later", text: "Расчёт ежемесячного платежа по актуальным ставкам банков-партнёров" },
              { label: "Сравнение объектов", status: "later", text: "Сравнивайте до 4 ЖК по всем параметрам в одном окне" },
              { label: "Личный кабинет", status: "later", text: "Сохранённые объекты, история просмотров и уведомления о снижении цен" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg)" }}>
                <div style={{ marginTop: 2 }}>
                  {item.status === "soon"
                    ? <span style={{ background: "var(--orange-light)", color: "var(--orange)", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 6 }}>Скоро</span>
                    : <span style={{ background: "var(--surface)", color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 6 }}>Позже</span>
                  }
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{item.label}</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.5 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Страница: Контакты ──────────────────────────────────────────────────────

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
        Контакты
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "3rem" }}>Ответим в течение 30 минут в рабочее время</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        {/* Form */}
        <div className="card" style={{ padding: "2rem" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "1.5rem" }}>Оставить заявку</h2>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ width: 60, height: 60, background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <Icon name="CheckCircle" size={28} style={{ color: "var(--green)" }} />
              </div>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Заявка отправлена!</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>Наш эксперт свяжется с вами в ближайшее время</p>
              <button className="btn-secondary" style={{ marginTop: "1.5rem" }} onClick={() => setSent(false)}>Отправить ещё</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { k: "name" as const, label: "Имя", type: "text", ph: "Ваше имя" },
                { k: "phone" as const, label: "Телефон", type: "tel", ph: "+7 (___) ___-__-__" },
                { k: "email" as const, label: "Email", type: "email", ph: "your@email.com" },
              ].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} className="inp" value={form[f.k]} onChange={set(f.k)} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>Бюджет</label>
                <select className="sel" value={form.budget} onChange={set("budget")}>
                  <option value="">Не указан</option>
                  <option>До 5 млн ₽</option>
                  <option>5–10 млн ₽</option>
                  <option>10–20 млн ₽</option>
                  <option>20–50 млн ₽</option>
                  <option>Более 50 млн ₽</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>Сообщение</label>
                <textarea placeholder="Расскажите о ваших пожеланиях..." className="inp" rows={3} value={form.message} onChange={set("message")} style={{ resize: "vertical" }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Отправить заявку
              </button>
              <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.25rem" }}>Контактная информация</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "MapPin", label: "Адрес", val: "Москва" },
                { icon: "Phone", label: "Телефон", val: "+7 (___) ___-__-__" },
                { icon: "Mail", label: "Email", val: "info@example.ru" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Вс: 9:00–21:00" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, background: "var(--accent-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={c.icon as "MapPin"} size={16} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>{c.label}</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-primary)" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>Мессенджеры</h3>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                <Icon name="MessageCircle" size={15} />
                Telegram
              </button>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                <Icon name="Phone" size={15} />
                WhatsApp
              </button>
            </div>
          </div>

          <div style={{ padding: "1.25rem", background: "var(--green-light)", borderRadius: "var(--radius)", border: "1px solid #BBF7D0", display: "flex", gap: "0.75rem" }}>
            <Icon name="ShieldCheck" size={18} style={{ color: "var(--green)", flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#166534", marginBottom: "0.25rem" }}>Консультация бесплатна</div>
              <div style={{ fontSize: "0.8rem", color: "#166534", lineHeight: 1.5 }}>Мы не берём комиссию с покупателей. Оплату получаем от застройщиков по договору.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer style={{ background: "#111827", color: "#9CA3AF", padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <div style={{ maxWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Building2" size={16} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1rem", color: "#F9FAFB" }}>
              Новостройки<span style={{ color: "#60A5FA" }}>МСК</span>
            </span>
          </div>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.65 }}>Агрегатор новостроек Москвы. Находите, сравнивайте и покупайте квартиры в лучших ЖК.</p>
        </div>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 600, color: "#F9FAFB", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Сервис</div>
            {[["home", "Главная"], ["catalog", "Каталог"], ["developers", "Застройщики"], ["about", "О нас"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: "0.82rem", padding: "0.25rem 0", transition: "color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#F9FAFB"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#F9FAFB", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Помощь</div>
            {[["contact", "Контакты"], ["contact", "Для застройщиков"], ["about", "Как мы работаем"]].map(([id, l], i) => (
              <button key={i} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: "0.82rem", padding: "0.25rem 0", transition: "color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#F9FAFB"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1F2937", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.78rem" }}>© 2026 НовостройкиМСК. Все права защищены.</span>
        <span style={{ fontSize: "0.78rem" }}>Политика конфиденциальности</span>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function Index() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "var(--bg)", minHeight: "100vh" }}>
      <NavBar page={page} setPage={setPage} />
      <div style={{ paddingTop: 64 }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "catalog" && <CatalogPage />}
        {page === "developers" && <DevelopersPage />}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "contact" && <ContactPage />}
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}
