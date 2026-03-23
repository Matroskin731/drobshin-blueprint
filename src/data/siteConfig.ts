export interface Phone {
  name: string;
  role: string;
  number: string;
}

export interface ContactInfo {
  address: string;
  phones: Phone[];
  emails: string[];
  schedule: string[];
}

export interface NavItem {
  id: string;
  title: string;
  path: string;
  visible: boolean;
}

export interface HomeBlock {
  id: string;
  title: string;
  visible: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  price?: string;
  showPrice?: boolean;
  visible: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  items: ProductItem[];
  visible: boolean;
}

export interface RetailCategory {
  id: string;
  name: string;
  visible: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  visible: boolean;
}

export interface SiteConfig {
  contacts: ContactInfo;
  navigation: NavItem[];
  homeBlocks: HomeBlock[];
  products: ProductCategory[];
  retailCategories: RetailCategory[];
  retailVisible: boolean;
  formEmail: string;
  analyticsCode: string;
  articles: Article[];
}

export const defaultConfig: SiteConfig = {
  contacts: {
    address: "Нижегородская область, г. Богородск, ул. Пушкина, зд. 24/5",
    phones: [
      { name: "", role: "менеджер по продажам", number: "+7 (987) 740-40-62" },
      { name: "", role: "менеджер по утилизации", number: "+7 (910) 108-59-37" },
    ],
    emails: ["torg.waste-rti@mail.ru", "waste-rti@mail.ru"],
    schedule: ["Пн–Пт 08:00–17:00", "Перерыв 12:00–13:00", "Сб–Вс выходной"],
  },
  navigation: [
    { id: "home", title: "Главная", path: "/", visible: true },
    { id: "about", title: "О заводе", path: "/about", visible: true },
    { id: "wholesale", title: "Оптовые поставки", path: "/wholesale", visible: true },
    { id: "retail", title: "Розница", path: "/retail", visible: false },
    { id: "recycling", title: "Утилизация РТИ", path: "/recycling", visible: true },
    { id: "rop", title: "РОП", path: "/rop", visible: true },
    { id: "accessories", title: "Сопутствующие товары", path: "/accessories", visible: true },
    { id: "applications", title: "Применение продукции", path: "/applications", visible: true },
    { id: "articles", title: "Статьи", path: "/articles", visible: true },
    { id: "contacts", title: "Контакты", path: "/contacts", visible: true },
  ],
  homeBlocks: [
    { id: "hero", title: "Первый экран", visible: true },
    { id: "about-preview", title: "Кратко о заводе", visible: true },
    { id: "products", title: "Продукция", visible: true },
    { id: "wholesale-preview", title: "Оптовые поставки", visible: true },
    { id: "applications", title: "Применение продукции", visible: true },
    { id: "why-us", title: "Почему выбирают нас", visible: true },
    { id: "how-we-work", title: "Как мы работаем", visible: true },
    { id: "guarantees", title: "Гарантии и соответствие", visible: true },
    { id: "request-form", title: "Форма заявки", visible: true },
  ],
  products: [
    {
      id: "crumb",
      name: "Резиновая крошка",
      description: "Гранулят из утилизированных шин различных фракций",
      visible: true,
      items: [
        { id: "crumb-063", name: "Крошка фр. до 0,63 мм", description: "Мелкая фракция для производства модификаторов, резинобитумных мастик, пластификаторов", visible: true },
        { id: "crumb-1-2", name: "Крошка фр. 1–2 мм", description: "Универсальная фракция для засыпки полей с искусственным покрытием. Используется для изготовления гладкого верхнего слоя резиновой плитки", visible: true },
        { id: "crumb-2-4", name: "Крошка фр. 2–4 мм", description: "Фракция для укладки бесшовного покрытия на детских и спортивных площадках, для изготовления резиновой плитки, для окрашивания крошки", visible: true },
        { id: "crumb-color", name: "Цветная SBR крошка фр. 2–4 мм", description: "Окрашенная крошка для создания насыщенного одноцветного верхнего слоя бесшовных покрытий", visible: true },
      ],
    },
    {
      id: "tiles",
      name: "Резиновая плитка",
      description: "Плитка 500×500 мм различной толщины",
      visible: true,
      items: [
        { id: "tile-20", name: "Плитка 500×500×20 мм", description: "Для пешеходных зон и террас", visible: true },
        { id: "tile-30", name: "Плитка 500×500×30 мм", description: "Для детских и спортивных площадок", visible: true },
        { id: "tile-40", name: "Плитка 500×500×40 мм", description: "Повышенная амортизация, для площадок с оборудованием", visible: true },
        { id: "tile-50", name: "Плитка 500×500×50 мм", description: "Максимальная защита, для спортзалов и тренажёрных", visible: true },
      ],
    },
    {
      id: "seamless",
      name: "Бесшовное покрытие",
      description: "Монолитное резиновое покрытие различной толщины",
      visible: true,
      items: [
        { id: "seamless-10", name: "Бесшовное покрытие 10 мм", description: "Тонкое декоративное покрытие", visible: true },
        { id: "seamless-20", name: "Бесшовное покрытие 20 мм", description: "Стандартное покрытие для дорожек", visible: true },
        { id: "seamless-40", name: "Бесшовное покрытие 40 мм", description: "Для детских площадок и зон отдыха", visible: true },
        { id: "seamless-50", name: "Бесшовное покрытие 50 мм", description: "Максимальная амортизация для спорта", visible: true },
      ],
    },
  ],
  retailCategories: [
    { id: "diy-kits", name: "Наборы «Сделай сам»", visible: true },
    { id: "crumb-bags", name: "Крошка в мешках", visible: true },
    { id: "glue", name: "Клей и компоненты", visible: true },
  ],
  retailVisible: false,
  formEmail: "torg.waste-rti@mail.ru",
  analyticsCode: "",
  articles: [
    {
      id: "article-1",
      title: "Преимущества резиновых покрытий для детских площадок",
      excerpt: "Узнайте, почему резиновые покрытия — лучший выбор для безопасности детей.",
      content: "Резиновые покрытия обеспечивают амортизацию при падении, не скользят, устойчивы к погодным условиям. Продукция соответствует ТУ (ГОСТов на данную продукцию не существует) и обеспечивает максимальную безопасность.",
      date: "2025-01-15",
      visible: true,
    },
  ],
};
