import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Данные 12 объектов ───────────────────────────────────────────────────────

interface Launch {
  id: number;
  developer: string;
  name: string;
  address: string;
  deadline: string;
  url: string;
  img: string;
}

const LAUNCHES: Launch[] = [
  { id: 1,  developer: "Град Девелопмент", name: "Аурум Тайм",                    address: "Богородское, проезд 4-й Подбельского",      deadline: "апрель 2026", url: "https://lab.xn--d1alfcjp.xn--p1ai/1.html",  img: "" },
  { id: 2,  developer: "ГК Атлант",        name: "Крекшино Парк",                  address: "Внуково, поселок совхоза Крекшино",          deadline: "весна 2026",  url: "https://lab.xn--d1alfcjp.xn--p1ai/2.html",  img: "" },
  { id: 3,  developer: "",                  name: "Никольский квартал Отрада, к. 6 и 7", address: "г. Красногорск, мкр Опалиха",            deadline: "весна 2026",  url: "https://lab.xn--d1alfcjp.xn--p1ai/3.html",  img: "" },
  { id: 4,  developer: "Upside",            name: "Апсайд Мосфильмовская",          address: "улица Мосфильмовская",                      deadline: "май",         url: "https://lab.xn--d1alfcjp.xn--p1ai/4.html",  img: "" },
  { id: 5,  developer: "Мангазея",          name: "Мангазея на Речном",             address: "Москва",                                    deadline: "осень 2026",  url: "https://lab.xn--d1alfcjp.xn--p1ai/5.html",  img: "" },
  { id: 6,  developer: "АСИ Групп",         name: "Каштановая роща 2 оч.",          address: "д. Измалково, Солнечная ул",                 deadline: "2026 год",    url: "https://lab.xn--d1alfcjp.xn--p1ai/6.html",  img: "" },
  { id: 7,  developer: "ГК СетьСтрой",     name: "Квартал Светлый 2оч.",           address: "г. Балашиха, ул Твардовского",               deadline: "2026 год",    url: "https://lab.xn--d1alfcjp.xn--p1ai/7.html",  img: "" },
  { id: 8,  developer: "Vesper",            name: "Vesper на Шабаловке",            address: "Донской, ул Шаболовка",                     deadline: "скоро",       url: "https://lab.xn--d1alfcjp.xn--p1ai/8.html",  img: "" },
  { id: 9,  developer: "Sminex",            name: "Дом Палашевский 11",             address: "Большой Палашевский переулок",               deadline: "скоро",       url: "https://lab.xn--d1alfcjp.xn--p1ai/9.html",  img: "" },
  { id: 10, developer: "STONE OFFICE",      name: "БЦ Мневники 4",                  address: "Хорошево-Мневники, ул Нижние Мневники",      deadline: "скоро",       url: "https://lab.xn--d1alfcjp.xn--p1ai/10.html", img: "" },
  { id: 11, developer: "ГК Самолет",        name: "Химки Парк",                     address: "г. Химки, ул Рабочая",                      deadline: "скоро",       url: "https://lab.xn--d1alfcjp.xn--p1ai/11.html", img: "" },
  { id: 12, developer: "Лесная Отрада",     name: "Лесная Отрада, 2 очередь, корпус 2", address: "пос. Светлые Горы, Пятницкое шоссе",    deadline: "скоро",       url: "https://lab.xn--d1alfcjp.xn--p1ai/12.html", img: "" },
];

const DISTRICTS = ["Вся Москва", "ЦАО", "СВАО", "ВАО", "ЮВАО", "ЮАО", "ЮЗАО", "ЗАО", "СЗАО", "САО", "Новая Москва", "Подмосковье"];
const DEADLINES = ["Любой срок", "2025", "2026", "2027", "2028+"];
const CLASSES = ["Любой класс", "Комфорт", "Бизнес", "Премиум", "Элит"];
const ROOM_LABELS = ["Студия", "1", "2", "3", "4+"];

// ─── Аватар объекта (цветной кружок с иконкой) ────────────────────────────────

const AVATAR_COLORS = [
  "#4F7CFF", "#7C3AED", "#0EA5E9", "#059669", "#DC2626",
  "#D97706", "#0891B2", "#7C3AED", "#BE185D", "#1D4ED8", "#065F46", "#92400E",
];

