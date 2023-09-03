import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://krbrndhotdrdxdtvgzko.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYnJuZGhvdGRyZHhkdHZnemtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzY1NTEwMiwiZXhwIjoyMDA5MjMxMTAyfQ.AgdVazbuQY8VwDKR-PHPbmy-wJHp0G0k_9ofSJLdeOM"
);
