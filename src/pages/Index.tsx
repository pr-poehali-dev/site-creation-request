import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/files/9bdb83b5-35e3-4caf-adb6-f855595c6195.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/files/48fbf837-485c-41f0-b258-db8111fef338.jpg";
const BUILDING_IMG = "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/files/18a6da95-7351-4981-bc31-d2c05bb16348.jpg";

const properties = [
  { id: 1, name: "GRAND TOWER", district: "Москва-Сити", developer: "Донстрой", price: 42000000, area: 87, rooms: 2, deadline: "2025 Q4", img: BUILDING_IMG, badge: "Хит продаж" },
  { id: 2, name: "NOBEL RESIDENCE", district: "Хамовники", developer: "Capital Group", price: 98000000, area: 134, rooms: 3, deadline: "2026 Q2", img: INTERIOR_IMG, badge: "Топ инвестиция" },
  { id: 3, name: "SKY GARDEN", district: "Пресня", developer: "MR Group", price: 31000000, area: 62, rooms: 1, deadline: "2025 Q2", img: HERO_IMG, badge: null },
  { id: 4, name: "LEGION III", district: "Раменки", developer: "Донстрой", price: 55000000, area: 105, rooms: 3, deadline: "2026 Q4", img: BUILDING_IMG, badge: null },
  { id: 5, name: "RITZ PRIME", district: "Якиманка", developer: "Pioneer", price: 125000000, area: 198, rooms: 4, deadline: "2027 Q1", img: INTERIOR_IMG, badge: "Эксклюзив" },
  { id: 6, name: "VERDE PARK", district: "Фили", developer: "Capital Group", price: 28000000, area: 55, rooms: 1, deadline: "2025 Q3", img: HERO_IMG, badge: null },
  { id: 7, name: "ARTEFACT", district: "Замоскворечье", developer: "MR Group", price: 76000000, area: 118, rooms: 3, deadline: "2026 Q1", img: BUILDING_IMG, badge: "Новинка" },
  { id: 8, name: "ONE TSVETNOY", district: "Цветной бульвар", developer: "Pioneer", price: 89000000, area: 156, rooms: 4, deadline: "2026 Q3", img: INTERIOR_IMG, badge: null },
];

const blogPosts = [
  { id: 1, title: "Почему Москва-Сити остаётся главным активом инвестора", date: "10 апреля 2026", category: "Инвестиции", read: "6 мин", img: BUILDING_IMG },
  { id: 2, title: "Новостройка vs вторичка: куда вложить капитал в 2026", date: "2 апреля 2026", category: "Аналитика", read: "8 мин", img: INTERIOR_IMG },
  { id: 3, title: "Топ-5 застройщиков Москвы по надёжности и доходности", date: "25 марта 2026", category: "Застройщики", read: "5 мин", img: HERO_IMG },
];

const developers = ["Все застройщики", "Донстрой", "Capital Group", "MR Group", "Pioneer"];
const deadlines = ["Любой срок", "2025", "2026", "2027+"];

