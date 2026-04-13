import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  developer: string;
  district: string;
  metro: string;
  metroMin: number;
  minPrice: number;
  deadline: string;
  deadlineQ: string;
  rooms: string;
  class: string;
  badge?: string;
  badgeColor?: "blue" | "green" | "orange" | "red";
  img: string;
  url: string;
}

// ─── 12 объектов анонсов ─────────────────────────────────────────────────────

const LAUNCHES: Project[] = [
  {
    id: 1,
    name: "Аурум Тайм",
    developer: "Аурум Девелопмент",
    district: "Краснодарская",
    metro: "Краснодарская",
    metroMin: 7,
    minPrice: 9_200_000,
    deadline: "IV кв. 2026",
    deadlineQ: "2026",
    rooms: "Студии, 1–3 к",
    class: "Комфорт",
    badge: "Старт продаж",
    badgeColor: "orange",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/1.html",
  },
  {
    id: 2,
    name: "Крекшино Парк",
    developer: "Самолёт",
    district: "Новая Москва",
    metro: "Крекшино (МЦД)",
    metroMin: 5,
    minPrice: 6_500_000,
    deadline: "II кв. 2027",
    deadlineQ: "2027",
    rooms: "Студии, 1–4 к",
    class: "Комфорт",
    badge: "Старт продаж",
    badgeColor: "orange",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/2.html",
  },
  {
    id: 3,
    name: "Никольский квартал Отрада, к. 6–7",
    developer: "РГ-Девелопмент",
    district: "СВАО",
    metro: "Отрадное",
    metroMin: 12,
    minPrice: 8_900_000,
    deadline: "III кв. 2026",
    deadlineQ: "2026",
    rooms: "Студии, 1–3 к",
    class: "Комфорт",
    badge: "Новый корпус",
    badgeColor: "blue",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/3.html",
  },
  {
    id: 4,
    name: "Апсайд Мосфильмовская",
    developer: "Апсайд",
    district: "ЗАО",
    metro: "Мосфильмовская",
    metroMin: 10,
    minPrice: 18_500_000,
    deadline: "IV кв. 2026",
    deadlineQ: "2026",
    rooms: "1–4 к",
    class: "Бизнес",
    badge: "Старт продаж",
    badgeColor: "orange",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/4.html",
  },
  {
    id: 5,
    name: "Мангазея на Речном. Новая очередь",
    developer: "Мангазея",
    district: "САО",
    metro: "Речной вокзал",
    metroMin: 8,
    minPrice: 11_200_000,
    deadline: "I кв. 2027",
    deadlineQ: "2027",
    rooms: "Студии, 1–3 к",
    class: "Бизнес",
    badge: "Новая очередь",
    badgeColor: "blue",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/5.html",
  },
  {
    id: 6,
    name: "Каштановая роща, 2 очередь",
    developer: "ФСК",
    district: "Новая Москва",
    metro: "Рассказовка",
    metroMin: 15,
    minPrice: 7_300_000,
    deadline: "II кв. 2026",
    deadlineQ: "2026",
    rooms: "Студии, 1–3 к",
    class: "Комфорт",
    badge: "2 очередь",
    badgeColor: "green",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/6.html",
  },
  {
    id: 7,
    name: "Квартал Светлый, 2 очередь",
    developer: "Основа",
    district: "ЮВАО",
    metro: "Люблино",
    metroMin: 20,
    minPrice: 7_800_000,
    deadline: "III кв. 2026",
    deadlineQ: "2026",
    rooms: "Студии, 1–3 к",
    class: "Комфорт",
    badge: "2 очередь",
    badgeColor: "green",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/7.html",
  },
  {
    id: 8,
    name: "Vesper на Шабаловке",
    developer: "Vesper",
    district: "ЮАО",
    metro: "Шаболовская",
    metroMin: 3,
    minPrice: 35_000_000,
    deadline: "IV кв. 2027",
    deadlineQ: "2027",
    rooms: "1–4 к, пентхаусы",
    class: "Премиум",
    badge: "Старт продаж",
    badgeColor: "orange",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/8.html",
  },
  {
    id: 9,
    name: "Дом Палашевский 11",
    developer: "ГАЛС",
    district: "ЦАО",
    metro: "Пушкинская",
    metroMin: 5,
    minPrice: 45_000_000,
    deadline: "II кв. 2027",
    deadlineQ: "2027",
    rooms: "2–5 к",
    class: "Элит",
    badge: "Старт продаж",
    badgeColor: "orange",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/9.html",
  },
  {
    id: 10,
    name: "БЦ Мневники 4",
    developer: "Донстрой",
    district: "ЗАО",
    metro: "Терехово",
    metroMin: 12,
    minPrice: 13_500_000,
    deadline: "I кв. 2027",
    deadlineQ: "2027",
    rooms: "Студии, 1–3 к",
    class: "Бизнес",
    badge: "Новый проект",
    badgeColor: "blue",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/10.html",
  },
  {
    id: 11,
    name: "Химки Парк",
    developer: "MR Group",
    district: "Подмосковье",
    metro: "Химки",
    metroMin: 10,
    minPrice: 6_900_000,
    deadline: "IV кв. 2026",
    deadlineQ: "2026",
    rooms: "Студии, 1–4 к",
    class: "Комфорт",
    badge: "Старт продаж",
    badgeColor: "orange",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/11.html",
  },
  {
    id: 12,
    name: "Лесная Отрада, 2 оч., корп. 2",
    developer: "Aelius Estate",
    district: "СВАО",
    metro: "Отрадное",
    metroMin: 18,
    minPrice: 9_100_000,
    deadline: "III кв. 2026",
    deadlineQ: "2026",
    rooms: "Студии, 1–3 к",
    class: "Комфорт",
    badge: "Новый корпус",
    badgeColor: "blue",
    img: "https://static.tildacdn.com/tild3166-3138-4132-b736-306237363937/-/resize/504x/-1___1.jpg",
    url: "https://lab.xn--d1alfcjp.xn--p1ai/12.html",
  },
];

