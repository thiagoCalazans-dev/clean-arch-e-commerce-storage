import { ProductItem } from "@/server/enterprise/entities/product-item";
import { CreateProductItemInputDTO } from "../../dto/product-item-dto";
import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";

export class CreateProductItemUseCase {
  constructor(private productItemRepository: ProductItemRepository) {}
  async execute({ data }: CreateProductItemInputDTO) {
    const { id, colorId, descount, price, sizeId, productId } = new ProductItem(
      data
    );

    //TO-DO RULEs

    await this.productItemRepository.create({
      productId,
      colorId,
      sizeId,
      descount,
      price,
    });
  }
}
