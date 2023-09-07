import { NextResponse } from "next/server";
import { ProductNotFoundError } from "@/server/aplication/error/ProductNotFoundError";
import {
  makeCreateProductItemUseCase,
  makeFetchProductItemUseCase,
  makeRemoveProductItemUseCase,
} from "../factories/makeProductItemUseCase";
import { ColorNotFoundError } from "@/server/aplication/error/ColorNotFoundError";
import { SizeNotFoundError } from "@/server/aplication/error/SizeNotFoundError";
import { isPercentageError } from "@/server/enterprise/errors/isPercentageError";
import { isCurrencyTypeValueError } from "@/server/enterprise/errors/isCurrencyTypeValueError";
import { CreateProductItemInputDTO } from "@/server/aplication/dto/product-item-dto";
import {
  makeFetchProductUseCase,
  makeFetchProductWithItemsUseCase,
} from "../factories/makeProductUseCase";
import { CodeAlreadyExistError } from "@/server/aplication/error/CodeAlreadyExistError";

class ProductItemController {
  async Get(
    _: Request,
    params: {
      productId: string;
    }
  ) {
    const id = params.productId;

    try {
      const fetchProductsWithItemsUseCase = makeFetchProductWithItemsUseCase();
      const product = await fetchProductsWithItemsUseCase.execute(id);

      return NextResponse.json(product, { status: 200 });
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

  async GetParams(
    _: Request,
    params: {
      productId: string;
      itemId: string;
    }
  ) {
    const itemId = params.itemId;

    try {
      const fetchProductItemUseCase = makeFetchProductItemUseCase();
      const product = await fetchProductItemUseCase.execute(itemId);

      return NextResponse.json(product, { status: 200 });
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

  async Post(
    request: Request,
    params: {
      productId: string;
    }
  ) {
    const body: CreateProductItemInputDTO = await request.json();

    if (params.productId !== body.data.productId)
      throw new Error("wrong productId parameters");

    try {
      const createProductItemUseCase = makeCreateProductItemUseCase();
      await createProductItemUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ProductNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof CodeAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      if (error instanceof ColorNotFoundError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      if (error instanceof SizeNotFoundError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      if (error instanceof isPercentageError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      if (error instanceof isCurrencyTypeValueError)
        return NextResponse.json(null, {
          status: 400,
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
      itemId: string;
    }
  ) {
    const itemId = params.itemId;

    try {
      const removeProductItemUseCase = makeRemoveProductItemUseCase();
      await removeProductItemUseCase.execute(itemId);

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
export const productItemController = new ProductItemController();