const DISTRICTS = ["Все районы", "ЦАО", "СВАО", "ВАО", "ЮВАО", "ЮАО", "ЮЗАО", "ЗАО", "СЗАО", "САО", "Новая Москва", "Подмосковье"];
const DEADLINES = ["Любой срок", "2025", "2026", "2027", "2028+"];
const CLASSES = ["Любой класс", "Комфорт", "Бизнес", "Премиум", "Элит"];
const ROOM_LABELS = ["Студия", "1", "2", "3", "4+"];

const fmtPrice = (n: number) => (n / 1_000_000).toFixed(1).replace(".0", "") + " млн ₽";

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  blue: { bg: "#EFF6FF", color: "#1D4ED8" },
  green: { bg: "#DCFCE7", color: "#16A34A" },
  orange: { bg: "#FFF7ED", color: "#EA580C" },
  red: { bg: "#FEF2F2", color: "#DC2626" },
};

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ p }: { p: Project }) {
  const bc = p.badgeColor ? BADGE_COLORS[p.badgeColor] : BADGE_COLORS.blue;
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div style={{
        background: "#fff",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transition: "all 0.22s",
        cursor: "pointer",
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
          el.style.transform = "translateY(-3px)";
          el.style.borderColor = "#CBD5E1";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "";
          el.style.transform = "";
          el.style.borderColor = "var(--border)";
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 180, background: "linear-gradient(135deg, #1E3A8A, #3B82F6)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.15 }}>
            <Icon name="Building2" size={80} style={{ color: "#fff" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />

          {/* Badge */}
          {p.badge && (
            <div style={{ position: "absolute", top: 10, left: 10, background: bc.bg, color: bc.color, fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 6, letterSpacing: "0.02em" }}>
              {p.badge}
            </div>
          )}

          {/* Class */}
          <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: 6, backdropFilter: "blur(4px)" }}>
            {p.class}
          </div>

          {/* Bottom info over image */}
          <div style={{ position: "absolute", bottom: 10, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399" }} />
              <span style={{ color: "#D1FAE5", fontSize: "0.72rem", fontWeight: 500 }}>Продажи открыты</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.68rem" }}>Сдача: {p.deadline}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1rem 1.1rem 1.1rem" }}>
          <h3 style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 700,
            fontSize: "0.95rem", lineHeight: 1.3, marginBottom: "0.3rem",
            color: "var(--text-primary)", letterSpacing: "-0.01em",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            ЖК «{p.name}»
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: "0.75rem" }}>
            <Icon name="MapPin" size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              {p.metro}, {p.metroMin} мин. · {p.district}
            </span>
          </div>

          <div style={{ height: 1, background: "var(--border)", marginBottom: "0.75rem" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.15rem" }}>от</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                {fmtPrice(p.minPrice)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.15rem" }}>Квартиры</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>{p.rooms}</div>
            </div>
          </div>

          <div style={{ marginTop: "0.85rem", display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 18, height: 18, background: "var(--accent-light)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="Users" size={10} style={{ color: "var(--accent)" }} />
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{p.developer}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function NavBar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [mob, setMob] = useState(false);
  const links = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Новостройки" },
    { id: "launches", label: "Анонсы стартов" },
    { id: "developers", label: "Застройщики" },
    { id: "about", label: "О сервисе" },
    { id: "contact", label: "Контакты" },
  ];
  const go = (id: string) => { setPage(id); setMob(false); window.scrollTo({ top: 0 }); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid var(--border)",
        height: 64, display: "flex", alignItems: "center",
        padding: "0 clamp(1rem,3vw,2.5rem)", gap: "1.5rem",
      }}>
        {/* Logo */}
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", flexShrink: 0, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="Building2" size={17} style={{ color: "#fff" }} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Новостройки<span style={{ color: "var(--accent)" }}>МСК</span>
            </div>
            <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.02em" }}>Агрегатор новых ЖК</div>
          </div>
        </button>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.1rem", alignItems: "center", flex: 1 }} className="hidden md:flex">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: page === l.id ? "var(--accent-light)" : "none",
              border: "none", cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500,
              color: page === l.id ? "var(--accent)" : "var(--text-secondary)",
              padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)",
              transition: "all 0.15s", whiteSpace: "nowrap",
            } as React.CSSProperties}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Phone + CTA */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginLeft: "auto", flexShrink: 0 }} className="hidden md:flex">
          <a href="tel:+74951234567" style={{
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "Manrope, sans-serif", fontWeight: 700,
            fontSize: "0.9rem", color: "var(--text-primary)", textDecoration: "none",
          }}>
            <Icon name="Phone" size={15} style={{ color: "var(--accent)" }} />
            +7 (495) 123-45-67
          </a>
          <button className="btn-primary" onClick={() => go("contact")} style={{ padding: "0.55rem 1.25rem", fontSize: "0.8rem" }}>
            Подобрать квартиру
          </button>
        </div>

        <button onClick={() => setMob(!mob)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto", padding: "0.4rem" }}>
          <Icon name={mob ? "X" : "Menu"} size={22} style={{ color: "var(--text-primary)" }} />
        </button>
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
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a href="tel:+74951234567" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>+7 (495) 123-45-67</a>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("contact")}>Подобрать квартиру</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSearch({ onSearch }: { onSearch: () => void }) {
  const [search, setSearch] = useState("");

  return (
    <div style={{
      background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 45%, #1D4ED8 100%)",
      padding: "4.5rem clamp(1rem,5vw,4rem) 3.5rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "45%", aspectRatio: "1", background: "rgba(255,255,255,0.03)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "5%", width: "30%", aspectRatio: "1", background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
        {/* Top badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "0.3rem 0.9rem", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399" }} />
          <span style={{ color: "#A7F3D0", fontSize: "0.78rem", fontWeight: 600 }}>Москва и Московская область</span>
        </div>

        {/* Main headline */}
        <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff", lineHeight: 1.12, marginBottom: "0.5rem", letterSpacing: "-0.035em" }}>
          Более 66 000 квартир
        </h1>
        <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.12, marginBottom: "1.5rem", letterSpacing: "-0.035em" }}>
          в Москве
        </h2>
        <p style={{ color: "#93C5FD", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 500 }}>
          Находите новостройки, сравнивайте застройщиков и выбирайте лучшие условия — всё в одном месте
        </p>

        {/* Search */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "0.45rem", display: "flex", gap: "0.5rem", maxWidth: 620, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
          {/* District */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 0.75rem", borderRight: "1px solid var(--border)", flexShrink: 0 }}>
            <Icon name="MapPin" size={14} style={{ color: "var(--text-muted)" }} />
            <select style={{ border: "none", outline: "none", fontSize: "0.85rem", color: "var(--text-primary)", cursor: "pointer", fontFamily: "Inter, sans-serif", background: "transparent", appearance: "none", paddingRight: "0.5rem" }}>
              <option>Вся Москва</option>
              {DISTRICTS.slice(1).map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Text search */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 0.5rem" }}>
            <Icon name="Search" size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSearch()}
              placeholder="ЖК, застройщик или район..."
              style={{ border: "none", outline: "none", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%", fontFamily: "Inter, sans-serif", background: "transparent" }}
            />
          </div>
          <button className="btn-primary" onClick={onSearch} style={{ flexShrink: 0, borderRadius: 8 }}>
            Найти
          </button>
        </div>

        {/* Quick filter tags */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
          {["Студии", "1-комнатные", "2-комнатные", "С отделкой", "До 10 млн ₽", "Бизнес-класс"].map(tag => (
            <button key={tag} onClick={onSearch} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#BFDBFE", fontSize: "0.78rem", fontWeight: 500,
              padding: "0.3rem 0.8rem", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
              fontFamily: "Inter, sans-serif",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "2.5rem", marginTop: "3rem", flexWrap: "wrap", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {[
          { v: "66 000+", l: "квартир в базе", icon: "Key" },
          { v: "350+", l: "жилых комплексов", icon: "Building2" },
          { v: "120+", l: "застройщиков", icon: "Users" },
          { v: "Бесплатно", l: "для покупателей", icon: "BadgeCheck" },
        ].map(s => (
          <div key={s.l} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={s.icon as "Key"} size={16} style={{ color: "#93C5FD" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#fff", lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: "#93C5FD", fontSize: "0.72rem", marginTop: 2 }}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Launches Section (Анонсы стартов продаж) ─────────────────────────────────

function LaunchesSection({ setPage, showAll = false }: { setPage: (p: string) => void; showAll?: boolean }) {
  const visible = showAll ? LAUNCHES : LAUNCHES.slice(0, 6);
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };

  return (
    <div style={{ padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.4rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F97316" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#EA580C", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>
              Горячее
            </span>
          </div>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.35rem,3vw,1.75rem)", color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
            Анонсы стартов продаж
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            {LAUNCHES.length} объектов — первыми узнавайте об открытии продаж
          </p>
        </div>

        {!showAll && (
          <button
            className="btn-secondary"
            onClick={() => go("launches")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            Показать все {LAUNCHES.length}
            <Icon name="ArrowRight" size={15} />
          </button>
        )}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "1.25rem",
      }}>
        {visible.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>

      {!showAll && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="btn-secondary" onClick={() => go("launches")} style={{ padding: "0.75rem 2rem" }}>
            <Icon name="Grid3X3" size={15} />
            Показать все {LAUNCHES.length} объектов
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Страница: Главная ───────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };

  return (
    <div>
      <HeroSearch onSearch={() => go("catalog")} />

      {/* Launches preview */}
      <div style={{ background: "var(--bg)" }}>
        <LaunchesSection setPage={setPage} showAll={false} />
      </div>

      {/* Why us */}
      <div style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "3rem clamp(1rem,5vw,4rem)" }}>
        <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "2rem", letterSpacing: "-0.02em" }}>Почему выбирают нас</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: "ShieldCheck", title: "Проверенные объекты", text: "Только аккредитованные ЖК от надёжных застройщиков" },
            { icon: "Banknote", title: "Бесплатно для вас", text: "Никаких комиссий. Оплата — от застройщиков по договору" },
            { icon: "RefreshCw", title: "Актуальные данные", text: "Цены и наличие квартир обновляются напрямую" },
            { icon: "Headphones", title: "Личный эксперт", text: "Сопроводим на всех этапах — от выбора до ключей" },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: "0.85rem" }}>
              <div style={{ width: 40, height: 40, background: "var(--accent-light)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={f.icon as "ShieldCheck"} size={18} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{f.title}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.55 }}>{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "var(--accent)", padding: "3.5rem clamp(1rem,5vw,4rem)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.025em" }}>
          Нужна помощь с выбором?
        </h2>
        <p style={{ color: "#BFDBFE", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
          Эксперт перезвонит в течение 15 минут и подберёт варианты под ваши задачи
        </p>
        <button className="btn-secondary" onClick={() => go("contact")} style={{ margin: "0 auto" }}>
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
  const reset = () => { setDistrict("Все районы"); setDeadline("Любой срок"); setCls("Любой класс"); setRooms([]); setPriceMin(""); setPriceMax(""); };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Filters sidebar */}
      <aside style={{
        width: showFilters ? 270 : 0, flexShrink: 0,
        background: "#fff", borderRight: "1px solid var(--border)",
        overflow: "hidden", transition: "width 0.25s",
      }}>
        <div style={{ width: 270, padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>Фильтры</span>
            <button onClick={reset} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: "0.78rem", fontWeight: 600 }}>Сбросить</button>
          </div>

          {[
            { label: "Район", el: <select className="sel" value={district} onChange={e => setDistrict(e.target.value)}>{DISTRICTS.map(d => <option key={d}>{d}</option>)}</select> },
            { label: "Класс жилья", el: <select className="sel" value={cls} onChange={e => setCls(e.target.value)}>{CLASSES.map(c => <option key={c}>{c}</option>)}</select> },
            { label: "Срок сдачи", el: <select className="sel" value={deadline} onChange={e => setDeadline(e.target.value)}>{DEADLINES.map(d => <option key={d}>{d}</option>)}</select> },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.45rem" }}>{f.label}</label>
              {f.el}
            </div>
          ))}

          <div>
            <label style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.45rem" }}>Комнат</label>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {ROOM_LABELS.map((l, i) => (
                <button key={l} className={`tag ${rooms.includes(i) ? "active" : ""}`} onClick={() => toggleRoom(i)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.45rem" }}>Цена, ₽</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input className="inp" placeholder="от" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{ textAlign: "center" }} />
              <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>—</span>
              <input className="inp" placeholder="до" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{ textAlign: "center" }} />
            </div>
          </div>

          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            <Icon name="SlidersHorizontal" size={15} />
            Применить
          </button>
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, padding: "2rem", background: "var(--bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button className="btn-secondary" onClick={() => setShowFilters(!showFilters)} style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}>
              <Icon name="SlidersHorizontal" size={14} />
              {showFilters ? "Скрыть" : "Фильтры"}
            </button>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Объектов: <strong style={{ color: "var(--text-primary)" }}>0</strong></span>
          </div>
          <select className="sel" style={{ width: 200 }}>
            <option>По умолчанию</option>
            <option>Цена ↑</option>
            <option>Цена ↓</option>
            <option>Срок сдачи</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {["Все", "Со скидкой", "Ипотека 0%", "Готовые", "С отделкой", "У метро"].map((p, i) => (
            <button key={p} className={`pill ${i === 0 ? "active" : ""}`}>{p}</button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "1rem" }}>
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Icon name="Building2" size={28} style={{ color: "var(--accent)" }} />
            </div>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>База объектов пополняется</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", maxWidth: 340, margin: "0 auto" }}>
              Полный каталог новостроек появится в ближайшее время. Пока можете посмотреть анонсы стартов продаж.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Страница: Все анонсы ────────────────────────────────────────────────────

function LaunchesPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ padding: "2rem clamp(1rem,5vw,4rem) 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <button onClick={() => { setPage("home"); window.scrollTo({ top: 0 }); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="ChevronLeft" size={14} /> Главная
          </button>
          <span style={{ color: "var(--text-muted)" }}>·</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Анонсы стартов продаж</span>
        </div>
      </div>
      <LaunchesSection setPage={setPage} showAll />
    </div>
  );
}

// ─── Застройщики ─────────────────────────────────────────────────────────────

function DevelopersPage() {
  const [search, setSearch] = useState("");
  return (
    <div style={{ padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.4rem", letterSpacing: "-0.025em" }}>Застройщики</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" }}>Проверенные девелоперы с актуальными проектами</p>
      <div style={{ position: "relative", maxWidth: 400, marginBottom: "2rem" }}>
        <Icon name="Search" size={15} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
        <input className="inp" placeholder="Найти застройщика..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "2.5rem" }} />
      </div>
      <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <Icon name="Users" size={28} style={{ color: "var(--accent)" }} />
        </div>
        <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Список застройщиков появится скоро</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", maxWidth: 340, margin: "0 auto" }}>Верифицируем партнёров и добавляем их в базу</p>
      </div>
    </div>
  );
}

// ─── О сервисе ────────────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0F172A, #1E3A8A)", padding: "5rem clamp(1rem,5vw,4rem)" }}>
        <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-0.03em" }}>
          О сервисе НовостройкиМСК
        </h1>
        <p style={{ color: "#93C5FD", fontSize: "1rem", lineHeight: 1.7, maxWidth: 540 }}>
          Агрегатор новостроек Москвы и Подмосковья. Помогаем найти квартиру мечты среди тысяч предложений.
        </p>
      </div>
      <div style={{ padding: "3rem clamp(1rem,5vw,4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { icon: "Eye", title: "Прозрачность", text: "Реальные цены без скрытых наценок" },
            { icon: "Scale", title: "Объективность", text: "Показываем все объекты, не только партнёрские" },
            { icon: "Lock", title: "Безопасность", text: "Только аккредитованные проекты" },
            { icon: "Zap", title: "Скорость", text: "Подходящий вариант — за минуты" },
          ].map(v => (
            <div key={v.title} style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "1.5rem" }}>
              <div style={{ width: 40, height: 40, background: "var(--accent-light)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                <Icon name={v.icon as "Eye"} size={18} style={{ color: "var(--accent)" }} />
              </div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, marginBottom: "0.3rem" }}>{v.title}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.84rem" }}>{v.text}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "2rem" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>Что запускаем</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Каталог новостроек", status: "soon" },
              { label: "Профили застройщиков", status: "soon" },
              { label: "Ипотечный калькулятор", status: "later" },
              { label: "Сравнение объектов", status: "later" },
              { label: "Личный кабинет и избранное", status: "later" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.85rem 1rem", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
                <span style={{ background: item.status === "soon" ? "#FFF7ED" : "var(--surface)", color: item.status === "soon" ? "#EA580C" : "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: 6, flexShrink: 0 }}>
                  {item.status === "soon" ? "Скоро" : "Позже"}
                </span>
                <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button className="btn-primary" onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}>Связаться с нами</button>
        </div>
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

  return (
    <div style={{ padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.4rem", letterSpacing: "-0.025em" }}>Контакты</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "0.875rem" }}>Ответим в течение 30 минут в рабочее время</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
        <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "2rem" }}>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Оставить заявку</h2>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ width: 56, height: 56, background: "#DCFCE7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Icon name="CheckCircle" size={26} style={{ color: "#16A34A" }} />
              </div>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>Заявка отправлена!</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Свяжемся с вами в ближайшее время</p>
              <button className="btn-secondary" style={{ marginTop: "1.5rem" }} onClick={() => setSent(false)}>Ещё раз</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[{ k: "name" as const, l: "Имя", t: "text", ph: "Ваше имя" }, { k: "phone" as const, l: "Телефон", t: "tel", ph: "+7 (___) ___-__-__" }, { k: "email" as const, l: "Email", t: "email", ph: "your@email.com" }].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>{f.l}</label>
                  <input type={f.t} placeholder={f.ph} className="inp" value={form[f.k]} onChange={set(f.k)} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>Бюджет</label>
                <select className="sel" value={form.budget} onChange={set("budget")}>
                  <option value="">Не указан</option>
                  <option>До 5 млн ₽</option><option>5–10 млн ₽</option><option>10–20 млн ₽</option><option>20–50 млн ₽</option><option>Более 50 млн ₽</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>Сообщение</label>
                <textarea placeholder="Расскажите о пожеланиях..." className="inp" rows={3} value={form.message} onChange={set("message")} style={{ resize: "vertical" }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Отправить заявку</button>
              <p style={{ color: "var(--text-muted)", fontSize: "0.73rem", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "1.75rem" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "1.25rem" }}>Контактная информация</h2>
            {[
              { icon: "MapPin", l: "Адрес", v: "Москва" },
              { icon: "Phone", l: "Телефон", v: "+7 (495) 123-45-67" },
              { icon: "Mail", l: "Email", v: "info@novostroiki-msk.ru" },
              { icon: "Clock", l: "Режим работы", v: "Пн–Вс: 9:00–21:00" },
            ].map(c => (
              <div key={c.l} style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ width: 36, height: 36, background: "var(--accent-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={c.icon as "MapPin"} size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{c.l}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{c.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "1.5rem" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>Мессенджеры</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}><Icon name="MessageCircle" size={15} />Telegram</button>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}><Icon name="Phone" size={15} />WhatsApp</button>
            </div>
          </div>
          <div style={{ padding: "1.25rem", background: "#DCFCE7", borderRadius: "var(--radius)", border: "1px solid #BBF7D0", display: "flex", gap: "0.75rem" }}>
            <Icon name="ShieldCheck" size={18} style={{ color: "#16A34A", flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#166534", marginBottom: "0.2rem" }}>Консультация бесплатна</div>
              <div style={{ fontSize: "0.8rem", color: "#166534", lineHeight: 1.5 }}>Никаких комиссий с покупателей. Оплата — от застройщиков по договору.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer style={{ background: "#111827", color: "#9CA3AF", padding: "3rem clamp(1rem,5vw,4rem)" }}>
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div style={{ maxWidth: 240 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <div style={{ width: 30, height: 30, background: "var(--accent)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Building2" size={15} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#F9FAFB" }}>
              Новостройки<span style={{ color: "#60A5FA" }}>МСК</span>
            </span>
          </div>
          <p style={{ fontSize: "0.8rem", lineHeight: 1.65 }}>Агрегатор новостроек Москвы и Подмосковья.</p>
        </div>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 600, color: "#F9FAFB", fontSize: "0.82rem", marginBottom: "0.75rem" }}>Сервис</div>
            {[["home", "Главная"], ["catalog", "Новостройки"], ["launches", "Анонсы стартов"], ["developers", "Застройщики"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: "0.8rem", padding: "0.2rem 0", transition: "color 0.15s", textAlign: "left" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#F9FAFB"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#F9FAFB", fontSize: "0.82rem", marginBottom: "0.75rem" }}>Помощь</div>
            {[["contact", "Контакты"], ["contact", "Для застройщиков"], ["about", "О нас"]].map(([id, l], i) => (
              <button key={i} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: "0.8rem", padding: "0.2rem 0", transition: "color 0.15s", textAlign: "left" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#F9FAFB"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1F2937", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.76rem" }}>© 2026 НовостройкиМСК</span>
        <span style={{ fontSize: "0.76rem" }}>Политика конфиденциальности</span>
      </div>
    </footer>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function Index() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "var(--bg)", minHeight: "100vh" }}>
      <NavBar page={page} setPage={setPage} />
      <div style={{ paddingTop: 64 }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "catalog" && <CatalogPage />}
        {page === "launches" && <LaunchesPage setPage={setPage} />}
        {page === "developers" && <DevelopersPage />}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "contact" && <ContactPage />}
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}
