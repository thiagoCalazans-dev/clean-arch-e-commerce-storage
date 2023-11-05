import schema from "../../lib/schema";

export const StockSchema = schema.object({
  id: schema.string(),
  productItemId: schema.string(),
  quantity: schema.number(),
});

export type Stock = schema.infer<typeof StockSchema>;

export const StockEntrySchema = schema.object({
  productItemId: schema.string(),
  quantity: schema.number(),
  date: schema.string().refine(
    (value) => {
      return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
    },
    {
      message:
        "A data deve estar no formato ISO 8601 (YYYY-MM-DDTHH:MM:SS.sssZ).",
    }
  ),
  value: schema.coerce.number().positive(),
});

export type StockEntry = schema.infer<typeof FormStockEntrySchema>;

export const FormStockEntrySchema = schema.object({
  productItemId: schema.string(),
  quantity: schema.coerce.number().positive(),
  date: schema.string().transform((value) => new Date(value).toISOString()),
  value: schema.coerce.number().positive(),
});

export type FormStockEntry = schema.infer<typeof FormStockEntrySchema>;
