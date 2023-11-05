import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";

import { ProductImageRepository } from "@/server/aplication/database/repositories/produt-image-repository";
import { ProductImage } from "@/server/enterprise/entities/product-image";
import { CreateProductImageInputDTO } from "../../dto/product-image-dto";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { ProductImageAlreadyExistError } from "../../error/ProductImageExistError";

export class CreateProductImageUseCase {
  constructor(
    private productItemRepository: ProductItemRepository,
    private productImageRepository: ProductImageRepository
  ) {}
  async execute({ data }: CreateProductImageInputDTO) {
    console.log(data);

    const { productItemId, imageUrl } = new ProductImage(data);

    console.log("productID:", productItemId);

    const productItemExists = await this.productItemRepository.findById(
      productItemId
    );

    if (!productItemExists) throw new ProductNotFoundError();

    const productItemImageExist =
      await this.productImageRepository.findProductImage(
        productItemId,
        imageUrl
      );

    if (productItemImageExist) throw new ProductImageAlreadyExistError();
    await this.productImageRepository.create({
      image_url: imageUrl,
      product_item_id: productItemId,
    });
  }
}
