import { ImageHttp } from "../gateways/image-https";
import { supabase } from "../lib/supabse";
import { CreateImageParamsSchema } from "../schema/actions/image-actions-schema";
import { FormImage, InputFile } from "../schema/forms/image-form-schema";

const imageHttp = new ImageHttp();

async function getAll() {
  return imageHttp.Get();
}

async function create(formImage: FormImage, inputFile: InputFile) {
  const parsedParams = CreateImageParamsSchema.safeParse({
    formImage,
    inputFile,
  });

  if (!parsedParams.success) {
    console.log(parsedParams.error.message);
  }

  const { error } = await supabase.storage
    .from("Delmar Photos")
    .upload(`${inputFile.name}.${inputFile.format}`, inputFile.file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = await supabase.storage
    .from("Delmar Photos")
    .getPublicUrl(`${inputFile.name}.${inputFile.format}`);

  const body = {
    data: {
      name: formImage.name,
      url: data.publicUrl,
    },
  };

  await imageHttp.Post(body);
}

export const ImageAction = {
  create,
  getAll,
};
