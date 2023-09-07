import { Item } from "@radix-ui/react-dropdown-menu";
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
        code: data.code,
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
      include: {
        size: true,
        color: true,
      },
    });

    if (!item) return null;

    const parsedProduct: RepositoryProductItem = {
      id: item.id,
      code: item.code,
      price: Number(item.price),
      colorId: item.color_id,
      productId: item.product_id,
      sizeId: item.size_id,
      descount: item.descont,
      size: item.size,
      color: item.color,
    };

    return parsedProduct;
  }

  async findByCode(code: string) {
    const item = await prisma.productItem.findUnique({
      where: {
        code: code,
      },
    });

    if (!item) return null;

    const parsedProduct: RepositoryProductItem = {
      id: item.id,
      code: item.code,
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
      include: {
        color: true,
        size: true,
      },
    });

    const itemsMapped = items.map((item) => {
      const colorMapped = {
        id: item.color.id,
        name: item.color.name,
        value: item.color.value,
      };

      const sizeMapped = {
        id: item.size.id,
        name: item.size.name,
        value: item.size.value,
      };

      return {
        id: item.id,
        code: item.code,
        price: Number(item.price),
        colorId: item.color_id,
        color: colorMapped,
        productId: item.product_id,
        sizeId: item.size_id,
        size: sizeMapped,
        descount: item.descont,
      };
    });
    return itemsMapped;
  }
}
