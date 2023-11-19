import { prisma } from "../../prismadb";
import {
  RepositoryCreateStockOut,
  RepositoryStockOut,
  StockOutRepository,
} from "../stock-out-repository";
import { RepositoryCreateStock } from "../stock-repository";

export class PrismaStockOutRepository implements StockOutRepository {
  async createStockOutAndUpdateStock(
    stockOut: RepositoryCreateStockOut,
    stock: RepositoryCreateStock
  ) {
    await prisma.$transaction(async (trx) => {
      await trx.stockOut.create({
        data: {
          date: stockOut.date,
          quantity: stockOut.quantity,
          price: stockOut.price,
          discount: stockOut.discount,
          product_item_id: stockOut.productItemId,
        },
      });

      await trx.stock.update({
        where: {
          product_item_id: stock.productItemId,
        },
        data: {
          quantity: stock.quantity,
        },
      });
    });
  }
  async findMany() {
    const stockOuts = await prisma.stockOut.findMany();

    const dataMapper: RepositoryStockOut[] = stockOuts.map((data) => {
      return {
        id: data.id,
        date: new Date(data.date),
        productItemId: data.product_item_id,
        quantity: data.quantity,
        price: Number(data.price),
        discount: Number(data.discount),
      };
    });

    return dataMapper;
  }

  async findManyByProductItemId(productItemId: string) {
    const stockOuts = await prisma.stockOut.findMany({
      where: {
        product_item_id: productItemId,
      },
    });

    const dataMapper: RepositoryStockOut[] = stockOuts.map((data) => {
      return {
        id: data.id,
        date: new Date(data.date),
        productItemId: data.product_item_id,
        quantity: data.quantity,
        price: Number(data.price),
        discount: Number(data.discount),
      };
    });
    return dataMapper;
  }
}
