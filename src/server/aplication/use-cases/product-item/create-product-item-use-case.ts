import { ProductItem } from "@/server/enterprise/entities/product-item";
import { CreateProductItemInputDTO } from "../../dto/product-item-dto";
import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";
import { ColorRepository } from "@/server/adapters/database/repositories/color-repository";
import { SizeRepository } from "@/server/adapters/database/repositories/size-repository";
import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";

export class CreateProductItemUseCase {
  constructor(
    private productItemRepository: ProductItemRepository,
    private productRepository: ProductRepository,
    private colorRepository: ColorRepository,
    private sizeRepository: SizeRepository
  ) {}
  async execute({ data }: CreateProductItemInputDTO) {
    const { colorId, descount, price, sizeId, productId, code, id } =
      new ProductItem(data);

    // const codeExists = await this.productRepository.findByCode(code);
    // if (codeExists) throw new CodeAlreadyExistError();

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
    });
  }
}
