import {
  pgTable,
  serial,
  text,
  jsonb,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export type OrderItemRecord = {
  categoryId: string;
  subcategoryId?: string;
  productId: string;
  productTitle: string;
  sizeLabel?: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
};

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  deliveryCity: text("delivery_city"),
  deliveryNote: text("delivery_note"),
  paymentMethod: text("payment_method"),
  items: jsonb("items").$type<OrderItemRecord[]>().notNull(),
  attachmentName: text("attachment_name"),
  message: text("message"),
  totalPrice: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type OrderRow = typeof ordersTable.$inferSelect;
