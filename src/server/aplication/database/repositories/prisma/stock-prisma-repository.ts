import { prisma } from "../../prismadb";
import { RepositoryStock, StockRepository } from "../stock-repository";

export class PrismaStockRepository implements StockRepository {
  async findMany() {
    const stock = await prisma.stock.findMany({
      include: {
        product_item: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            color: true,
            size: true,
          },
        },
      },
    });

    const stockMapper = stock.map((entry) => {
      return {
        id: entry.id,
        productItemId: entry.product_item_id,
        productItem: {
          id: entry.product_item.id,
          code: entry.product_item.code,
          price: Number(entry.product_item.price),
          color: entry.product_item.color,
          size: entry.product_item.size,
          descount: entry.product_item.descont,
          sizeId: entry.product_item.size_id,
          colorId: entry.product_item.color_id,
          productId: entry.product_item.product_id,
          product: {
            name: entry.product_item.product.name,
            category: entry.product_item.product.category,
            brand: entry.product_item.product.brand,
            brandId: entry.product_item.product.brand_id,
            categoryId: entry.product_item.product.category_id,
            description: entry.product_item.product.description,
            id: entry.product_item.product.id,
          },
        },
        quantity: entry.quantity,
      };
    });

    return stockMapper;
  }

  async findByProductItemId(productItemId: string) {
    const stock = await prisma.stock.findUnique({
      where: {
        product_item_id: productItemId,
      },
    });

    if (stock) {
      const mapper: RepositoryStock = {
        id: stock.id,
        productItemId: stock.product_item_id,
        quantity: stock.quantity,
      };

      return mapper;
    }

    return null;
  }
}
