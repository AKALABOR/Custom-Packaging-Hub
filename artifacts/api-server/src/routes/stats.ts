import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";

const CATEGORY_LABELS: Record<string, string> = {
  boxes: "Коробки",
  leather: "Кліше для шкіри",
  wood: "Фрезіровка / гравіювання",
  alphabets: "Наборні алфавіти",
};

const router: IRouter = Router();

router.get("/stats", async (req, res) => {
  try {
    const rows = await db.select().from(ordersTable);

    const totalOrders = rows.length;
    let totalRevenue = 0;
    const counts: Record<string, number> = {};
    for (const id of Object.keys(CATEGORY_LABELS)) counts[id] = 0;

    for (const row of rows) {
      totalRevenue += Number(row.totalPrice);
      const seen = new Set<string>();
      for (const item of row.items ?? []) {
        if (!seen.has(item.categoryId)) {
          counts[item.categoryId] = (counts[item.categoryId] ?? 0) + 1;
          seen.add(item.categoryId);
        }
      }
    }

    const byCategory = Object.entries(CATEGORY_LABELS).map(
      ([categoryId, label]) => ({
        categoryId,
        label,
        ordersCount: counts[categoryId] ?? 0,
      }),
    );

    res.json({
      totalOrders,
      totalRevenue,
      byCategory,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to compute stats");
    res.status(500).json({ error: "Failed to compute stats" });
  }
});

export default router;
