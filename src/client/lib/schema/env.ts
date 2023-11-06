import schema from "../schema";

const envSchema = schema.object({
  DATABASE_URL: schema.string(),
  API_BASE_URL: schema.string(),
  DIRECT_URL: schema.string(),
  SUPABASE_URL: schema.string(),
  SUPABASE_KEY: schema.string(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
});
