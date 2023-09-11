import { UrlAlreadyExistError } from "@/server/aplication/error/UrlAlreadyExistError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import {
  makeCreateImageUseCase,
  makeGetImagesUseCase,
  makeRemoveImageUseCase,
} from "../factories/makeImageUseCase";
import { ImageNotFoundError } from "@/server/aplication/error/ImageNotFoundError";

class ImageController {
  async Get() {
    try {
      const getImagesUseCase = makeGetImagesUseCase();
      const images = await getImagesUseCase.execute();

      return NextResponse.json(images, { status: 200 });
    } catch (error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  async Post(request: Request) {
    const body = await request.json();
    try {
      const createImageUseCase = makeCreateImageUseCase();
      await createImageUseCase.execute(body);
      revalidateTag("images");
      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof UrlAlreadyExistError)
        return NextResponse.json(null, {
          status: 409,
          statusText: error.message,
        });

      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  async Delete(
    _: Request,
    params: {
      imageId: string;
    }
  ) {
    const id = params.imageId;
    console.log(id);

    try {
      const removeImageUseCase = makeRemoveImageUseCase();
      await removeImageUseCase.execute(id);
      revalidateTag("images");
      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ImageNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}

export const imageController = new ImageController();
