import { ImageHttp } from "../gateways/image-https";
import { supabase } from "../lib/supabase";
import {
  CreateImageParamsSchema,
  RemoveImageByIdParams,
  removeImageByIdParamsSchema,
} from "./schema/image-actions-schema";
import {
  FormImage,
  InputFile,
} from "../components/forms/schema/image-form-schema";

const imageHttp = new ImageHttp();

async function getAll() {
  return imageHttp.Get();
}

async function create(inputFile: InputFile) {
  const parsedParams = CreateImageParamsSchema.safeParse(inputFile);

  if (!parsedParams.success) {
    console.log(parsedParams.error.message);
  }

  const { error } = await supabase.storage
    .from("Delmar Photos")
    .upload(inputFile.name, inputFile.file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = await supabase.storage
    .from("Delmar Photos")
    .getPublicUrl(inputFile.name);

  const body = {
    data: {
      name: inputFile.name,
      url: data.publicUrl,
    },
  };

  await imageHttp.Post(body);
}

async function remove(imageId: RemoveImageByIdParams) {
  const parsedParams = removeImageByIdParamsSchema.safeParse(imageId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await imageHttp.Delete(imageId);
}

export const ImageAction = {
  create,
  getAll,
  remove,
};
