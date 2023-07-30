import { IsRequiredError } from "@/server/domain/errors/isRequiredError";
import { makeCategoryUseCase } from "@/server/infra/factories/makeCategoryUseCase";
import { NextResponse } from "next/server";

export function GET(request: Request, response: Response) {
  return NextResponse.json({ teste: "teste" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const createCategoryUseCase = makeCategoryUseCase();

    const body = await request.json();

    const data = {
      data: {
        name: body.name,
      },
    };

    const response = await createCategoryUseCase.execute(data);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof IsRequiredError) {
      return NextResponse.json(null, {
        status: 409,
        statusText: error.message,
      });
    }
    console.error(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Something went wrong!",
    });
  }
}
