import { prisma } from "../../prismadb";
import {
  EntryStockRepository,
  RepositoryCreateEntryStock,
  RepositoryEntryStock,
} from "../entry-stock-repository";
import { RepositoryCreateStock } from "../stock-repository";

export class PrismaEntryStockRepository implements EntryStockRepository {
  async createEntryAndUpdateStock(
    entry: RepositoryCreateEntryStock,
    stock: RepositoryCreateStock
  ) {
    await prisma.$transaction(async (trx) => {
      await trx.entryStock.create({
        data: {
          date: entry.date,
          quantity: entry.quantity,
          value: entry.value,
          product_item_id: entry.productItemId,
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
    const entries = await prisma.entryStock.findMany();

    const entriesMapper: RepositoryEntryStock[] = entries.map((entry) => {
      return {
        id: entry.id,
        date: new Date(entry.date),
        productItemId: entry.product_item_id,
        quantity: entry.quantity,
        value: Number(entry.value),
      };
    });

    return entriesMapper;
  }

  async findManyByProductItemId(productItemId: string) {
    const entries = await prisma.entryStock.findMany({
      where: {
        product_item_id: productItemId,
      },
    });

    const entriesMapper: RepositoryEntryStock[] = entries.map((entry) => {
      return {
        id: entry.id,
        date: new Date(entry.date),
        productItemId: entry.product_item_id,
        quantity: entry.quantity,
        value: Number(entry.value),
      };
    });

    return entriesMapper;
  }
}
