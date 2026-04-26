export interface ProductVariant {
  id: string;
  sizeLabel: string;
  priceUah: number;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  photoUrl: string;
  variants: ProductVariant[];
  hasVectors?: boolean;
  defaultMockupTransform?: { x: number; y: number; z: number; scale: number };
  clipPath?: string;
}

export interface Subcategory {
  id: string;
  title: string;
  products: Product[];
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  photoUrl: string;
  subcategories: Subcategory[];
}

export const CATALOG: Category[] = [
  {
    id: "boxes",
    slug: "boxes",
    title: "Коробки з логотипом",
    description: "Крафтові коробки для вашого бренду. Виготовлені з якісного картону, ідеальні для подарунків, взуття, одягу або будь-яких виробів.",
    photoUrl: "/images/boxes-cat.png",
    subcategories: [
      {
        id: "shoes",
        title: "Під взуття",
        products: [
          {
            id: "box-shoes-standard",
            title: "Коробка стандартна (взуття)",
            photoUrl: "/images/box-shoes.png",
            defaultMockupTransform: { x: -40, y: -5, z: -15, scale: 0.8 },
            clipPath: "polygon(22% 8%, 91% 33%, 73% 86%, 0% 50%)",
            variants: [
              { id: "v1", sizeLabel: "30x20x10 см", priceUah: 45 },
              { id: "v2", sizeLabel: "35x25x12 см", priceUah: 55 },
              { id: "v3", sizeLabel: "40x30x15 см", priceUah: 70 },
            ]
          },
          {
            id: "box-shoes-high",
            title: "Коробка висока (черевики)",
            photoUrl: "/images/box-shoes.png",
            defaultMockupTransform: { x: -40, y: -5, z: -15, scale: 0.8 },
            clipPath: "polygon(22% 8%, 91% 33%, 73% 86%, 0% 50%)",
            variants: [
              { id: "v1", sizeLabel: "35x30x15 см", priceUah: 65 },
              { id: "v2", sizeLabel: "40x35x18 см", priceUah: 85 },
            ]
          },
          {
            id: "box-shoes-kids",
            title: "Коробка дитяча",
            photoUrl: "/images/box-shoes.png",
            defaultMockupTransform: { x: -40, y: -5, z: -15, scale: 0.8 },
            clipPath: "polygon(22% 8%, 91% 33%, 73% 86%, 0% 50%)",
            variants: [
              { id: "v1", sizeLabel: "20x15x8 см", priceUah: 30 },
              { id: "v2", sizeLabel: "25x18x10 см", priceUah: 38 },
            ]
          }
        ]
      },
      {
        id: "bags",
        title: "Сумочки",
        products: [
          {
            id: "box-bags-small",
            title: "Коробка під міні-сумочку",
            photoUrl: "/images/boxes-cat.png",
            defaultMockupTransform: { x: -35, y: 15, z: 10, scale: 0.75 },
            clipPath: "polygon(5% 50%, 45% 10%, 95% 45%, 55% 90%)",
            variants: [
              { id: "v1", sizeLabel: "20x15x8 см", priceUah: 35 },
              { id: "v2", sizeLabel: "25x20x10 см", priceUah: 45 }
            ]
          },
          {
            id: "box-bags-medium",
            title: "Коробка під сумочку (середня)",
            photoUrl: "/images/boxes-cat.png",
            defaultMockupTransform: { x: -35, y: 15, z: 10, scale: 0.75 },
            clipPath: "polygon(5% 50%, 45% 10%, 95% 45%, 55% 90%)",
            variants: [
              { id: "v1", sizeLabel: "30x25x12 см", priceUah: 55 },
              { id: "v2", sizeLabel: "35x30x15 см", priceUah: 70 }
            ]
          },
          {
            id: "box-bags-large",
            title: "Коробка під шопер",
            photoUrl: "/images/boxes-cat.png",
            defaultMockupTransform: { x: -35, y: 15, z: 10, scale: 0.75 },
            clipPath: "polygon(5% 50%, 45% 10%, 95% 45%, 55% 90%)",
            variants: [
              { id: "v1", sizeLabel: "40x35x15 см", priceUah: 85 },
              { id: "v2", sizeLabel: "45x40x18 см", priceUah: 105 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "leather-cliche",
    slug: "leather",
    title: "Кліше для шкіри",
    description: "Латунні кліше для тиснення на шкірі. Чіткі контури, глибоке гравіювання. Ідеально підходять для гарячого і холодного тиснення.",
    photoUrl: "/images/leather-cat.png",
    subcategories: [
      {
        id: "keychains",
        title: "Брілки",
        products: [
          {
            id: "cliche-keychain-round",
            title: "Кругле кліше для брілка",
            photoUrl: "/images/leather-keychain.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "Діаметр 20мм", priceUah: 450 },
              { id: "v2", sizeLabel: "Діаметр 30мм", priceUah: 550 },
              { id: "v3", sizeLabel: "Діаметр 40мм", priceUah: 700 },
            ]
          },
          {
            id: "cliche-keychain-square",
            title: "Квадратне кліше для брілка",
            photoUrl: "/images/leather-keychain.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "20x20мм", priceUah: 450 },
              { id: "v2", sizeLabel: "30x30мм", priceUah: 550 },
              { id: "v3", sizeLabel: "40x40мм", priceUah: 700 },
            ]
          },
          {
            id: "cliche-keychain-rect",
            title: "Прямокутне кліше",
            photoUrl: "/images/leather-keychain.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "20x40мм", priceUah: 500 },
              { id: "v2", sizeLabel: "30x50мм", priceUah: 650 },
            ]
          }
        ]
      },
      {
        id: "premium",
        title: "Преміум / люкс",
        products: [
          {
            id: "cliche-premium-3d",
            title: "3D кангрівне кліше",
            photoUrl: "/images/leather-cat.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "До 10 кв. см", priceUah: 1200 },
              { id: "v2", sizeLabel: "До 20 кв. см", priceUah: 1800 }
            ]
          },
          {
            id: "cliche-premium-deep",
            title: "Глибоке гравіювання (люкс)",
            photoUrl: "/images/leather-cat.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "До 15 кв. см", priceUah: 1500 },
              { id: "v2", sizeLabel: "До 30 кв. см", priceUah: 2200 }
            ]
          },
          {
            id: "cliche-premium-complex",
            title: "Кліше зі складною геометрією",
            photoUrl: "/images/leather-cat.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "До 15 кв. см", priceUah: 1600 },
              { id: "v2", sizeLabel: "До 30 кв. см", priceUah: 2400 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "wood-engraving",
    slug: "wood",
    title: "Гравіювання на дереві",
    description: "Точне фрезерування та кліше для випалювання логотипу на дерев'яних виробах.",
    photoUrl: "/images/wood-cat.png",
    subcategories: [
      {
        id: "branding-iron",
        title: "Кліше для вижигу",
        products: [
          {
            id: "wood-iron-standard",
            title: "Кліше для вижигу з ручкою",
            photoUrl: "/images/wood-iron.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "До 15 кв. см", priceUah: 800 },
              { id: "v2", sizeLabel: "До 30 кв. см", priceUah: 1100 }
            ]
          },
          {
            id: "wood-iron-large",
            title: "Велике кліше для вижигу",
            photoUrl: "/images/wood-iron.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "До 50 кв. см", priceUah: 1500 },
              { id: "v2", sizeLabel: "До 80 кв. см", priceUah: 2100 }
            ]
          },
          {
            id: "wood-iron-electric",
            title: "Насадка на паяльник",
            photoUrl: "/images/wood-iron.png",
            hasVectors: true,
            variants: [
              { id: "v1", sizeLabel: "До 10 кв. см", priceUah: 600 },
              { id: "v2", sizeLabel: "До 20 кв. см", priceUah: 900 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "alphabets",
    slug: "alphabets",
    title: "Наборні алфавіти",
    description: "Набори латунних літер для тиснення імен, ініціалів чи дат. Зручно, довговічно, професійно.",
    photoUrl: "/images/alphabets-cat.png",
    subcategories: [
      {
        id: "standard",
        title: "Усі алфавіти",
        products: [
          {
            id: "alpha-1",
            title: "Алфавіт №1 (Класичний)",
            photoUrl: "/images/alphabet-premium.png",
            variants: [
              { id: "v1", sizeLabel: "Висота 6мм", priceUah: 2500 },
              { id: "v2", sizeLabel: "Висота 8мм", priceUah: 2800 }
            ]
          },
          {
            id: "alpha-2",
            title: "Алфавіт №2 (Вензель)",
            photoUrl: "/images/alphabets-cat.png",
            variants: [
              { id: "v1", sizeLabel: "Висота 8мм", priceUah: 3200 },
              { id: "v2", sizeLabel: "Висота 10мм", priceUah: 3500 }
            ]
          },
          {
            id: "alpha-3",
            title: "Алфавіт №3 (Сучасний)",
            photoUrl: "/images/alphabet-premium.png",
            variants: [
              { id: "v1", sizeLabel: "Висота 5мм", priceUah: 2400 },
              { id: "v2", sizeLabel: "Висота 7мм", priceUah: 2700 }
            ]
          }
        ]
      }
    ]
  }
];