import { CreateProductImageInputDTO } from "@/server/aplication/dto/product-image-dto";
import { NextResponse } from "next/server";
import {
  makeCreateProductImageUseCase,
  makeRemoveProductItemUseCase,
} from "../factories/makeProductImageUseCase";
import { ProductNotFoundError } from "@/server/aplication/error/ProductNotFoundError";

export class ProductImageController {
  static async Post(
    request: Request,
    params: {
      itemId: string;
    }
  ) {
    const body: CreateProductImageInputDTO = await request.json();

    if (params.itemId !== body.data.productItemId)
      return NextResponse.json(null, {
        status: 409,
        statusText: "Wrong ID parameter",
      });

    try {
      const createProductImageUseCase = makeCreateProductImageUseCase();
      await createProductImageUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ProductNotFoundError)
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

  static async Delete(
    _: Request,
    params: {
      imageId: string;
    }
  ) {
    const imageId = params.imageId;

    try {
      const removeProductImageUseCase = makeRemoveProductItemUseCase();
      await removeProductImageUseCase.execute(imageId);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ProductNotFoundError)
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
