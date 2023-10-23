import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";
import { ColorRepository } from "@/server/adapters/database/repositories/color-repository";
import { SizeRepository } from "@/server/adapters/database/repositories/size-repository";
import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";
import { Entry } from "@/server/enterprise/entities/entry";
import { CreateEntryInputDTO } from "../../dto/entry-dto";
import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";

export class CreateProductItemUseCase {
  constructor(
    private productItemRepository: ProductItemRepository,
    private productRepository: ProductRepository,
    private colorRepository: ColorRepository,
    private sizeRepository: SizeRepository
  ) {}
  async execute({ data }: CreateEntryInputDTO) {
    const { colorId, descount, price, sizeId, productId, code, id, quantity } =
      new Entry(data);

    const codeExists = await this.productItemRepository.findByCode(code);
    if (codeExists) throw new CodeAlreadyExistError();

    //TO-DO:  caso ja tenha produto com o mesmo tamanho e cor, nao deixar lancar com um codigo diferente.

    const productExists = await this.productRepository.findById(productId);
    if (!productExists) throw new ProductNotFoundError();

    const colorExists = await this.colorRepository.findById(colorId);
    if (!colorExists) throw new ColorNotFoundError();

    const sizeExists = await this.sizeRepository.findById(sizeId);
    if (!sizeExists) throw new SizeNotFoundError();

    await this.productItemRepository.create({
      id,
      code,
      productId,
      colorId,
      sizeId,
      descount,
      price,
      quantity,
    });
  }
}
