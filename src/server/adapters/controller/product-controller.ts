import { NextResponse } from "next/server";
import { NameAlreadyExistError } from "@/server/aplication/error/NameAlreadyExistError";
import { ProductNotFoundError } from "@/server/aplication/error/ProductNotFoundError";
import {
  makeCreateProductUseCase,
  makeFetchProductUseCase,
  makeGetProductsUseCase,
  makeRemoveProductUseCase,
  makeUpdateProductUseCase,
} from "../factories/makeProductUseCase";
import { CodeAlreadyExistError } from "@/server/aplication/error/CodeAlreadyExistError";
import { BrandNotFoundError } from "@/server/aplication/error/BrandNotFoundError";
import { CategoryNotFoundError } from "@/server/aplication/error/CategoryNotFoundError";
import { revalidateTag } from "next/cache";

class ProductController {
  async Get() {
    try {
      const getProductsUseCase = makeGetProductsUseCase();
      const products = await getProductsUseCase.execute();

      return NextResponse.json(products, { status: 200 });
    } catch (error) {
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
    }
  ) {
    const id = params.productId;

    try {
      const fetchProductsUseCase = makeFetchProductUseCase();
      const product = await fetchProductsUseCase.execute(id);

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

  async Post(request: Request) {
    const body = await request.json();

    try {
      const createProductUseCase = makeCreateProductUseCase();
      await createProductUseCase.execute(body);
      revalidateTag("products");
      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ProductNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });    

      if (error instanceof BrandNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });
      if (error instanceof CategoryNotFoundError)
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

  async Put(
    request: Request,
    params: {
      productId: string;
    }
  ) {
    const body = await request.json();
    const id = params.productId;

    try {
      const updateProductUseCase = makeUpdateProductUseCase();
      await updateProductUseCase.execute(body, id);
      revalidateTag("products");
      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ProductNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      if (error instanceof CodeAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      if (error instanceof BrandNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });
      if (error instanceof CategoryNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      console.log(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  async Delete(
    _: Request,
    params: {
      productId: string;
    }
  ) {
    const id = params.productId;

    try {
      const removeProductUseCase = makeRemoveProductUseCase();
      await removeProductUseCase.execute(id);
      revalidateTag("products");
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

export const productController = new ProductController();
