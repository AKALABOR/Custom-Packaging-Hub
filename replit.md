# Freza Maket

## Overview

Багаторівневий каталог-сайт для майстерні Freza Maket: коробки з брендуванням, кліше для тиснення на шкірі, фрезіровка/гравіювання на дереві, наборні алфавіти. Клієнт обирає категорію → підкатегорію → конкретний товар з розмірами, додає в кошик і оформлює замовлення. Замовлення зберігаються в БД і доступні в /admin/orders.

## Stack

- **Monorepo tool**: pnpm workspaces (Node 24, TypeScript 5.9)
- **Frontend**: React + Vite + Tailwind v4 + wouter + TanStack Query (`artifacts/freza-maket`)
- **Backend**: Express 5 (`artifacts/api-server`)
- **Database**: PostgreSQL + Drizzle ORM (`lib/db`)
- **API contract**: OpenAPI 3.1 → Orval codegen → React Query hooks + Zod schemas
- **Validation**: Zod (`zod/v4`), `drizzle-zod`

## Catalog & flows

- Каталог зашитий у `artifacts/freza-maket/src/data/` (легко редагувати).
- Кошик — React Context + localStorage.
- Превʼю свого логотипу на коробці на сторінці деталей коробки (drag/resize).
- Завантаження готового макета (.svg/.pdf/.ai/.eps/.cdr/.png/.jpg) на сторінках кліше і дерева.
- Checkout → POST `/api/orders`.
- Адмін-список замовлень: `/admin/orders` (без авторизації, для приватного доступу власниці).

## Database schema

- `orders`: id, customer_name, customer_phone, customer_email, delivery_city, delivery_note, payment_method, items (jsonb), attachment_name, message, total_price, status, created_at.

## API endpoints

- `GET /api/healthz`
- `GET /api/orders` — список замовлень (адмін)
- `POST /api/orders` — створити замовлення з кошика
- `GET /api/stats` — агреговані показники для головної

## Key Commands

- `pnpm run typecheck` — повна перевірка типів
- `pnpm run build` — typecheck + build усіх пакетів
- `pnpm --filter @workspace/api-spec run codegen` — перегенерувати API хуки і Zod схеми
- `pnpm --filter @workspace/db run push` — застосувати зміни схеми (dev)

## Roadmap (на майбутнє)

- Онлайн-оплата (LiqPay / WayForPay).
- Авторизація для /admin/orders.
- Онлайн-трасування растрових макетів у вектор (потребує платного гейта, щоб не палили потужності задарма).
- Email/Telegram-сповіщення про нові замовлення.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
