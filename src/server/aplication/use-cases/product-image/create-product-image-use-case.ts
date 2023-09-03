import { ProductItem } from "@/server/enterprise/entities/product-item";
import { CreateProductItemInputDTO } from "../../dto/product-item-dto";
import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";
import { ColorRepository } from "@/server/adapters/database/repositories/color-repository";
import { SizeRepository } from "@/server/adapters/database/repositories/size-repository";
import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";
import { ProductItemNotFoundError } from "../../error/ProdutItemNotFoundError";
import { CreateProductImageInputDTO } from "../../dto/product-image-dto";
import { ProductImage } from "@/server/enterprise/entities/product-image";
import { ProductImageRepository } from "@/server/adapters/database/repositories/produt-image-repository";

export class CreateProductItemUseCase {
  constructor(
    private productImageRepository: ProductImageRepository,
    private productItemRepository: ProductItemRepository
  ) {}
  async execute({ data }: CreateProductImageInputDTO) {
    const { productItemId, url } = new ProductImage(data);

    const productItemExists = await this.productItemRepository.findById(
      productItemId
    );
    if (!productItemExists) throw new ProductItemNotFoundError();

    await this.productImageRepository.create({
      productItemId,
      url,
    });
  }
}
