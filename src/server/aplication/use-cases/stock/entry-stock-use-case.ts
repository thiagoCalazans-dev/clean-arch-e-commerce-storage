import { StockEntryDTO } from "../../dto/stock-entry-DTO";
import { StockRepository } from "@/server/adapters/database/repositories/stock-repository";
import { ResourceNotFoundError } from "../../error/ResourceNotFoundError";
import { Stock } from "@/server/enterprise/entities/stock";
import { EntryStockRepository } from "@/server/adapters/database/repositories/entry-stock-repository";
import { EntryStock } from "@/server/enterprise/entities/entry-stock";

export class EntryStockUseCase {
  constructor(
    private stockRepository: StockRepository,
    private entryRepository: EntryStockRepository
  ) {}

  async execute({ data }: StockEntryDTO) {
    const entry = new EntryStock(data);

    const stockProduct = await this.stockRepository.findByProductItemId(
      entry.productItemId
    );

    if (!stockProduct) throw new ResourceNotFoundError("produto não existe");

    const newStockQuantity = stockProduct.quantity + entry.quantity;

    const newStock = new Stock(
      {
        productItemId: entry.productItemId,
        quantity: newStockQuantity,
      },
      stockProduct.id
    );

    await this.entryRepository.createEntryAndUpdateStock(entry, newStock);
  }
}
