import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";
import { ColorRepository } from "@/server/aplication/database/repositories/color-repository";
import { SizeRepository } from "@/server/aplication/database/repositories/size-repository";
import { ProductRepository } from "@/server/aplication/database/repositories/product-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";
import { ProductItem } from "@/server/enterprise/entities/product-item";

import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { CreateProductItemInputDTO } from "../../dto/product-item-dto";

export class CreateProductItemUseCase {
  constructor(
    private productItemRepository: ProductItemRepository,
    private productRepository: ProductRepository,
    private colorRepository: ColorRepository,
    private sizeRepository: SizeRepository
  ) {}
  async execute({ data }: CreateProductItemInputDTO) {
    const productItem = new ProductItem(data);

    const codeExists = await this.productItemRepository.findByCode(
      productItem.code
    );
    if (codeExists) throw new CodeAlreadyExistError();

    //TO-DO:  caso ja tenha produto com o mesmo tamanho e cor, nao deixar lancar com um codigo diferente.

    const productExists = await this.productRepository.findById(
      productItem.productId
    );
    if (!productExists) throw new ProductNotFoundError();

    const colorExists = await this.colorRepository.findById(
      productItem.colorId
    );
    if (!colorExists) throw new ColorNotFoundError();

    const sizeExists = await this.sizeRepository.findById(productItem.sizeId);
    if (!sizeExists) throw new SizeNotFoundError();

    await this.productItemRepository.createAndStock(productItem);
  }
}
