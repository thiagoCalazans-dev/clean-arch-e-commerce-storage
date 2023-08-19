import { prisma } from "../../prismadb";
import {
  ProductItemRepository,
  RepositoryCreateProductItem,
  RepositoryProductItem,
} from "../product-item-repository";

export class PrismaProductItemRepository implements ProductItemRepository {
  async create(data: RepositoryCreateProductItem) {
    await prisma.productItem.create({
      data: {
        price: data.price,
        color_id: data.colorId,
        product_id: data.productId,
        size_id: data.sizeId,
        descont: data.descount,
      },
    });
  }

  async update(data: RepositoryProductItem) {
    await prisma.productItem.update({
      where: {
        id: data.id,
      },
      data: {
        price: data.price,
        color_id: data.colorId,
        product_id: data.productId,
        size_id: data.sizeId,
        descont: data.descount,
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

  async findById(id: string) {
    const item = await prisma.productItem.findUnique({
      where: {
        id: id,
      },
    });

    if (!item) return null;

    const parsedProduct: RepositoryProductItem = {
      id: item.id,
      price: Number(item.price),
      colorId: item.color_id,
      productId: item.product_id,
      sizeId: item.size_id,
      descount: item.descont,
    };

    return parsedProduct;
  }

  async findManyByProductId(productId: string) {
    const items = await prisma.productItem.findMany({
      where: {
        product_id: productId,
      },
    });

    const itemsMapped = items.map((item) => {
      return {
        id: item.id,
        price: Number(item.price),
        colorId: item.color_id,
        productId: item.product_id,
        sizeId: item.size_id,
        descount: item.descont,
      };
    });
    return itemsMapped;
  }
}