function ProjectAvatar({ id, size = 44 }: { id: number; size?: number }) {
  const color = AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <Icon name="Building2" size={size * 0.42} style={{ color: "rgba(255,255,255,0.9)" }} />
    </div>
  );
}

// ─── Компактная карточка анонса ───────────────────────────────────────────────

function LaunchCard({ item }: { item: Launch }) {
  const title = item.developer ? `${item.developer} — ${item.name}` : item.name;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #E8EBF0",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "box-shadow 0.18s, border-color 0.18s",
        cursor: "pointer",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#C8D0DC";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#E8EBF0";
        }}
      >
        {/* Top row: avatar + title */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <ProjectAvatar id={item.id} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "Inter, sans-serif", fontWeight: 600,
              fontSize: "0.82rem", color: "#111827", lineHeight: 1.35,
              overflow: "hidden", display: "-webkit-box",
              WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            }}>
              {title}
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
          <Icon name="MapPin" size={12} style={{ color: "#9CA3AF", flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize: "0.76rem", color: "#6B7280", lineHeight: 1.4 }}>{item.address}</span>
        </div>

        {/* Bottom: date + link */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="Calendar" size={12} style={{ color: "#9CA3AF" }} />
            <span style={{ fontSize: "0.76rem", color: "#6B7280" }}>{item.deadline}</span>
          </div>
          <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "#2563EB" }}>Подробнее</span>
        </div>
      </div>
    </a>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [mob, setMob] = useState(false);
  const links = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Новостройки" },
    { id: "launches", label: "Анонсы стартов" },
    { id: "developers", label: "Застройщики" },
    { id: "contact", label: "Контакты" },
  ];
  const go = (id: string) => { setPage(id); setMob(false); window.scrollTo({ top: 0 }); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff", borderBottom: "1px solid #E8EBF0",
        height: 56, display: "flex", alignItems: "center",
        padding: "0 clamp(1rem,3vw,2.5rem)", gap: "1.5rem",
      }}>
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, background: "#2563EB", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="Building2" size={15} style={{ color: "#fff" }} />
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>
            Новостройки<span style={{ color: "#2563EB" }}>МСК</span>
          </span>
        </button>

        <div style={{ display: "flex", gap: "0.15rem", flex: 1 }} className="hidden md:flex">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: page === l.id ? "#EFF6FF" : "none",
              border: "none", cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500,
              color: page === l.id ? "#2563EB" : "#6B7280",
              padding: "0.35rem 0.7rem", borderRadius: 7,
              transition: "all 0.15s", whiteSpace: "nowrap",
            } as React.CSSProperties}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }} className="hidden md:flex">
          <a href="tel:+74951234567" style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none", color: "#111827", fontWeight: 600, fontSize: "0.88rem", fontFamily: "Inter, sans-serif" }}>
            <Icon name="Phone" size={14} style={{ color: "#2563EB" }} />
            +7 (495) 123-45-67
          </a>
          <button onClick={() => go("contact")} style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "0.45rem 1.1rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
            Подобрать
          </button>
        </div>

        <button onClick={() => setMob(!mob)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto" }}>
          <Icon name={mob ? "X" : "Menu"} size={20} style={{ color: "#374151" }} />
        </button>
      </nav>

      {mob && (
        <div style={{ position: "fixed", top: 56, left: 0, right: 0, zIndex: 99, background: "#fff", borderBottom: "1px solid #E8EBF0", padding: "0.75rem" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: page === l.id ? "#2563EB" : "#374151", padding: "0.65rem 1rem", borderRadius: 8 }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Hero (центрированный, светло-серый) ──────────────────────────────────────

function Hero({ onSearch }: { onSearch: () => void }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Квартиры");
  const tabs = ["Квартиры", "Паркинги", "Дома с участками", "Участки", "Подрядчики", "Коммерция"];

  return (
    <div style={{ background: "#F5F6F8", padding: "3.5rem clamp(1rem,5vw,4rem) 3rem", textAlign: "center" }}>
      {/* Title */}
      <h1 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 700,
        fontSize: "clamp(2rem,4vw,3rem)", color: "#111827",
        lineHeight: 1.2, marginBottom: "2rem", letterSpacing: "-0.02em",
      }}>
        Более 66 000 квартир<br />в Москве
      </h1>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: activeTab === t ? "#fff" : "transparent",
            border: activeTab === t ? "1px solid #D1D5DB" : "1px solid transparent",
            borderRadius: 100, padding: "0.45rem 1rem",
            fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500,
            color: activeTab === t ? "#111827" : "#6B7280",
            cursor: "pointer", transition: "all 0.15s",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon name={t === "Квартиры" ? "Building2" : t === "Паркинги" ? "Car" : t === "Дома с участками" ? "Home" : t === "Участки" ? "TreePine" : t === "Подрядчики" ? "HardHat" : "Store"} size={14} style={{ color: activeTab === t ? "#374151" : "#9CA3AF" }} />
            {t}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div style={{
        background: "#fff", borderRadius: 12,
        border: "1px solid #D1D5DB",
        display: "flex", alignItems: "center",
        maxWidth: 820, margin: "0 auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 1rem" }}>
          <Icon name="Search" size={16} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSearch()}
            placeholder="Метро, район, локация, ЖК, улица, застройщик, банк"
            style={{
              border: "none", outline: "none", fontSize: "0.875rem",
              color: "#374151", width: "100%", fontFamily: "Inter, sans-serif",
              padding: "0.9rem 0", background: "transparent",
            }}
          />
        </div>

        {/* Filters inline */}
        <div style={{ display: "flex", borderLeft: "1px solid #E5E7EB" }} className="hidden md:flex">
          {[
            { label: "Тип квартиры", icon: "LayoutList" },
            { label: "Цена от-до, ₽", icon: "Banknote" },
            { label: "Срок сдачи", icon: "Calendar" },
          ].map((f, i) => (
            <button key={f.label} style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "0 1rem", height: "100%", minHeight: 52,
              background: "none", border: "none", borderRight: i < 2 ? "1px solid #E5E7EB" : "none",
              cursor: "pointer", fontFamily: "Inter, sans-serif",
              fontSize: "0.78rem", color: "#374151", fontWeight: 500,
              whiteSpace: "nowrap",
            }}>
              {f.label}
            </button>
          ))}
          <button style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "0 1rem", height: "100%",
            background: "none", border: "none", borderLeft: "1px solid #E5E7EB",
            cursor: "pointer", fontFamily: "Inter, sans-serif",
            fontSize: "0.78rem", color: "#374151", fontWeight: 500,
            whiteSpace: "nowrap",
          }}>
            <Icon name="SlidersHorizontal" size={14} />
            Все фильтры
          </button>
        </div>
      </div>

      {/* Actions row */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.75rem", maxWidth: 820, margin: "1rem auto 0" }}>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "1px solid #D1D5DB",
          borderRadius: 8, padding: "0.5rem 1rem",
          fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500,
          color: "#374151", cursor: "pointer",
        }}>
          <Icon name="MapPin" size={14} style={{ color: "#2563EB" }} />
          На карте
        </button>
        <button onClick={onSearch} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "#2563EB", border: "none",
          borderRadius: 8, padding: "0.6rem 1.25rem",
          fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 600,
          color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
        }}>
          66 115 квартир в 461 ЖК
        </button>
      </div>
    </div>
  );
}

