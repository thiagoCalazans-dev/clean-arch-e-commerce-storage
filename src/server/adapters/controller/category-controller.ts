import { NextResponse } from "next/server";
import { NameAlreadyExistError } from "@/server/aplication/error/NameAlreadyExistError";
import { CategoryNotFoundError } from "@/server/aplication/error/CategoryNotFoundError";
import {
  makeCreateCategoryUseCase,
  makeFetchCategoryUseCase,
  makeGetCategoriesUseCase,
  makeRemoveCategoryUseCase,
  makeUpdateCategoryUseCase,
} from "../factories/makeCategoryUseCase";

class CategoryController {
  async Get() {
    try {
      const getCategoriesUseCase = makeGetCategoriesUseCase();
      const categories = await getCategoriesUseCase.execute();

      return NextResponse.json(categories, { status: 200 });
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
      categoryId: string;
    }
  ) {
    const id = params.categoryId;

    try {
      console.log(id);
      const fetchCategoriesUseCase = makeFetchCategoryUseCase();
      const category = await fetchCategoriesUseCase.execute(id);

      return NextResponse.json(category, { status: 200 });
    } catch (error) {
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

  async Post(request: Request) {
    const body = await request.json();

    console.log(body);

    try {
      const createCategoryUseCase = makeCreateCategoryUseCase();
      await createCategoryUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof CategoryNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
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

  async Put(
    request: Request,
    params: {
      categoryId: string;
    }
  ) {
    const body = await request.json();
    const id = params.categoryId;

    try {
      const updateCategoryUseCase = makeUpdateCategoryUseCase();
      await updateCategoryUseCase.execute(body, id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof CategoryNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 400,
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
      categoryId: string;
    }
  ) {
    const id = params.categoryId;

    try {
      const removeCategoryUseCase = makeRemoveCategoryUseCase();
      await removeCategoryUseCase.execute(id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
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
}

export const categoryController = new CategoryController();