const S: Record<string, React.CSSProperties> = {
  page: { backgroundColor: "#0E0B08", minHeight: "100vh", color: "#EDE8DF", fontFamily: "'Golos Text', sans-serif" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "rgba(14,11,8,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.12)", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem" },
  logo: { display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" },
  logoBar: { width: 2, height: 28, background: "#C9A84C" },
  logoText: { fontFamily: "Cormorant, serif", fontSize: "1.45rem", fontWeight: 600, color: "#C9A84C", letterSpacing: "0.15em" },
  navLinks: { display: "flex", gap: "2rem", alignItems: "center" },
  navBtn: { background: "none", border: "none", cursor: "pointer", fontFamily: "'Golos Text', sans-serif", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, transition: "color 0.2s" },
  btnGold: { background: "linear-gradient(135deg, #8A6D2E, #C9A84C)", color: "#0E0B08", fontFamily: "'Golos Text', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontSize: "0.72rem", padding: "0.8rem 2rem", border: "none", cursor: "pointer", transition: "all 0.3s" },
  btnOutline: { background: "transparent", border: "1px solid #8A6D2E", color: "#C9A84C", fontFamily: "'Golos Text', sans-serif", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontSize: "0.72rem", padding: "0.8rem 2rem", cursor: "pointer", transition: "all 0.3s" },
  sectionPad: { padding: "5rem clamp(1.5rem,6vw,7rem)" },
  label: { color: "#C9A84C", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, marginBottom: "0.6rem", display: "block" },
  h1: { fontFamily: "Cormorant, serif", fontWeight: 300, lineHeight: 1.05 },
  h2: { fontFamily: "Cormorant, serif", fontWeight: 300 },
  muted: { color: "#A89880" },
  goldLine: { height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "1rem 0" },
  card: { backgroundColor: "#161210", border: "1px solid rgba(201,168,76,0.13)", transition: "all 0.35s" },
  inputBox: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", color: "#EDE8DF", fontFamily: "'Golos Text', sans-serif", fontSize: "0.875rem", padding: "0.75rem 1rem", outline: "none", width: "100%", boxSizing: "border-box" as const },
  selectBox: { background: "rgba(14,11,8,0.9)", border: "1px solid rgba(201,168,76,0.2)", color: "#EDE8DF", fontFamily: "'Golos Text', sans-serif", fontSize: "0.875rem", padding: "0.75rem 1rem", outline: "none", width: "100%", appearance: "none" as const, cursor: "pointer" },
};

function GoldLine() {
  return <div style={S.goldLine} />;
}

function PropertyCard({ p, isFav, onFav }: { p: typeof properties[0]; isFav: boolean; onFav: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ ...S.card, overflow: "hidden", transform: hovered ? "translateY(-3px)" : "none", boxShadow: hovered ? "0 8px 40px rgba(201,168,76,0.1)" : "none", borderColor: hovered ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.13)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,11,8,0.75) 0%, transparent 55%)" }} />
        {p.badge && (
          <div style={{ position: "absolute", top: 12, left: 12, background: "#C9A84C", color: "#0E0B08", padding: "0.2rem 0.65rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.badge}</div>
        )}
        <button onClick={() => onFav(p.id)} style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(14,11,8,0.75)", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="Heart" size={15} style={{ color: isFav ? "#C9A84C" : "#A89880", fill: isFav ? "#C9A84C" : "none" }} />
        </button>
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
          <div>
            <div style={{ fontFamily: "Cormorant, serif", fontSize: "1.2rem", fontWeight: 500, letterSpacing: "0.04em" }}>{p.name}</div>
            <div style={{ color: "#A89880", fontSize: "0.78rem", marginTop: 2 }}>{p.district}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", color: "#C9A84C" }}>{(p.price / 1_000_000).toFixed(0)} млн</div>
            <div style={{ color: "#6B5E4F", fontSize: "0.7rem" }}>рублей</div>
          </div>
        </div>
        <GoldLine />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          {[[p.rooms + " комн.", "Комнаты"], [p.area + " м²", "Площадь"], [p.deadline, "Сдача"]].map(([v, l]) => (
            <div key={String(l)} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>{v}</div>
              <div style={{ color: "#6B5E4F", fontSize: "0.68rem", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0.4rem 0.75rem", background: "rgba(201,168,76,0.06)", borderLeft: "2px solid #8A6D2E", fontSize: "0.75rem", color: "#A89880" }}>{p.developer}</div>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState("home");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState({ priceMin: "", priceMax: "", areaMin: "", areaMax: "", rooms: [] as number[], developer: "Все застройщики", deadline: "Любой срок" });
  const [submitted, setSubmitted] = useState(false);

  const toggleFav = (id: number) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const toggleRoom = (r: number) => setFilters(f => ({ ...f, rooms: f.rooms.includes(r) ? f.rooms.filter(x => x !== r) : [...f.rooms, r] }));

  const filtered = properties.filter(p => {
    if (filters.priceMin && p.price / 1_000_000 < +filters.priceMin) return false;
    if (filters.priceMax && p.price / 1_000_000 > +filters.priceMax) return false;
    if (filters.areaMin && p.area < +filters.areaMin) return false;
    if (filters.areaMax && p.area > +filters.areaMax) return false;
    if (filters.rooms.length > 0 && !filters.rooms.includes(p.rooms)) return false;
    if (filters.developer !== "Все застройщики" && p.developer !== filters.developer) return false;
    if (filters.deadline !== "Любой срок" && !p.deadline.startsWith(filters.deadline)) return false;
    return true;
  });

  const nav = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "favorites", label: "Избранное" },
    { id: "about", label: "О компании" },
    { id: "blog", label: "Блог" },
    { id: "contact", label: "Контакты" },
  ];

  const go = (id: string) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={S.page}>
      {/* NAV */}
      <nav style={S.nav}>
        <button style={S.logo} onClick={() => go("home")}>
          <div style={S.logoBar} />
          <span style={S.logoText}>MERIDIAN</span>
        </button>
        <div style={S.navLinks}>
          {nav.map(n => (
            <button key={n.id} style={{ ...S.navBtn, color: page === n.id ? "#C9A84C" : "#A89880", position: "relative" }} onClick={() => go(n.id)}>
              {n.label}
              {n.id === "favorites" && favorites.length > 0 && (
                <span style={{ marginLeft: 5, background: "#C9A84C", color: "#0E0B08", borderRadius: "50%", width: 17, height: 17, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700 }}>{favorites.length}</span>
              )}
            </button>
          ))}
          <button style={S.btnGold} onClick={() => go("contact")}>Консультация</button>
        </div>
      </nav>

      <div style={{ paddingTop: 72 }}>

        {/* ===== HOME ===== */}
        {page === "home" && <>
          {/* Hero */}
          <div style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
            <img src={HERO_IMG} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.32)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,11,8,0.25) 0%, rgba(14,11,8,0.65) 65%, #0E0B08 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1.5rem,7vw,9rem)" }}>
              <div style={{ ...S.label, marginBottom: "1.25rem" }}>Элитная недвижимость · Москва</div>
              <h1 style={{ ...S.h1, fontSize: "clamp(3.2rem,8.5vw,7.5rem)", maxWidth: 680, marginBottom: "1.75rem" }}>
                Живите на<br /><em style={{ fontStyle: "italic", color: "#C9A84C" }}>высшем</em><br />уровне
              </h1>
              <p style={{ color: "#A89880", fontSize: "1.05rem", maxWidth: 460, lineHeight: 1.75, marginBottom: "2.5rem" }}>
                Эксклюзивные новостройки премиум и люкс-класса. Инвестиции с гарантированной доходностью.
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button style={S.btnGold} onClick={() => go("catalog")}>Смотреть каталог</button>
                <button style={S.btnOutline} onClick={() => go("contact")}>Консультация</button>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#6B5E4F", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Прокрутить</span>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
            </div>
          </div>

          {/* Stats */}
          <div style={{ backgroundColor: "#161210", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "2.5rem clamp(1.5rem,6vw,7rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", textAlign: "center" }}>
              {[["12+", "Лет на рынке"], ["380+", "Объектов продано"], ["42", "Застройщика"], ["98%", "Довольных клиентов"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: "2.8rem", fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>{v}</div>
                  <div style={{ color: "#A89880", fontSize: "0.78rem", marginTop: "0.4rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div style={S.sectionPad}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={S.label}>Избранные объекты</span>
                <h2 style={{ ...S.h2, fontSize: "clamp(2rem,4vw,3rem)" }}>Топовые новостройки</h2>
              </div>
              <button style={S.btnOutline} onClick={() => go("catalog")}>Весь каталог</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
              {properties.slice(0, 3).map(p => <PropertyCard key={p.id} p={p} isFav={favorites.includes(p.id)} onFav={toggleFav} />)}
            </div>
          </div>

          {/* Why us */}
          <div style={{ ...S.sectionPad, backgroundColor: "#161210", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={S.label}>Наш подход</span>
              <h2 style={{ ...S.h2, fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>Почему выбирают Meridian</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "3rem" }}>
              {[
                { icon: "Shield", title: "Проверенные объекты", text: "Каждый застройщик проходит многоуровневую проверку надёжности и финансовой устойчивости" },
                { icon: "TrendingUp", title: "Рост инвестиций", text: "Средняя доходность наших объектов — 18% годовых. Аналитика для каждого ЖК" },
                { icon: "Key", title: "Сопровождение", text: "От выбора до ключей — юридическое сопровождение и ипотечный брокер" },
                { icon: "Award", title: "Эксклюзивные цены", text: "Прямые договоры с застройщиками — цены ниже рынка и скидки для клиентов" },
              ].map(f => (
                <div key={f.title}>
                  <div style={{ width: 48, height: 48, border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <Icon name={f.icon} size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", marginBottom: "0.6rem" }}>{f.title}</h3>
                  <p style={{ color: "#A89880", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA banner */}
          <div style={{ position: "relative", overflow: "hidden", padding: "6rem clamp(1.5rem,6vw,7rem)", textAlign: "center" }}>
            <img src={INTERIOR_IMG} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.18)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={S.label}>Консультация эксперта</span>
              <h2 style={{ ...S.h2, fontSize: "clamp(2rem,4vw,3.5rem)", marginBottom: "1.25rem" }}>Найдём идеальный объект<br />под ваш бюджет</h2>
              <p style={{ color: "#A89880", maxWidth: 460, margin: "0 auto 2.5rem", lineHeight: 1.75 }}>Расскажите о целях — подберём лучшие варианты и обеспечим эксклюзивные условия от застройщика</p>
              <button style={S.btnGold} onClick={() => go("contact")}>Получить бесплатную консультацию</button>
            </div>
          </div>
        </>}

        {/* ===== CATALOG ===== */}
        {page === "catalog" && (
          <div style={S.sectionPad}>
            <span style={S.label}>Новостройки Москвы</span>
            <h1 style={{ ...S.h1, fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "2.5rem" }}>Каталог объектов</h1>

            {/* Filters */}
            <div style={{ ...S.card, padding: "2rem", marginBottom: "2.5rem" }}>
              <span style={{ ...S.label, marginBottom: "1.5rem" }}>Фильтры поиска</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1.5rem" }}>
                <div>
                  <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Цена (млн ₽)</label>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input type="number" value={filters.priceMin} onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))} placeholder="от" style={S.inputBox} />
                    <span style={{ color: "#6B5E4F" }}>—</span>
                    <input type="number" value={filters.priceMax} onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))} placeholder="до" style={S.inputBox} />
                  </div>
                </div>
                <div>
                  <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Площадь (м²)</label>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input type="number" value={filters.areaMin} onChange={e => setFilters(f => ({ ...f, areaMin: e.target.value }))} placeholder="от" style={S.inputBox} />
                    <span style={{ color: "#6B5E4F" }}>—</span>
                    <input type="number" value={filters.areaMax} onChange={e => setFilters(f => ({ ...f, areaMax: e.target.value }))} placeholder="до" style={S.inputBox} />
                  </div>
                </div>
                <div>
                  <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Комнаты</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {[1, 2, 3, 4].map(r => (
                      <button key={r} onClick={() => toggleRoom(r)} style={{ border: `1px solid ${filters.rooms.includes(r) ? "#C9A84C" : "rgba(201,168,76,0.25)"}`, color: filters.rooms.includes(r) ? "#C9A84C" : "#A89880", background: filters.rooms.includes(r) ? "rgba(201,168,76,0.09)" : "transparent", padding: "0.4rem 0.8rem", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Golos Text', sans-serif" }}>
                        {r === 4 ? "4+" : r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Застройщик</label>
                  <select style={S.selectBox} value={filters.developer} onChange={e => setFilters(f => ({ ...f, developer: e.target.value }))}>
                    {developers.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Срок сдачи</label>
                  <select style={S.selectBox} value={filters.deadline} onChange={e => setFilters(f => ({ ...f, deadline: e.target.value }))}>
                    {deadlines.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button style={{ ...S.btnOutline, width: "100%" }} onClick={() => setFilters({ priceMin: "", priceMax: "", areaMin: "", areaMax: "", rooms: [], developer: "Все застройщики", deadline: "Любой срок" })}>
                    Сбросить
                  </button>
                </div>
              </div>
            </div>

            <p style={{ color: "#A89880", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Найдено: <span style={{ color: "#C9A84C" }}>{filtered.length}</span> объектов
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
              {filtered.length > 0 ? filtered.map(p => <PropertyCard key={p.id} p={p} isFav={favorites.includes(p.id)} onFav={toggleFav} />) : (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "5rem 0", color: "#6B5E4F" }}>
                  <Icon name="SearchX" size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
                  <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.5rem" }}>Объекты не найдены</p>
                  <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Попробуйте изменить параметры фильтра</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== FAVORITES ===== */}
        {page === "favorites" && (
          <div style={S.sectionPad}>
            <span style={S.label}>Ваш список</span>
            <h1 style={{ ...S.h1, fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3rem" }}>Избранные объекты</h1>
            {favorites.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
                {properties.filter(p => favorites.includes(p.id)).map(p => <PropertyCard key={p.id} p={p} isFav onFav={toggleFav} />)}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "6rem 0", color: "#6B5E4F" }}>
                <Icon name="Heart" size={56} style={{ marginBottom: "1.5rem", opacity: 0.25 }} />
                <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.8rem", marginBottom: "0.75rem", color: "#EDE8DF" }}>Список пуст</p>
                <p style={{ fontSize: "0.875rem", marginBottom: "2.5rem" }}>Добавляйте объекты из каталога нажатием на иконку сердца</p>
                <button style={S.btnGold} onClick={() => go("catalog")}>Перейти в каталог</button>
              </div>
            )}
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {page === "about" && <>
          <div style={{ position: "relative", height: "52vh", minHeight: 360, overflow: "hidden" }}>
            <img src={INTERIOR_IMG} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.28)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0E0B08)" }} />
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "flex-end", padding: "0 clamp(1.5rem,6vw,7rem) 4rem" }}>
              <div>
                <span style={S.label}>Кто мы</span>
                <h1 style={{ ...S.h1, fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>О компании Meridian</h1>
              </div>
            </div>
          </div>
          <div style={{ ...S.sectionPad, paddingTop: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginBottom: "5rem" }}>
              <div>
                <p style={{ color: "#A89880", fontSize: "1rem", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                  Meridian — это брокерский бутик элитной недвижимости с 12-летней историей на рынке Москвы. Специализируемся исключительно на объектах премиум и de luxe сегмента.
                </p>
                <p style={{ color: "#A89880", fontSize: "1rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
                  Наш принцип — не количество, а качество. Мы отбираем менее 5% от всех новостроек на рынке, тщательно анализируя локацию, застройщика, архитектуру и инвестиционный потенциал.
                </p>
                <GoldLine />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
                  {[["2012", "Год основания"], ["380+", "Сделок закрыто"], ["12", "Экспертов"], ["₽ 28B+", "Объём сделок"]].map(([v, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "Cormorant, serif", fontSize: "2.2rem", color: "#C9A84C", fontWeight: 300 }}>{v}</div>
                      <div style={{ color: "#A89880", fontSize: "0.78rem", marginTop: "0.25rem" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <img src={BUILDING_IMG} style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", border: "1px solid rgba(201,168,76,0.2)" }} />
            </div>

            <h2 style={{ ...S.h2, fontSize: "clamp(1.8rem,3vw,2.5rem)", textAlign: "center", marginBottom: "3rem" }}>Наша команда</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>
              {[
                { name: "Александр Воронов", role: "Генеральный директор", exp: "18 лет в недвижимости" },
                { name: "Мария Соколова", role: "Директор по продажам", exp: "Топ-эксперт Москвы" },
                { name: "Дмитрий Петров", role: "Инвестиционный аналитик", exp: "Ex-Goldman Sachs" },
                { name: "Ирина Лазарева", role: "Юридический директор", exp: "1200+ сделок" },
              ].map(m => (
                <div key={m.name} style={{ ...S.card, padding: "1.5rem", textAlign: "center" }}>
                  <div style={{ width: 68, height: 68, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.25)", background: "#1E1A16", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="User" size={26} style={{ color: "#8A6D2E" }} />
                  </div>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: "1.15rem", marginBottom: "0.25rem" }}>{m.name}</div>
                  <div style={{ color: "#C9A84C", fontSize: "0.73rem", marginBottom: "0.4rem" }}>{m.role}</div>
                  <div style={{ color: "#6B5E4F", fontSize: "0.76rem" }}>{m.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* ===== BLOG ===== */}
        {page === "blog" && (
          <div style={S.sectionPad}>
            <span style={S.label}>Экспертиза</span>
            <h1 style={{ ...S.h1, fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3rem" }}>Советы по инвестициям</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "2rem", marginBottom: "5rem" }}>
              {blogPosts.map(post => (
                <article key={post.id} style={{ ...S.card, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                    <img src={post.img} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                    <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(14,11,8,0.82)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.2rem 0.65rem" }}>
                      <span style={{ color: "#C9A84C", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span style={{ color: "#6B5E4F", fontSize: "0.76rem" }}>{post.date}</span>
                      <span style={{ color: "#6B5E4F", fontSize: "0.76rem" }}>{post.read} чтения</span>
                    </div>
                    <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", lineHeight: 1.35, marginBottom: "1rem" }}>{post.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#C9A84C", fontSize: "0.76rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Читать <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ ...S.card, padding: "3rem" }}>
              <h2 style={{ ...S.h2, fontSize: "clamp(1.8rem,3vw,2.3rem)", textAlign: "center", marginBottom: "2.5rem" }}>5 правил успешного инвестора</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "2rem" }}>
                {[
                  "Выбирайте локации с развивающейся транспортной инфраструктурой — они дают +30–40% к стоимости",
                  "Покупайте на этапе котлована: разница с ценой готовой квартиры составляет 25–35%",
                  "Диверсифицируйте: 2 объекта по 30 млн выгоднее одного за 60 млн",
                  "Изучайте репутацию застройщика: соблюдение сроков важнее рекламных обещаний",
                  "Ипотека как инструмент: при ставке ниже инфляции — ваш союзник, а не бремя",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ fontFamily: "Cormorant, serif", fontSize: "2.5rem", color: "#8A6D2E", opacity: 0.6, lineHeight: 1, minWidth: 32 }}>0{i + 1}</div>
                    <p style={{ color: "#A89880", fontSize: "0.875rem", lineHeight: 1.75 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACT ===== */}
        {page === "contact" && (
          <div style={S.sectionPad}>
            <span style={S.label}>Свяжитесь с нами</span>
            <h1 style={{ ...S.h1, fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3.5rem" }}>Контакты</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
              <div>
                <h2 style={{ ...S.h2, fontSize: "1.8rem", marginBottom: "2rem" }}>Оставьте заявку</h2>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(201,168,76,0.25)", backgroundColor: "#161210" }}>
                    <Icon name="CheckCircle" size={52} style={{ color: "#C9A84C", marginBottom: "1.25rem" }} />
                    <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.8rem", marginBottom: "0.75rem" }}>Заявка принята!</h3>
                    <p style={{ color: "#A89880", lineHeight: 1.7 }}>Наш эксперт свяжется с вами в течение 30 минут в рабочее время.</p>
                  </div>
                ) : (
                  <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                    {[
                      { label: "Имя", type: "text", placeholder: "Ваше имя" },
                      { label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                      { label: "Email", type: "email", placeholder: "your@email.com" },
                    ].map(f => (
                      <div key={f.label}>
                        <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.45rem" }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} style={S.inputBox} />
                      </div>
                    ))}
                    <div>
                      <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.45rem" }}>Бюджет</label>
                      <select style={S.selectBox}>
                        <option value="">Укажите бюджет</option>
                        <option>До 20 млн ₽</option>
                        <option>20–50 млн ₽</option>
                        <option>50–100 млн ₽</option>
                        <option>Более 100 млн ₽</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ color: "#A89880", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.45rem" }}>Сообщение</label>
                      <textarea placeholder="Расскажите о ваших пожеланиях..." rows={4} style={{ ...S.inputBox, resize: "vertical" }} />
                    </div>
                    <button type="submit" style={{ ...S.btnGold, marginTop: "0.5rem" }}>Отправить заявку</button>
                    <p style={{ color: "#6B5E4F", fontSize: "0.74rem", textAlign: "center" }}>Ответим в течение 30 минут в рабочее время</p>
                  </form>
                )}
              </div>

              <div>
                <h2 style={{ ...S.h2, fontSize: "1.8rem", marginBottom: "2rem" }}>Реквизиты</h2>
                {[
                  { icon: "MapPin", label: "Адрес", value: "Москва, Пресненская наб., 8, стр. 1\nМосква-Сити, башня «Капитал»" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@meridian-realty.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–20:00\nСб: 10:00–18:00" },
                ].map(c => (
                  <div key={c.label} style={{ display: "flex", gap: "1.25rem", marginBottom: "2rem" }}>
                    <div style={{ width: 44, height: 44, border: "1px solid rgba(201,168,76,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={c.icon} size={18} style={{ color: "#C9A84C" }} />
                    </div>
                    <div>
                      <div style={{ color: "#6B5E4F", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{c.label}</div>
                      <div style={{ color: "#EDE8DF", fontSize: "0.9rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
                <div style={{ ...S.card, padding: "1.75rem", marginTop: "1rem" }}>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", marginBottom: "1rem" }}>Мессенджеры</div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button style={{ ...S.btnOutline, flex: 1 }}>Telegram</button>
                    <button style={{ ...S.btnOutline, flex: 1 }}>WhatsApp</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer style={{ backgroundColor: "#161210", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "3rem clamp(1.5rem,6vw,7rem)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 2, height: 24, background: "#C9A84C" }} />
              <span style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", fontWeight: 600, color: "#C9A84C", letterSpacing: "0.15em" }}>MERIDIAN</span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {nav.map(n => (
                <button key={n.id} onClick={() => go(n.id)} style={{ ...S.navBtn, color: "#A89880" }}>{n.label}</button>
              ))}
            </div>
          </div>
          <GoldLine />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.25rem" }}>
            <p style={{ color: "#6B5E4F", fontSize: "0.76rem" }}>© 2026 Meridian. Все права защищены</p>
            <p style={{ color: "#6B5E4F", fontSize: "0.76rem" }}>Лицензия № 77-001-019782-1</p>
          </div>
        </footer>
      </div>
    </div>
  );
}