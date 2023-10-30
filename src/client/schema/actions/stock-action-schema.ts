import schema from "../../lib/schema";

export const StockSchema = schema.object({
  id: schema.string(),
  productItemId: schema.string(),
  qunatity: schema.number(),
});

export type Stock = schema.infer<typeof StockSchema>;
