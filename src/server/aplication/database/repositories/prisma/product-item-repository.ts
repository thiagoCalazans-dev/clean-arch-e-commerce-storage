import { prisma } from "../../prismadb";
import {
  ProductItemRepository,
  RepositoryCreateProductItem,
  RepositoryProductItem,
} from "../product-item-repository";

export class PrismaProductItemRepository implements ProductItemRepository {
  async createAndStock(data: RepositoryCreateProductItem) {
    await prisma.$transaction(async (trx) => {
      await trx.productItem.create({
        data: {
          price: data.price,
          code: data.code,
          color_id: data.colorId,
          product_id: data.productId,
          size_id: data.sizeId,
          descont: data.descount,
        },
      });

      const productItemId = await trx.productItem.findUniqueOrThrow({
        where: {
          code: data.code,
        },
      });

      await trx.stock.create({
        data: {
          product_item_id: productItemId.id,
          quantity: 0,
        },
      });
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
        ProductImages: true,
      },
    });

    if (!item) return null;

    const productImagesMapped = item.ProductImages.map((image) => {
      return {
        id: image.id,
        productItemId: image.product_item_id,
        imageUrl: image.image_url,
      };
    });

    const parsedProduct = {
      id: item.id,
      code: item.code,
      price: Number(item.price),
      colorId: item.color_id,
      productId: item.product_id,
      sizeId: item.size_id,
      descount: item.descont,
      size: item.size,
      color: item.color,
      productImages: productImagesMapped,
    };

    return parsedProduct;
  }

  async findByCode(code: string) {
    const item = await prisma.productItem.findUnique({
      where: {
        code: code,
      },
      include: {
        ProductImages: true,
      },
    });

    if (!item) return null;

    const productImagesMapped = item.ProductImages.map((image) => {
      return {
        id: image.id,
        productItemId: image.product_item_id,
        imageUrl: image.image_url,
      };
    });

    const parsedProduct = {
      id: item.id,
      code: item.code,
      price: Number(item.price),
      colorId: item.color_id,
      productId: item.product_id,
      sizeId: item.size_id,
      descount: item.descont,
      productImages: productImagesMapped,
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
        ProductImages: true,
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

      const productImagesMapped = item.ProductImages.map((image) => {
        return {
          id: image.id,
          productItemId: image.product_item_id,
          imageUrl: image.image_url,
        };
      });

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
        productImages: productImagesMapped,
      };
    });
    return itemsMapped;
  }
}
