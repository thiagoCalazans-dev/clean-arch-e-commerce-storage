import { prisma } from "../../prismadb";
import {
  ProductImageRepository,
  RepositoryCreateProductImage,
} from "../produt-image-repository";

export class PrismaProductImageRepository implements ProductImageRepository {
  async create(data: RepositoryCreateProductImage) {
    await prisma.productImages.create({
      data: {
        url: data.url,
        product_item_id: data.productItemId,
      },
    });
  }
  async remove(id: string) {
    await prisma.productItem.delete({
      where: {
        id: id,
      },
    });
  }
}