// ─── Секция анонсов ───────────────────────────────────────────────────────────

function LaunchesSection({ setPage, showAll = false }: { setPage: (p: string) => void; showAll?: boolean }) {
  const [collapsed, setCollapsed] = useState(false);
  const visible = showAll ? LAUNCHES : LAUNCHES.slice(0, 6);

  return (
    <div style={{ background: "#fff", padding: "2rem clamp(1rem,5vw,4rem)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: collapsed ? 0 : "1.25rem" }}>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#111827", margin: 0 }}>
          Анонсы стартов продаж
        </h2>
        <button
          onClick={() => !showAll && setCollapsed(!collapsed)}
          style={{ background: "none", border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.35rem 0.85rem", fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "#374151", cursor: "pointer" }}
        >
          {showAll ? `Все ${LAUNCHES.length} объектов` : (collapsed ? "Развернуть" : "Свернуть")}
        </button>
      </div>

      {!collapsed && (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
          }}>
            {visible.map(item => <LaunchCard key={item.id} item={item} />)}
          </div>

          {!showAll && (
            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
              <button
                onClick={() => { setPage("launches"); window.scrollTo({ top: 0 }); }}
                style={{ background: "none", border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.5rem 1.5rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500, color: "#374151", cursor: "pointer" }}
              >
                Показать все {LAUNCHES.length} объектов
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Страница Главная ─────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <div style={{ background: "#F5F6F8" }}>
      <Hero onSearch={() => go("catalog")} />
      <div style={{ borderTop: "1px solid #E8EBF0" }}>
        <LaunchesSection setPage={setPage} showAll={false} />
      </div>

      {/* Why us */}
      <div style={{ background: "#F5F6F8", padding: "2.5rem clamp(1rem,5vw,4rem)", borderTop: "1px solid #E8EBF0" }}>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.1rem", marginBottom: "1.5rem", color: "#111827" }}>Почему выбирают нас</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1rem" }}>
          {[
            { icon: "ShieldCheck", t: "Проверенные объекты", d: "Только аккредитованные ЖК" },
            { icon: "Banknote", t: "Бесплатно для вас", d: "Никаких комиссий с покупателей" },
            { icon: "RefreshCw", t: "Актуальные данные", d: "Цены обновляются напрямую" },
            { icon: "Headphones", t: "Личный эксперт", d: "Сопроводим от выбора до ключей" },
          ].map(f => (
            <div key={f.t} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EBF0", padding: "1.25rem", display: "flex", gap: "0.75rem" }}>
              <div style={{ width: 36, height: 36, background: "#EFF6FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={f.icon as "ShieldCheck"} size={17} style={{ color: "#2563EB" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.2rem" }}>{f.t}</div>
                <div style={{ color: "#6B7280", fontSize: "0.8rem", lineHeight: 1.5 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#2563EB", padding: "3rem clamp(1rem,5vw,4rem)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: "0.5rem" }}>Нужна помощь с выбором?</h2>
        <p style={{ color: "#BFDBFE", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Эксперт перезвонит в течение 15 минут</p>
        <button onClick={() => go("contact")} style={{ background: "#fff", color: "#2563EB", border: "none", borderRadius: 8, padding: "0.65rem 1.75rem", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
          Получить консультацию бесплатно
        </button>
      </div>
    </div>
  );
}

// ─── Страница: Каталог ────────────────────────────────────────────────────────

function CatalogPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [rooms, setRooms] = useState<number[]>([]);
  const [district, setDistrict] = useState("Вся Москва");
  const [deadline, setDeadline] = useState("Любой срок");
  const [cls, setCls] = useState("Любой класс");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const toggleRoom = (i: number) => setRooms(r => r.includes(i) ? r.filter(x => x !== i) : [...r, i]);

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 56px)", background: "#F5F6F8" }}>
      {/* Filters */}
      <aside style={{ width: showFilters ? 260 : 0, overflow: "hidden", background: "#fff", borderRight: "1px solid #E8EBF0", transition: "width 0.25s", flexShrink: 0 }}>
        <div style={{ width: 260, padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>Фильтры</span>
            <button onClick={() => { setRooms([]); setDistrict("Вся Москва"); setDeadline("Любой срок"); setCls("Любой класс"); setPriceMin(""); setPriceMax(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#2563EB", fontSize: "0.78rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>Сбросить</button>
          </div>
          {[
            { label: "Район", el: <select value={district} onChange={e => setDistrict(e.target.value)} style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.55rem 0.75rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#374151", outline: "none", width: "100%", background: "#fff" }}>{DISTRICTS.map(d => <option key={d}>{d}</option>)}</select> },
            { label: "Класс жилья", el: <select value={cls} onChange={e => setCls(e.target.value)} style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.55rem 0.75rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#374151", outline: "none", width: "100%", background: "#fff" }}>{CLASSES.map(c => <option key={c}>{c}</option>)}</select> },
            { label: "Срок сдачи", el: <select value={deadline} onChange={e => setDeadline(e.target.value)} style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.55rem 0.75rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#374151", outline: "none", width: "100%", background: "#fff" }}>{DEADLINES.map(d => <option key={d}>{d}</option>)}</select> },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: "0.04em", display: "block", marginBottom: "0.4rem" }}>{f.label}</label>
              {f.el}
            </div>
          ))}
          <div>
            <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: "0.04em", display: "block", marginBottom: "0.4rem" }}>Комнат</label>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {ROOM_LABELS.map((l, i) => (
                <button key={l} onClick={() => toggleRoom(i)} style={{ border: `1px solid ${rooms.includes(i) ? "#2563EB" : "#D1D5DB"}`, background: rooms.includes(i) ? "#EFF6FF" : "#fff", color: rooms.includes(i) ? "#2563EB" : "#374151", fontSize: "0.8rem", fontWeight: 500, padding: "0.3rem 0.65rem", borderRadius: 7, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: "0.04em", display: "block", marginBottom: "0.4rem" }}>Цена, ₽</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input placeholder="от" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{ flex: 1, border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.5rem 0.6rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", outline: "none", textAlign: "center" }} />
              <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>—</span>
              <input placeholder="до" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{ flex: 1, border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.5rem 0.6rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", outline: "none", textAlign: "center" }} />
            </div>
          </div>
          <button style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name="Search" size={14} /> Найти
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{ background: "#fff", border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.45rem 0.9rem", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="SlidersHorizontal" size={13} />{showFilters ? "Скрыть" : "Фильтры"}
            </button>
            <span style={{ color: "#6B7280", fontSize: "0.82rem" }}>Объектов: <strong style={{ color: "#111827" }}>0</strong></span>
          </div>
          <select style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.45rem 0.75rem", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#374151", outline: "none", background: "#fff" }}>
            <option>По умолчанию</option><option>Цена ↑</option><option>Цена ↓</option><option>Срок сдачи</option>
          </select>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EBF0", textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ width: 56, height: 56, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Icon name="Building2" size={24} style={{ color: "#2563EB" }} />
          </div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>База объектов пополняется</h3>
          <p style={{ color: "#6B7280", fontSize: "0.82rem", maxWidth: 300, margin: "0 auto" }}>Полный каталог скоро появится. Пока смотрите анонсы стартов продаж.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Страница: Все анонсы ─────────────────────────────────────────────────────

function LaunchesPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div style={{ background: "#F5F6F8", minHeight: "100vh" }}>
      <div style={{ padding: "1.5rem clamp(1rem,5vw,4rem) 0", display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={() => { setPage("home"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "0.82rem", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="ChevronLeft" size={14} /> Главная
        </button>
        <span style={{ color: "#D1D5DB" }}>›</span>
        <span style={{ color: "#374151", fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>Анонсы стартов продаж</span>
      </div>
      <div style={{ padding: "0 clamp(1rem,5vw,4rem)" }}>
        <LaunchesSection setPage={setPage} showAll />
      </div>
    </div>
  );
}

// ─── Застройщики ──────────────────────────────────────────────────────────────

function DevelopersPage() {
  const [search, setSearch] = useState("");
  return (
    <div style={{ padding: "2.5rem clamp(1rem,5vw,4rem)", background: "#F5F6F8", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.4rem", color: "#111827" }}>Застройщики</h1>
      <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Проверенные девелоперы с актуальными проектами</p>
      <div style={{ position: "relative", maxWidth: 400, marginBottom: "2rem" }}>
        <Icon name="Search" size={14} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
        <input placeholder="Поиск застройщика..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 10, padding: "0.6rem 0.9rem 0.6rem 2.4rem", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#374151", outline: "none", background: "#fff" }} />
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EBF0", textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ width: 56, height: 56, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <Icon name="Users" size={24} style={{ color: "#2563EB" }} />
        </div>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>Список застройщиков появится скоро</h3>
        <p style={{ color: "#6B7280", fontSize: "0.82rem" }}>Верифицируем партнёров и добавляем в базу</p>
      </div>
    </div>
  );
}

// ─── Контакты ─────────────────────────────────────────────────────────────────

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const inp = { border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.6rem 0.85rem", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#374151", outline: "none", width: "100%", background: "#fff" };

  return (
    <div style={{ padding: "2.5rem clamp(1rem,5vw,4rem)", background: "#F5F6F8", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.35rem", color: "#111827" }}>Контакты</h1>
      <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "2.5rem" }}>Ответим в течение 30 минут в рабочее время</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EBF0", padding: "1.75rem" }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "1.25rem" }}>Оставить заявку</h2>
          {sent ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
              <div style={{ width: 52, height: 52, background: "#DCFCE7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Icon name="CheckCircle" size={24} style={{ color: "#16A34A" }} />
              </div>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "0.35rem" }}>Заявка отправлена!</h3>
              <p style={{ color: "#6B7280", fontSize: "0.82rem" }}>Свяжемся в ближайшее время</p>
              <button onClick={() => setSent(false)} style={{ marginTop: "1.25rem", background: "none", border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.5rem 1.25rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", cursor: "pointer" }}>Ещё раз</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[{ k: "name" as const, l: "Имя", t: "text", ph: "Ваше имя" }, { k: "phone" as const, l: "Телефон", t: "tel", ph: "+7 (___) ___-__-__" }, { k: "email" as const, l: "Email", t: "email", ph: "your@email.com" }].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: "0.76rem", fontWeight: 500, color: "#6B7280", display: "block", marginBottom: "0.3rem" }}>{f.l}</label>
                  <input type={f.t} placeholder={f.ph} style={inp} value={form[f.k]} onChange={set(f.k)} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 500, color: "#6B7280", display: "block", marginBottom: "0.3rem" }}>Бюджет</label>
                <select style={{ ...inp, appearance: "none" as const }} value={form.budget} onChange={set("budget")}>
                  <option value="">Не указан</option>
                  <option>До 5 млн ₽</option><option>5–10 млн ₽</option><option>10–20 млн ₽</option><option>Более 20 млн ₽</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 500, color: "#6B7280", display: "block", marginBottom: "0.3rem" }}>Сообщение</label>
                <textarea placeholder="Расскажите о пожеланиях..." rows={3} style={{ ...inp, resize: "vertical" }} value={form.message} onChange={set("message")} />
              </div>
              <button type="submit" style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "0.65rem", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", width: "100%" }}>
                Отправить заявку
              </button>
              <p style={{ color: "#9CA3AF", fontSize: "0.72rem", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EBF0", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>Контактная информация</h2>
            {[{ icon: "MapPin", l: "Адрес", v: "Москва" }, { icon: "Phone", l: "Телефон", v: "+7 (495) 123-45-67" }, { icon: "Mail", l: "Email", v: "info@novostroiki-msk.ru" }, { icon: "Clock", l: "Режим работы", v: "Пн–Вс: 9:00–21:00" }].map(c => (
              <div key={c.l} style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.875rem" }}>
                <div style={{ width: 32, height: 32, background: "#EFF6FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={c.icon as "MapPin"} size={14} style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", color: "#9CA3AF", fontWeight: 500 }}>{c.l}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#111827" }}>{c.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "1.25rem", background: "#DCFCE7", borderRadius: 12, border: "1px solid #BBF7D0", display: "flex", gap: "0.75rem" }}>
            <Icon name="ShieldCheck" size={18} style={{ color: "#16A34A", flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#166534" }}>Консультация бесплатна</div>
              <div style={{ fontSize: "0.78rem", color: "#166534", lineHeight: 1.5, marginTop: "0.15rem" }}>Никаких комиссий с покупателей. Оплата от застройщиков по договору.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer style={{ background: "#1F2937", color: "#9CA3AF", padding: "2.5rem clamp(1rem,5vw,4rem)" }}>
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.6rem" }}>
            <div style={{ width: 28, height: 28, background: "#2563EB", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Building2" size={14} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#F9FAFB" }}>
              Новостройки<span style={{ color: "#60A5FA" }}>МСК</span>
            </span>
          </div>
          <p style={{ fontSize: "0.78rem", lineHeight: 1.6, maxWidth: 220 }}>Агрегатор новостроек Москвы и Подмосковья</p>
        </div>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { title: "Сервис", links: [["home", "Главная"], ["catalog", "Новостройки"], ["launches", "Анонсы стартов"], ["developers", "Застройщики"]] },
            { title: "Помощь", links: [["contact", "Контакты"], ["contact", "Для застройщиков"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 600, color: "#F9FAFB", fontSize: "0.8rem", marginBottom: "0.6rem" }}>{col.title}</div>
              {col.links.map(([id, l], i) => (
                <button key={i} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: "0.78rem", padding: "0.18rem 0", fontFamily: "Inter, sans-serif", textAlign: "left" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#F9FAFB"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}>
                  {l}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #374151", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.74rem" }}>© 2026 НовостройкиМСК</span>
        <span style={{ fontSize: "0.74rem" }}>Политика конфиденциальности</span>
      </div>
    </footer>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function Index() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#F5F6F8" }}>
      <NavBar page={page} setPage={setPage} />
      <div style={{ paddingTop: 56 }}>
        {page === "home"       && <HomePage setPage={setPage} />}
        {page === "catalog"    && <CatalogPage />}
        {page === "launches"   && <LaunchesPage setPage={setPage} />}
        {page === "developers" && <DevelopersPage />}
        {page === "contact"    && <ContactPage />}
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}
