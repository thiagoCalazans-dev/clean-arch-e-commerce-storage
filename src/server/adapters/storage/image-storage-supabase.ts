import { supabase } from "@/client/lib/supabse";

export class ImageStorage {
  constructor() {}

  async Remove(fileName: string) {
    const { data, error } = await supabase.storage
      .from("Delmar Photos")
      .remove([fileName]);

    console.log(data);

    return {
      data,
      error,
    };
  }
}
