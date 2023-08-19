import { NextResponse } from "next/server";
import { NameAlreadyExistError } from "@/server/aplication/error/NameAlreadyExistError";
import { BrandNotFoundError } from "@/server/aplication/error/BrandNotFoundError";
import {
  makeFetchBrandUseCase,
  makeGetBrandsUseCase,
  makeCreateBrandUseCase,
  makeRemoveBrandUseCase,
  makeUpdateBrandUseCase,
} from "../factories/makeBrandUseCase";
import { revalidateTag } from "next/cache";

class BrandController {
  async Get() {
    try {
      const getBrandsUseCase = makeGetBrandsUseCase();
      const brands = await getBrandsUseCase.execute();

      return NextResponse.json(brands, { status: 200 });
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
      brandId: string;
    }
  ) {
    const id = params.brandId;

    try {
      const fetchBrandsUseCase = makeFetchBrandUseCase();
      const brand = await fetchBrandsUseCase.execute(id);

      return NextResponse.json(brand, { status: 200 });
    } catch (error) {
      if (error instanceof BrandNotFoundError)
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

    console.log(body);

    try {
      const createBrandUseCase = makeCreateBrandUseCase();
      await createBrandUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof BrandNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      revalidateTag("brands");
      console.log(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  async Put(
    request: Request,
    params: {
      brandId: string;
    }
  ) {
    const body = await request.json();
    const id = params.brandId;

    try {
      const updateBrandUseCase = makeUpdateBrandUseCase();
      await updateBrandUseCase.execute(body, id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof BrandNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
          statusText: error.message,
        });

      revalidateTag("brands");
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
      brandId: string;
    }
  ) {
    const id = params.brandId;

    try {
      const removeBrandUseCase = makeRemoveBrandUseCase();
      await removeBrandUseCase.execute(id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof BrandNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      revalidateTag("brands");
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}

export const brandController = new BrandController();
