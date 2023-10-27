import { StockEntryDTO } from "../dto/stock-entry-DTO";
import { StockRepository } from "@/server/adapters/database/repositories/stock-repository";
import { ResourceNotFoundError } from "../error/ResourceNotFoundError";
import { StockEntry } from "@/server/enterprise/entities/strock-entry";

import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { Stock } from "@/server/enterprise/entities/stock";
import { EntryStockRepository } from "@/server/adapters/database/repositories/entry-stock-repository";

export class EntryStockUseCase {
  constructor(
    private stockRepository: StockRepository,
    private entryRepository: EntryStockRepository,
    private productItemRepository: ProductItemRepository
  ) {}

  async execute({ data }: StockEntryDTO) {
    const entry = new StockEntry(data);

    const productItemExists = await this.productItemRepository.findById(
      entry.productItemId
    );

    if (!productItemExists)
      throw new ResourceNotFoundError("produto não existe");

    const stockProduct = await this.stockRepository.findByProductItemId(
      entry.productItemId
    );

    const defaultStock = new Stock({
      productItemId: entry.productItemId,
      quantity: 0,
    });

    if (!stockProduct) await this.stockRepository.create(defaultStock);

    const newStockQuantity = stockProduct!.quantity + entry.quantity;

    const newStock = new Stock(
      {
        productItemId: entry.productItemId,
        quantity: newStockQuantity,
      },
      stockProduct!.id
    );

    await this.entryRepository.createEntryAndUpdateStock(entry, newStock);
  }
}
