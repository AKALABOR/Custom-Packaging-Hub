import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { CreateOrderBodySchema } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/orders", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.createdAt));

    const result = rows.map((row) => ({
      id: row.id,
      customerName: row.customerName,
      customerPhone: row.customerPhone,
      customerEmail: row.customerEmail,
      deliveryCity: row.deliveryCity,
      deliveryNote: row.deliveryNote,
      paymentMethod: row.paymentMethod,
      items: row.items,
      attachmentName: row.attachmentName,
      message: row.message,
      totalPrice: Number(row.totalPrice),
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list orders");
    res.status(500).json({ error: "Failed to list orders" });
  }
});

router.post("/orders", async (req, res) => {
  const parsed = CreateOrderBodySchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid order body");
    res.status(400).json({ error: "Invalid order body", issues: parsed.error.issues });
    return;
  }

  const body = parsed.data;

  try {
    const [inserted] = await db
      .insert(ordersTable)
      .values({
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerEmail: body.customerEmail ?? null,
        deliveryCity: body.deliveryCity ?? null,
        deliveryNote: body.deliveryNote ?? null,
        paymentMethod: body.paymentMethod ?? null,
        items: body.items.map((it) => ({
          categoryId: it.categoryId,
          subcategoryId: it.subcategoryId,
          productId: it.productId,
          productTitle: it.productTitle,
          sizeLabel: it.sizeLabel,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          notes: it.notes,
        })),
        attachmentName: body.attachmentName ?? null,
        message: body.message ?? null,
        totalPrice: String(body.totalPrice),
        status: "new",
      })
      .returning();

    if (!inserted) {
      throw new Error("Insert returned no rows");
    }

    res.status(201).json({
      id: inserted.id,
      customerName: inserted.customerName,
      customerPhone: inserted.customerPhone,
      customerEmail: inserted.customerEmail,
      deliveryCity: inserted.deliveryCity,
      deliveryNote: inserted.deliveryNote,
      paymentMethod: inserted.paymentMethod,
      items: inserted.items,
      attachmentName: inserted.attachmentName,
      message: inserted.message,
      totalPrice: Number(inserted.totalPrice),
      status: inserted.status,
      createdAt: inserted.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
