import { NextResponse } from "next/server";
import { NameAlreadyExistError } from "@/server/aplication/error/NameAlreadyExistError";
import { SizeNotFoundError } from "@/server/aplication/error/SizeNotFoundError";
import {
  makeFetchSizeUseCase,
  makeGetSizesUseCase,
  makeCreateSizeUseCase,
  makeRemoveSizeUseCase,
  makeUpdateSizeUseCase,
} from "../factories/makeSizeUseCase";
import { ValueAlreadyExistError } from "@/server/aplication/error/ValueAlereadyExistError";
import { IsRequiredError } from "@/server/domain/errors/isRequiredError";

class SizeController {
  async Get() {
    try {
      const getSizesUseCase = makeGetSizesUseCase();
      const sizes = await getSizesUseCase.execute();

      return NextResponse.json(sizes, { status: 200 });
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
      sizeId: string;
    }
  ) {
    const id = params.sizeId;

    try {
      console.log(id);
      const fetchSizesUseCase = makeFetchSizeUseCase();
      const size = await fetchSizesUseCase.execute(id);

      return NextResponse.json(size, { status: 200 });
    } catch (error) {
      if (error instanceof SizeNotFoundError)
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
      const createSizeUseCase = makeCreateSizeUseCase();
      await createSizeUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof SizeNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 409,
          statusText: error.message,
        });

      if (error instanceof ValueAlreadyExistError)
        return NextResponse.json(null, {
          status: 409,
          statusText: error.message,
        });

      if (error instanceof IsRequiredError)
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

  async Put(
    request: Request,
    params: {
      sizeId: string;
    }
  ) {
    const body = await request.json();
    const id = params.sizeId;

    try {
      const updateSizeUseCase = makeUpdateSizeUseCase();
      await updateSizeUseCase.execute(body, id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof SizeNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      if (error instanceof NameAlreadyExistError)
        return NextResponse.json(null, {
          status: 409,
          statusText: error.message,
        });

      if (error instanceof ValueAlreadyExistError)
        return NextResponse.json(null, {
          status: 409,
          statusText: error.message,
        });

      if (error instanceof IsRequiredError)
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
      sizeId: string;
    }
  ) {
    const id = params.sizeId;

    try {
      const removeSizeUseCase = makeRemoveSizeUseCase();
      await removeSizeUseCase.execute(id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof SizeNotFoundError)
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

export const sizeController = new SizeController();
