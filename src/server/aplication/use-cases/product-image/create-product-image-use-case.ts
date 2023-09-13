import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { ProductImageRepository } from "@/server/adapters/database/repositories/produt-image-repository";
import { ProductImage } from "@/server/enterprise/entities/product-image";
import { CreateProductImageInputDTO } from "../../dto/product-image-dto";

export class CreateProductImageUseCase {
  constructor(
    private productItemRepository: ProductItemRepository,
    private productImageRepository: ProductImageRepository
  ) {}
  async execute({ data }: CreateProductImageInputDTO) {
    const { productItemId, imageUrl } = new ProductImage(data);

    const productItemExists = await this.productItemRepository.findById(
      productItemId
    );
    if (!productItemExists) throw new ProductNotFoundError();

    await this.productImageRepository.create({
      image_url: imageUrl,
      product_item_id: productItemId,
    });
  }
}
