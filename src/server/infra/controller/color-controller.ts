import { NextResponse } from "next/server";
import { NameAlreadyExistError } from "@/server/aplication/error/NameAlreadyExistError";
import { ColorNotFoundError } from "@/server/aplication/error/ColorNotFoundError";
import {
  makeFetchColorUseCase,
  makeGetColorsUseCase,
  makeCreateColorUseCase,
  makeRemoveColorUseCase,
  makeUpdateColorUseCase,
} from "../factories/makeColorUseCase";
import { ValueAlreadyExistError } from "@/server/aplication/error/ValueAlereadyExistError";
import { IsRequiredError } from "@/server/domain/errors/isRequiredError";
import { isHexadecimalColorValue } from "@/server/domain/errors/isHexadecimalColorValue";

class ColorController {
  async Get() {
    try {
      const getColorsUseCase = makeGetColorsUseCase();
      const colors = await getColorsUseCase.execute();

      return NextResponse.json(colors, { status: 200 });
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
      colorId: string;
    }
  ) {
    const id = params.colorId;

    try {
      console.log(id);
      const fetchColorsUseCase = makeFetchColorUseCase();
      const color = await fetchColorsUseCase.execute(id);

      return NextResponse.json(color, { status: 200 });
    } catch (error) {
      if (error instanceof ColorNotFoundError)
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
      const createColorUseCase = makeCreateColorUseCase();
      await createColorUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ColorNotFoundError)
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

      if (error instanceof isHexadecimalColorValue)
        return NextResponse.json(null, {
          status: 406,
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
      colorId: string;
    }
  ) {
    const body = await request.json();
    const id = params.colorId;

    try {
      const updateColorUseCase = makeUpdateColorUseCase();
      await updateColorUseCase.execute(body, id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ColorNotFoundError)
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

      if (error instanceof isHexadecimalColorValue)
        return NextResponse.json(null, {
          status: 406,
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
      colorId: string;
    }
  ) {
    const id = params.colorId;

    try {
      const removeColorUseCase = makeRemoveColorUseCase();
      await removeColorUseCase.execute(id);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ColorNotFoundError)
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

export const colorController = new ColorController();
