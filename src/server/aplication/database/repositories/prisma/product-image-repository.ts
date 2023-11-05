import { prisma } from "../../prismadb";
import {
  ProductImageRepository,
  RepositoryCreateProductImage,
  RepositoryProductImage,
} from "../produt-image-repository";

export class PrismaProductImageRepository implements ProductImageRepository {
  async findProductImage(productItemId: string, ImageUrl: string) {
    const productImage = await prisma.productImage.findFirst({
      where: {
        product_item_id: productItemId,
        image_url: ImageUrl,
      },
    });

    if (!productImage) return null;

    const mappedProductImage = {
      id: productImage.id,
      productItemId: productImage.product_item_id,
      imageUrl: productImage.image_url,
    };

    return mappedProductImage;
  }
  async create(data: RepositoryCreateProductImage) {
    await prisma.productImage.create({
      data: {
        image_url: data.image_url,
        product_item_id: data.product_item_id,
      },
    });
  }

  async findById(id: string) {
    const productImage = await prisma.productImage.findUnique({
      where: {
        id: id,
      },
    });

    if (!productImage) return null;

    const mappedProductImage = {
      id: productImage.id,
      productItemId: productImage.product_item_id,
      imageUrl: productImage.image_url,
    };
    return mappedProductImage;
  }

  async remove(id: string) {
    await prisma.productItem.delete({
      where: {
        id: id,
      },
    });
  }
}
