import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Данные 12 объектов ───────────────────────────────────────────────────────

interface Launch {
  id: number;
  developer: string;
  name: string;
  address: string;
  deadline: string;
  url: string;
  img?: string;
  internalPage?: string;
}

const LAUNCHES: Launch[] = [
  { id: 1,  developer: "Град Девелопмент", name: "Аурум Тайм",                       address: "Богородское, проезд 4-й Подбельского",   deadline: "апрель 2026", url: "https://xn--d1alfcjp.xn--p1ai/1.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg", internalPage: "project-aurum" },
  { id: 2,  developer: "ГК Атлант",        name: "Крекшино Парк",                     address: "Внуково, поселок совхоза Крекшино",      deadline: "весна 2026",  url: "https://xn--d1alfcjp.xn--p1ai/2.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/49a9383e-fa69-46f1-a618-b4beda50fd1e.jpg" },
  { id: 3,  developer: "",                  name: "Никольский квартал Отрада, к. 6 и 7", address: "г Красногорск, мкр Опалиха",           deadline: "весна 2026",  url: "https://xn--d1alfcjp.xn--p1ai/3.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/05467dc2-9496-46b9-b7ca-d2b982e53b11.jpg" },
  { id: 4,  developer: "Upside",            name: "Апсайд Мосфильмовская",             address: "улица Мосфильмовская",                  deadline: "май",         url: "https://xn--d1alfcjp.xn--p1ai/4.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/7ed2157e-51d8-4cd0-817b-40ae29cbb681.jpg" },
  { id: 5,  developer: "Мангазея",          name: "Мангазея на Речном",                address: "Москва",                               deadline: "осень 2026",  url: "https://xn--d1alfcjp.xn--p1ai/5.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/b28b6b6f-2dbd-4393-95f1-88529e441bf1.jpg" },
  { id: 6,  developer: "АСИ Групп",         name: "Каштановая роща 2 оч.",             address: "д. Измалково, Солнечная ул",            deadline: "2026 год",    url: "https://xn--d1alfcjp.xn--p1ai/6.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/7522e5a5-00cd-4285-9572-ff923a5b251d.jpg" },
  { id: 7,  developer: "ГК СетьСтрой",     name: "Квартал Светлый 2 оч.",             address: "г. Балашиха, ул Твардовского",          deadline: "2026 год",    url: "https://xn--d1alfcjp.xn--p1ai/7.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/d5d571af-6a7c-405e-b22c-0c739ba77d1b.jpg" },
  { id: 8,  developer: "Vesper",            name: "Vesper на Шабаловке",               address: "Донской, ул Шаболовка",                deadline: "скоро",       url: "https://xn--d1alfcjp.xn--p1ai/8.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/f92e8f1b-a945-47c3-9d46-aa1ce75fafb3.png" },
  { id: 9,  developer: "Sminex",            name: "Дом Палашевский 11",                address: "Большой Палашевский переулок",          deadline: "скоро",       url: "https://xn--d1alfcjp.xn--p1ai/9.html",  img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/56643ce7-a7be-4d71-b2a5-e031833b8901.jpg" },
  { id: 10, developer: "STONE OFFICE",      name: "БЦ Мневники 4",                     address: "Хорошево-Мневники, ул Нижние Мневники", deadline: "скоро",       url: "https://xn--d1alfcjp.xn--p1ai/10.html", img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/1dcd3797-4bb8-445a-bb4b-626aab2a2cbd.jpg" },
  { id: 11, developer: "ГК Самолет",        name: "Химки Парк",                        address: "г. Химки, ул Рабочая",                 deadline: "скоро",       url: "https://xn--d1alfcjp.xn--p1ai/11.html", img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/b1395206-2a22-484f-9626-c1afe019ace9.jpg" },
  { id: 12, developer: "Лесная Отрада",     name: "Лесная Отрада, 2 оч., корпус 2",    address: "пос. Светлые Горы, Пятницкое шоссе",  deadline: "скоро",       url: "https://xn--d1alfcjp.xn--p1ai/12.html", img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/84741645-38d5-4d64-91d8-2d42516b863b.jpg" },
];

// ─── Данные Старты продаж ─────────────────────────────────────────────────────

interface SaleStart {
  id: number;
  name: string;
  isNew?: boolean;
  isExclusive?: boolean;
  startLabel: string;
  metro: string;
  metroColor: string;
  metroTime: string;
  location: string;
  developer: string;
  deadline: string;
  prices: { type: string; price: string }[];
  totalApts: number;
  views?: number;
  tags: string[];
  img: string;
  url?: string;
}

const SALE_STARTS: SaleStart[] = [
  {
    id: 1, name: "Одинбург", isNew: false,
    startLabel: "Апрель 2026 — корпус Архитектурный проект",
    metro: "Одинцово (D1)", metroColor: "#FF6B35", metroTime: "10 минут транспортом",
    location: "ГО Одинцовский, МО, г. Одинцово, ул. Северная",
    developer: "AFI Development", deadline: "Сдан – 1 кв. 2028",
    prices: [{ type: "Студии", price: "Цена под запрос" }, { type: "1-к.кв", price: "Цена под запрос" }, { type: "2Е-к.кв", price: "Цена под запрос" }],
    totalApts: 458, tags: ["Новостройки"],
    img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/d36f78e1-8530-48a7-b6a0-9db6d00ca552.jpg",
  },
  {
    id: 2, name: "СберСити", isNew: false,
    startLabel: "Апрель 2026 — корпуса В16.5 Оптимум, В16.7 Баланс",
    metro: "Кунцевская (4л)", metroColor: "#00AEEF", metroTime: "20 минут транспортом",
    location: "Кунцево, мкр. Рублево-Архангельское",
    developer: "СберСити", deadline: "2 кв. 2026 – 4 кв. 2028",
    prices: [{ type: "Студии", price: "от 24 802 692 ₽" }, { type: "1-к.кв", price: "от 29 842 650 ₽" }, { type: "2Е-к.кв", price: "от 25 582 100 ₽" }],
    totalApts: 161, views: 1, tags: ["Новостройки"],
    img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/19f07cf6-bf2b-46eb-982d-933340d0e051.jpg",
  },
  {
    id: 3, name: "Пыжевский", isNew: true,
    startLabel: "Апрель 2026 — корпуса 1, 2, 3, 4",
    metro: "Третьяковская (6л)", metroColor: "#FF6B35", metroTime: "5 минут пешком",
    location: "Якиманка, Пыжевский пер",
    developer: "Текта Групп", deadline: "2 кв. 2029",
    prices: [{ type: "2Е-к.кв", price: "от 238 943 151 ₽" }, { type: "3Е-к.кв", price: "от 426 475 566 ₽" }, { type: "4Е-к.кв", price: "от 458 957 772 ₽" }],
    totalApts: 24, tags: ["Новостройки"],
    img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/e07795b5-0285-4bff-83f7-56684d4ea41c.jpg",
  },
  {
    id: 4, name: "Большое Юрлово", isNew: true,
    startLabel: "Апрель 2026 — корпуса 5, 6",
    metro: "Пятницкое шоссе", metroColor: "#009C6E", metroTime: "15 минут транспортом",
    location: "ГО Химки, МО, деревня Юрлово, Пятницкое шоссе",
    developer: "ГК Самолет. Москва", deadline: "1 кв. 2028 – 3 кв. 2028",
    prices: [{ type: "Студии", price: "от 4 542 581 ₽" }, { type: "1-к.кв", price: "от 5 278 122 ₽" }, { type: "2Е-к.кв", price: "от 5 460 239 ₽" }],
    totalApts: 417, tags: ["Новостройки"],
    img: "https://cdn.poehali.dev/files/250f3905-20a1-47cd-aa4e-f5a47561992c.png",
  },
  {
    id: 5, name: "Мартемьяново Клаб", isNew: false,
    startLabel: "Апрель 2026 — корпус 1",
    metro: "Апрелевка (D4)", metroColor: "#009C6E", metroTime: "15 минут транспортом",
    location: "ГО Наро-Фоминский, МО, деревня Мартемьяново",
    developer: "ГК ФСК. Москва", deadline: "2 кв. 2026 – 4 кв. 2027",
    prices: [{ type: "1-к.кв", price: "от 7 625 453 ₽" }, { type: "2Е-к.кв", price: "от 12 669 665 ₽" }, { type: "2-к.кв", price: "от 12 794 333 ₽" }],
    totalApts: 53, tags: ["Новостройки"],
    img: "https://cdn.poehali.dev/files/2e77adc5-8061-45cc-930e-b31d88a00664.png",
  },
  {
    id: 6, name: "МЫС", isNew: false,
    startLabel: "Апрель 2026 — корпуса Дом Алтай, Дом Урал",
    metro: "Лесной Городок (D4)", metroColor: "#009C6E", metroTime: "10 минут транспортом",
    location: "ГО Одинцовский, МО, деревня Ликино",
    developer: "MR Group", deadline: "3 кв. 2028 – 2 кв. 2029",
    prices: [{ type: "Студии", price: "от 12 885 847 ₽" }, { type: "2Е-к.кв", price: "от 12 732 815 ₽" }, { type: "2-к.кв", price: "от 19 149 747 ₽" }],
    totalApts: 349, tags: ["Новостройки"],
    img: "https://cdn.poehali.dev/files/d3be9dcd-8e1b-46b6-8595-f67712a3e37c.png",
  },
];

// ─── Карточка старта продаж ───────────────────────────────────────────────────

function SaleStartCard({ item }: { item: SaleStart }) {
  return (
    <div style={{
      background: "#fff", display: "flex", flexDirection: "column",
      cursor: "pointer",
    }}>
      {/* Фото */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#E5E9F0" }}>
        <img src={item.img} alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {/* Бейджи сверху */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          {item.isNew && (
            <span style={{ background: "#EF4444", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "3px 8px", borderRadius: 100, fontFamily: "Inter, sans-serif" }}>
              Новый ЖК
            </span>
          )}
          {item.isExclusive && (
            <span style={{ background: "#3B82F6", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "3px 8px", borderRadius: 100, fontFamily: "Inter, sans-serif" }}>
              Эксклюзивно на ТА
            </span>
          )}
        </div>
        {/* Старт продаж снизу */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.55)", padding: "6px 10px" }}>
          <div style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 600, fontFamily: "Inter, sans-serif", opacity: 0.85 }}>Старт продаж</div>
          <div style={{ color: "#fff", fontSize: "0.72rem", fontFamily: "Inter, sans-serif", lineHeight: 1.3 }}>{item.startLabel}</div>
        </div>
      </div>

      {/* Контент */}
      <div style={{ padding: "14px 0 0", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>{item.name}</div>

        {/* Метро */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: item.metroColor, flexShrink: 0, display: "inline-block" }} />
          <span style={{ fontSize: "0.78rem", color: "#374151", fontFamily: "Inter, sans-serif" }}>{item.metro}, {item.metroTime}</span>
        </div>

        {/* Адрес */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
          <Icon name="MapPin" size={13} style={{ color: "#9CA3AF", marginTop: 1, flexShrink: 0 }} />
          <span style={{ fontSize: "0.78rem", color: "#6B7280", fontFamily: "Inter, sans-serif", lineHeight: 1.4 }}>{item.location}</span>
        </div>

        {/* Застройщик */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="Building2" size={13} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <span style={{ fontSize: "0.78rem", color: "#6B7280", fontFamily: "Inter, sans-serif" }}>Застройщик: {item.developer}</span>
        </div>

        {/* Срок */}
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#111827", marginTop: 4 }}>{item.deadline}</div>

        {/* Цены */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 2 }}>
          {item.prices.map(p => (
            <div key={p.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "0.75rem", color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>{p.type}</span>
              <span style={{
                flex: 1, borderBottom: "1px dotted #D1D5DB",
                margin: "0 6px", marginBottom: 2, display: "inline-block",
              }} />
              <span style={{ fontSize: "0.78rem", color: "#374151", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{p.price}</span>
            </div>
          ))}
        </div>

        {/* Квартир + теги */}
        <div style={{ marginTop: 6, fontSize: "0.75rem", color: "#6B7280", fontFamily: "Inter, sans-serif" }}>
          Квартир {item.totalApts}{item.views ? ` · Видовых ${item.views}` : ""}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4, paddingBottom: 2 }}>
          {item.tags.map(t => (
            <span key={t} style={{ border: "1px solid #D1D5DB", borderRadius: 6, padding: "2px 10px", fontSize: "0.73rem", color: "#374151", fontFamily: "Inter, sans-serif" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Секция Старты продаж (слайдер по 3) ─────────────────────────────────────

function SaleStartsSection({ setPage }: { setPage: (p: string) => void }) {
  const [page, setSliderPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(SALE_STARTS.length / perPage);
  const visible = SALE_STARTS.slice(page * perPage, page * perPage + perPage);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ background: "#fff", borderTop: "1px solid #E8EBF0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 0" }}>
        {/* Заголовок */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", padding: "0 clamp(1rem,5vw,4rem)" }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#111827", margin: 0 }}>
            Старты продаж
          </h2>
          <button onClick={() => { setPage("launches"); window.scrollTo({ top: 0 }); }}
            style={{ background: "#fff", border: "1px solid #D1D5DB", borderRadius: 100, padding: "0.4rem 1.1rem", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#374151", cursor: "pointer" }}>
            Все старты продаж
          </button>
        </div>

        {/* Десктоп: 3 колонки + кнопки листания */}
        <div style={{ position: "relative", padding: "0 clamp(1rem,5vw,4rem)" }} className="sale-starts-desktop">
          {page > 0 && (
            <button onClick={() => setSliderPage(p => p - 1)}
              style={{ position: "absolute", left: 0, top: "40%", transform: "translateY(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "1px solid #D1D5DB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="ChevronLeft" size={16} style={{ color: "#374151" }} />
            </button>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {visible.map(item => <SaleStartCard key={item.id} item={item} />)}
          </div>
          {page < totalPages - 1 && (
            <button onClick={() => setSliderPage(p => p + 1)}
              style={{ position: "absolute", right: 0, top: "40%", transform: "translateY(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "1px solid #D1D5DB", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="ChevronRight" size={16} style={{ color: "#374151" }} />
            </button>
          )}
        </div>

        {/* Мобильный: горизонтальный скролл */}
        <div ref={scrollRef}
          className="sale-starts-mobile"
          style={{ display: "none", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", gap: "1rem", padding: "0 1rem" }}>
          {SALE_STARTS.map(item => (
            <div key={item.id} style={{ scrollSnapAlign: "start", flexShrink: 0, width: "80vw", maxWidth: 300 }}>
              <SaleStartCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DISTRICTS = ["Вся Москва", "ЦАО", "СВАО", "ВАО", "ЮВАО", "ЮАО", "ЮЗАО", "ЗАО", "СЗАО", "САО", "Новая Москва", "Подмосковье"];
const DEADLINES = ["Любой срок", "2025", "2026", "2027", "2028+"];
const CLASSES   = ["Любой класс", "Комфорт", "Бизнес", "Премиум", "Элит"];
const ROOM_LABELS = ["Студия", "1", "2", "3", "4+"];

// ─── Аватар объекта — квадрат с иконкой здания ───────────────────────────────

const ICON_NAMES = ["Building2","Building","Landmark","Home","Store","Warehouse","Hotel","School","Library","LayoutGrid","MapPin","Globe"];

function ProjectAvatar({ id, img, size = 48 }: { id: number; img?: string; size?: number }) {
  const iconName = ICON_NAMES[(id - 1) % ICON_NAMES.length] as "Building2";
  return (
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: "#E5E9F0", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {img
        ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <Icon name={iconName} size={Math.round(size * 0.45)} style={{ color: "#8B97A8" }} />
      }
    </div>
  );
}

// ─── Компактная карточка анонса ───────────────────────────────────────────────

function LaunchCard({ item, setPage }: { item: Launch; setPage?: (p: string) => void }) {
  const title = item.developer ? `${item.developer} - ${item.name}` : item.name;

  const handleClick = () => {
    if (item.internalPage && setPage) {
      setPage(item.internalPage);
      window.scrollTo({ top: 0 });
    } else {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #E2E6EE",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "box-shadow 0.18s",
        cursor: "pointer",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Avatar + title */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <ProjectAvatar id={item.id} img={item.img} size={48} />
        <span style={{
          fontFamily: "Inter, sans-serif", fontWeight: 600,
          fontSize: "0.88rem", color: "#111827", lineHeight: 1.35,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {title}
        </span>
      </div>

      {/* Address */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <Icon name="MapPin" size={12} style={{ color: "#9CA3AF", flexShrink: 0 }} />
        <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>{item.address}</span>
      </div>

      {/* Date + link */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="Calendar" size={12} style={{ color: "#9CA3AF" }} />
          <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>{item.deadline}</span>
        </div>
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#2563EB" }}>Подробнее</span>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  useState(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  return count;
}

function Hero({ onSearch }: { onSearch: () => void }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Квартиры");
  const count = useCountUp(67_115);
  const tabs = [
    { label: "Квартиры",          icon: "Building2"  },
    { label: "Паркинги",          icon: "Car"        },
    { label: "Дома с участками",  icon: "Home"       },
    { label: "Участки",           icon: "TreePine"   },
    { label: "Подрядчики",        icon: "HardHat"    },
    { label: "Коммерция",         icon: "Store"      },
  ];

  return (
    <div style={{ background: "#ECF0F7", padding: "3rem clamp(1rem,4vw,4rem) 3rem", textAlign: "center" }}>
      <h1 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 500,
        fontSize: "clamp(1.8rem,4.5vw,3.2rem)", color: "#111827",
        lineHeight: 1.2, marginBottom: "2rem", letterSpacing: "-0.01em",
      }}>
        Более&nbsp;<span style={{ fontWeight: 700, color: "#2563EB" }}>{count.toLocaleString("ru-RU")}</span>&nbsp;квартир<br />в&nbsp;Москве
      </h1>

      {/* Табы */}
      <div className="hero-tabs" style={{ marginBottom: "1.25rem" }}>
        {tabs.map(t => (
          <button
            key={t.label}
            onClick={() => setActiveTab(t.label)}
            style={{
              background: "#fff",
              border: `1px solid ${activeTab === t.label ? "#B0BCCE" : "#D1D8E4"}`,
              borderRadius: 100,
              padding: "0.45rem 0.9rem",
              fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500,
              color: "#374151", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              boxShadow: activeTab === t.label ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Icon name={t.icon as "Building2"} size={13} style={{ color: "#6B7280" }} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Поисковая строка */}
      <div
        className="hero-searchbar"
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #D1D8E4",
          maxWidth: 860, margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Search input */}
        <div
          className="hero-searchbar-input"
          style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 1rem" }}
        >
          <Icon name="Search" size={15} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSearch()}
            placeholder="Метро, район, локация, ЖК, улица, застройщик, банк"
            style={{
              border: "none", outline: "none",
              fontSize: "0.875rem", color: "#374151",
              width: "100%", fontFamily: "Inter, sans-serif",
              padding: "0.9rem 0", background: "transparent",
            }}
          />
        </div>

        {/* Фильтры — скрываются на мобильном */}
        <div className="hero-filters">
          {["Тип квартиры", "Цена от-до, ₽", "Срок сдачи"].map((f) => (
            <button key={f} style={{
              background: "none", border: "none",
              borderRight: "1px solid #E5E9F0",
              padding: "0 1rem", height: 52,
              fontFamily: "Inter, sans-serif", fontSize: "0.8rem",
              color: "#374151", fontWeight: 500,
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              {f}
            </button>
          ))}
          <button style={{
            background: "none", border: "none",
            padding: "0 1rem", height: 52,
            fontFamily: "Inter, sans-serif", fontSize: "0.8rem",
            color: "#374151", fontWeight: 500,
            cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon name="SlidersHorizontal" size={14} style={{ color: "#6B7280" }} />
            Все фильтры
          </button>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="hero-actions" style={{ maxWidth: 860, margin: "1rem auto 0" }}>
        <button style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "none", border: "none",
          fontFamily: "Inter, sans-serif", fontSize: "0.84rem",
          color: "#374151", fontWeight: 500, cursor: "pointer",
        }}>
          <Icon name="MapPin" size={15} style={{ color: "#2563EB" }} />
          На карте
        </button>
        <button onClick={onSearch} style={{
          background: "#2563EB", color: "#fff",
          border: "none", borderRadius: 100,
          padding: "0.65rem 1.4rem",
          fontFamily: "Inter, sans-serif", fontSize: "0.84rem", fontWeight: 600,
          cursor: "pointer", whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
        }}>
          {count.toLocaleString("ru-RU")}&nbsp;квартир&nbsp;в&nbsp;461&nbsp;ЖК
        </button>
      </div>
    </div>
  );
}

// ─── Секция анонсов ───────────────────────────────────────────────────────────

function LaunchesSection({ setPage, showAll = false }: { setPage: (p: string) => void; showAll?: boolean }) {
  const visible = showAll ? LAUNCHES : LAUNCHES.slice(0, 6);

  return (
    <div style={{ background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem clamp(1rem,5vw,4rem)" }}>
      {/* Заголовок */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#111827", margin: 0 }}>
          Анонсы стартов продаж
        </h2>
        {!showAll && (
          <button
            onClick={() => { setPage("launches"); window.scrollTo({ top: 0 }); }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: "0.82rem",
              color: "#374151", fontWeight: 500,
            }}
          >
            Показать все
            <span style={{
              background: "#1F2937", color: "#fff",
              borderRadius: 100, padding: "0.1rem 0.55rem",
              fontSize: "0.72rem", fontWeight: 700,
            }}>
              {LAUNCHES.length}
            </span>
          </button>
        )}
      </div>

      {/* Сетка карточек */}
      <div className="launches-grid">
        {visible.map(item => <LaunchCard key={item.id} item={item} setPage={setPage} />)}
      </div>
      </div>
    </div>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [mob, setMob] = useState(false);
  const links = [
    { id: "home",       label: "Главная"          },
    { id: "catalog",    label: "Новостройки"       },
    { id: "launches",   label: "Анонсы стартов"   },
    { id: "developers", label: "Застройщики"       },
    { id: "contact",    label: "Контакты"          },
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

        <div className="nav-links">
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

        <div className="nav-right" style={{ marginLeft: "auto" }}>
          <a href="tel:+74951234567" style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none", color: "#111827", fontWeight: 600, fontSize: "0.88rem", fontFamily: "Inter, sans-serif" }}>
            <Icon name="Phone" size={14} style={{ color: "#2563EB" }} />
            +7 (495) 123-45-67
          </a>
          <button onClick={() => go("contact")} style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "0.45rem 1.1rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
            Подобрать
          </button>
        </div>

        <button className="nav-burger" onClick={() => setMob(!mob)} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto" }}>
          <Icon name={mob ? "X" : "Menu"} size={22} style={{ color: "#374151" }} />
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

// ─── Страница: Главная ────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <div>
      <Hero onSearch={() => go("catalog")} />

      <div style={{ borderTop: "1px solid #E8EBF0" }}>
        <LaunchesSection setPage={setPage} showAll={false} />
      </div>

      <SaleStartsSection setPage={setPage} />

      {/* Преимущества */}
      <div style={{ background: "#F5F7FB", borderTop: "1px solid #E8EBF0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem clamp(1rem,5vw,4rem)" }}>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.1rem", marginBottom: "1.5rem", color: "#111827" }}>Почему выбирают нас</h2>
        <div className="features-grid">
          {[
            { icon: "ShieldCheck", t: "Проверенные объекты", d: "Только аккредитованные ЖК" },
            { icon: "Banknote",    t: "Бесплатно для вас",   d: "Никаких комиссий с покупателей" },
            { icon: "RefreshCw",   t: "Актуальные данные",   d: "Цены обновляются напрямую" },
            { icon: "Headphones",  t: "Личный эксперт",      d: "Сопроводим от выбора до ключей" },
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

  const inp = { border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.6rem 0.85rem", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#374151", outline: "none", width: "100%", background: "#fff" };

  return (
    <div className="catalog-layout" style={{ minHeight: "calc(100vh - 56px)", background: "#F5F7FB" }}>
      <aside className="catalog-aside" style={{ width: showFilters ? 260 : 0, overflow: "hidden", background: "#fff", borderRight: "1px solid #E8EBF0", transition: "width 0.25s", flexShrink: 0 }}>
        <div style={{ width: 260, padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>Фильтры</span>
            <button onClick={() => { setRooms([]); setDistrict("Вся Москва"); setDeadline("Любой срок"); setCls("Любой класс"); setPriceMin(""); setPriceMax(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#2563EB", fontSize: "0.78rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>Сбросить</button>
          </div>
          {[
            { label: "Район",       el: <select value={district} onChange={e => setDistrict(e.target.value)} style={{ ...inp, appearance: "none" as const }}>{DISTRICTS.map(d => <option key={d}>{d}</option>)}</select> },
            { label: "Класс жилья", el: <select value={cls}      onChange={e => setCls(e.target.value)}      style={{ ...inp, appearance: "none" as const }}>{CLASSES.map(c => <option key={c}>{c}</option>)}</select> },
            { label: "Срок сдачи",  el: <select value={deadline} onChange={e => setDeadline(e.target.value)} style={{ ...inp, appearance: "none" as const }}>{DEADLINES.map(d => <option key={d}>{d}</option>)}</select> },
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
                <button key={l} onClick={() => toggleRoom(i)} style={{ border: `1px solid ${rooms.includes(i) ? "#2563EB" : "#D1D5DB"}`, background: rooms.includes(i) ? "#EFF6FF" : "#fff", color: rooms.includes(i) ? "#2563EB" : "#374151", fontSize: "0.8rem", fontWeight: 500, padding: "0.3rem 0.65rem", borderRadius: 7, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: "0.04em", display: "block", marginBottom: "0.4rem" }}>Цена, ₽</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input placeholder="от" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{ ...inp, textAlign: "center" as const }} />
              <span style={{ color: "#9CA3AF" }}>—</span>
              <input placeholder="до" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{ ...inp, textAlign: "center" as const }} />
            </div>
          </div>
          <button style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name="Search" size={14} /> Найти
          </button>
        </div>
      </aside>
      <div style={{ flex: 1, padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{ background: "#fff", border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.45rem 0.9rem", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="SlidersHorizontal" size={13} />{showFilters ? "Скрыть" : "Фильтры"}
            </button>
            <span style={{ color: "#6B7280", fontSize: "0.82rem" }}>Объектов: <strong style={{ color: "#111827" }}>0</strong></span>
          </div>
          <select style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.45rem 0.75rem", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#374151", outline: "none", background: "#fff" }}>
            <option>По умолчанию</option><option>Цена ↑</option><option>Цена ↓</option>
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
    <div style={{ background: "#F5F7FB", minHeight: "100vh" }}>
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

// ─── Страница: Застройщики ────────────────────────────────────────────────────

function DevelopersPage() {
  const [search, setSearch] = useState("");
  return (
    <div style={{ padding: "2.5rem clamp(1rem,5vw,4rem)", background: "#F5F7FB", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.4rem", color: "#111827" }}>Застройщики</h1>
      <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Проверенные девелоперы</p>
      <div style={{ position: "relative", maxWidth: 400, marginBottom: "2rem" }}>
        <Icon name="Search" size={14} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
        <input placeholder="Поиск застройщика..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 10, padding: "0.6rem 0.9rem 0.6rem 2.4rem", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#374151", outline: "none", background: "#fff" }} />
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EBF0", textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ width: 56, height: 56, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <Icon name="Users" size={24} style={{ color: "#2563EB" }} />
        </div>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>Список застройщиков появится скоро</h3>
        <p style={{ color: "#6B7280", fontSize: "0.82rem" }}>Верифицируем партнёров</p>
      </div>
    </div>
  );
}

// ─── Страница: Контакты ───────────────────────────────────────────────────────

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const inp = { border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.6rem 0.85rem", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#374151", outline: "none", width: "100%", background: "#fff" };

  return (
    <div style={{ padding: "2.5rem clamp(1rem,5vw,4rem)", background: "#F5F7FB", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.35rem", color: "#111827" }}>Контакты</h1>
      <p style={{ color: "#6B7280", fontSize: "0.875rem", marginBottom: "2.5rem" }}>Ответим в течение 30 минут</p>
      <div className="contact-grid">
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
              {[
                { k: "name"  as const, l: "Имя",      t: "text",  ph: "Ваше имя"            },
                { k: "phone" as const, l: "Телефон",   t: "tel",   ph: "+7 (___) ___-__-__"  },
                { k: "email" as const, l: "Email",     t: "email", ph: "your@email.com"       },
              ].map(f => (
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
            {[
              { icon: "Phone", l: "Телефон",      v: "+7 (495) 123-45-67"     },
              { icon: "Mail",  l: "Email",         v: "info@novostroiki-msk.ru"},
              { icon: "Clock", l: "Режим работы",  v: "Пн–Вс: 9:00–21:00"    },
            ].map(c => (
              <div key={c.l} style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.875rem" }}>
                <div style={{ width: 32, height: 32, background: "#EFF6FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={c.icon as "Phone"} size={14} style={{ color: "#2563EB" }} />
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
              <div style={{ fontSize: "0.78rem", color: "#166534", lineHeight: 1.5, marginTop: "0.15rem" }}>Никаких комиссий с покупателей.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Страница объекта: Аурум Тайм ────────────────────────────────────────────

const AURUM_SPECS = [
  { label: "Застройщик",    value: "ГК Град Девелопмент" },
  { label: "Старт продаж",  value: "Апрель 2026" },
  { label: "Срок сдачи",    value: "4 кв. 2029" },
  { label: "Тип дома",      value: "Монолитный" },
  { label: "Фасад",         value: "Фасадное остекление, Комбинированный" },
  { label: "Лифт",          value: "Пассажирский и грузовой" },
  { label: "Паркинг",       value: "Подземный паркинг" },
  { label: "Оплата",        value: "100% оплата, Ипотека, Рассрочка, Субсидии" },
  { label: "Договор",       value: "ДДУ" },
];

const AURUM_FEATURES = [
  { label: "Закрытый двор без машин",             img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Пешеходный бульвар и променад",        img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Детские площадки и плей-хабы",         img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Воркаут с профессиональным оборудованием", img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Единая сеть Wi-Fi на территории всего комплекса", img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Собственный спортивный клуб",          img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Детский клуб",                         img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Коворкинг",                            img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
  { label: "Подземный паркинг",                    img: "https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg" },
];

function ProjectAurumPage({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"about" | "map" | "files">("about");
  const [contactSent, setContactSent] = useState(false);
  const [phone, setPhone] = useState("");

  const tabs: { id: "about" | "map" | "files"; label: string }[] = [
    { id: "about", label: "Об объекте" },
    { id: "map",   label: "На карте"  },
    { id: "files", label: "Файлы"     },
  ];

  const s = {
    page: { background: "#F5F7FB", minHeight: "100vh", fontFamily: "Inter, sans-serif" } as React.CSSProperties,
    wrap: { maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" } as React.CSSProperties,
  };

  return (
    <div style={s.page}>
      {/* Хлебные крошки */}
      <div style={{ ...s.wrap, paddingTop: "1.25rem", paddingBottom: "1rem", display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={() => { setPage("home"); window.scrollTo({ top: 0 }); }}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="ChevronLeft" size={14} /> Главная
        </button>
        <span style={{ color: "#D1D5DB" }}>›</span>
        <button onClick={() => { setPage("launches"); window.scrollTo({ top: 0 }); }}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "0.82rem" }}>
          Анонсы стартов продаж
        </button>
        <span style={{ color: "#D1D5DB" }}>›</span>
        <span style={{ color: "#374151", fontSize: "0.82rem" }}>Аурум Тайм</span>
      </div>

      {/* Заголовок */}
      <div style={{ ...s.wrap, marginBottom: "1.25rem" }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#111827", margin: 0 }}>
          Архитектурный проект Аурум Тайм
        </h1>
      </div>

      {/* Табы */}
      <div style={{ ...s.wrap, marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E5E7EB" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500,
                color: activeTab === t.id ? "#111827" : "#6B7280",
                padding: "0.6rem 1.25rem",
                borderBottom: activeTab === t.id ? "2px solid #111827" : "2px solid transparent",
                marginBottom: -1,
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "about" && (
        <div style={s.wrap}>
          {/* Основной блок: фото + характеристики */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: "1.5rem", marginBottom: "1.5rem" }}
            className="project-main-grid">
            {/* Фото */}
            <div>
              <div style={{ borderRadius: 12, overflow: "hidden", background: "#E5E9F0", aspectRatio: "16/10" }}>
                <img
                  src="https://cdn.poehali.dev/projects/ee5e4b95-344d-4573-85b8-da351295bda9/bucket/a07f8433-bf94-48df-9c7f-e48bb9c78404.jpg"
                  alt="Аурум Тайм"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Адрес и метро */}
              <div style={{ marginTop: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.4rem" }}>
                  <Icon name="MapPin" size={13} style={{ color: "#6B7280" }} />
                  <span style={{ fontSize: "0.82rem", color: "#374151" }}>Богородское, проезд 4-й Подбельского</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", paddingLeft: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E53E3E", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>Бульвар Рокоссовского (1л), 10 минут пешком</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#9CA3AF", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>Бульвар Рокоссовского (14л), 10 минут пешком</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Характеристики + контакт */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
                {AURUM_SPECS.map((spec, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    padding: "0.65rem 1rem",
                    borderBottom: i < AURUM_SPECS.length - 1 ? "1px solid #F3F4F6" : "none",
                    gap: 12,
                  }}>
                    <span style={{ fontSize: "0.78rem", color: "#9CA3AF", flexShrink: 0 }}>{spec.label}</span>
                    <span style={{ fontSize: "0.78rem", color: "#111827", fontWeight: 500, textAlign: "right" }}>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Кнопка контакт */}
              {contactSent ? (
                <div style={{ background: "#DCFCE7", borderRadius: 10, padding: "0.85rem 1rem", textAlign: "center" }}>
                  <Icon name="CheckCircle" size={18} style={{ color: "#16A34A", marginBottom: 4 }} />
                  <div style={{ fontSize: "0.82rem", color: "#15803D", fontWeight: 600 }}>Заявка принята!</div>
                  <div style={{ fontSize: "0.75rem", color: "#166534" }}>Свяжемся в ближайшее время</div>
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "1rem" }}>
                  <div style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: "0.5rem" }}>Узнать подробности</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="tel" placeholder="+7 (___) ___-__-__"
                      value={phone} onChange={e => setPhone(e.target.value)}
                      style={{ flex: 1, border: "1px solid #D1D5DB", borderRadius: 8, padding: "0.55rem 0.75rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", outline: "none", minWidth: 0 }}
                    />
                    <button onClick={() => setContactSent(true)}
                      style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 8, padding: "0.55rem 1rem", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                      Контакты
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Об объекте */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#111827", marginBottom: "1.25rem" }}>Об объекте</h2>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "1.5rem" }} className="project-about-grid">
              {/* Сетка удобств */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {AURUM_FEATURES.map((f, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #E5E7EB" }}>
                    <div style={{ background: "#E5E9F0", aspectRatio: "1", overflow: "hidden" }}>
                      <img src={f.img} alt={f.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: "0.5rem 0.6rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "#374151", lineHeight: 1.3, display: "block" }}>{f.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Текстовое описание */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {[
                  "Жилой комплекс состоит из 5 разновысотных секций высотой до 170 м и 6-этажного офисного корпуса. Здания возведены по монолитной технологии с фасадным остеклением или комбинированным фасадом, в составе которого использованы стекло, стемалит и алюминиевые панели в вентилируемой системе. Фасады дополнены вентиляционными решётками с индивидуальной перфорацией. Проект разработан архитектурным бюро АПЕКС. В доме установлены пассажирские и грузовые лифты, а входная группа оформлена в виде гранд-лобби с зоной отдыха.",
                  "В проекте предложены квартиры с различными планировочными решениями, подходящими под разные сценарии жизни. Все помещения разработаны с учётом функциональности, комфорта и визуальной эстетики.",
                  "Территория жилого комплекса закрыта и охраняется, полностью свободна от движения автомобилей. Для отдыха жителей предусмотрены пешеходный бульвар, променад, зоны отдыха под навесом и беседки, шахматные столы, детские площадки и плей-хабы. Для занятий спортом оборудован воркаут с тренажёрами от бренда MyEquilibria. В составе комплекса собственный спортивный клуб, детский клуб и коворкинг, действует единая сеть Wi-Fi. Предусмотрены подземный паркинг и коммерческие помещения на первых этажах.",
                  "Проект расположен в Богородском районе Восточного административного округа Москвы, в окружении 3 крупных парков: Лосиный остров (9 км), Сокольники (4,5 км) и Измайлово (8 км). В 10 минутах пешком находится станция метро Бульвар Рокоссовского. В 5–15 минутах пешком расположены детские сады, школы, медицинские учреждения, магазины, кафе, аптеки, фитнес-клубы и торговые центры. Время в пути до ТТК — 15 минут транспортом, до МКАД — 20 минут, до центра Москвы — 25 минут.",
                ].map((text, i) => (
                  <p key={i} style={{ fontSize: "0.84rem", color: i === 0 ? "#374151" : "#6B7280", lineHeight: 1.7, margin: 0 }}>{text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "map" && (
        <div style={{ ...s.wrap, paddingBottom: "3rem" }}>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden", height: 460 }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.748%2C55.802&z=15&pt=37.748%2C55.802%2Cpm2rdl"
              width="100%" height="100%" frameBorder="0" style={{ display: "block" }}
              title="Карта Аурум Тайм"
            />
          </div>
          <p style={{ fontSize: "0.78rem", color: "#9CA3AF", marginTop: "0.5rem" }}>
            Богородское, проезд 4-й Подбельского · Метро Бульвар Рокоссовского, 10 мин. пешком
          </p>
        </div>
      )}

      {activeTab === "files" && (
        <div style={{ ...s.wrap, paddingBottom: "3rem" }}>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ width: 52, height: 52, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Icon name="FileText" size={22} style={{ color: "#2563EB" }} />
            </div>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: "0.35rem", color: "#111827" }}>Документы появятся позже</h3>
            <p style={{ color: "#6B7280", fontSize: "0.82rem" }}>Проектная документация будет добавлена при старте продаж</p>
          </div>
        </div>
      )}

      <div style={{ height: "2rem" }} />
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
            { title: "Сервис", links: [["home","Главная"],["catalog","Новостройки"],["launches","Анонсы стартов"],["developers","Застройщики"]] },
            { title: "Помощь", links: [["contact","Контакты"],["contact","Для застройщиков"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 600, color: "#F9FAFB", fontSize: "0.8rem", marginBottom: "0.6rem" }}>{col.title}</div>
              {col.links.map(([id, l], i) => (
                <button key={i} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: "0.78rem", padding: "0.18rem 0", fontFamily: "Inter, sans-serif", textAlign: "left" }}>{l}</button>
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
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#ECF0F7" }}>
      <NavBar page={page} setPage={setPage} />
      <div style={{ paddingTop: 56 }}>
        {page === "home"            && <HomePage          setPage={setPage} />}
        {page === "catalog"         && <CatalogPage       />}
        {page === "launches"        && <LaunchesPage      setPage={setPage} />}
        {page === "developers"      && <DevelopersPage    />}
        {page === "contact"         && <ContactPage       />}
        {page === "project-aurum"   && <ProjectAurumPage  setPage={setPage} />}
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}