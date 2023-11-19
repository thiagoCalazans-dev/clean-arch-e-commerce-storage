import { StockEntryDTO } from "../../dto/stock-entry-DTO";
import { StockRepository } from "@/server/aplication/database/repositories/stock-repository";
import { ResourceNotFoundError } from "../../error/ResourceNotFoundError";
import { Stock } from "@/server/enterprise/entities/stock";
import { EntryStockRepository } from "@/server/aplication/database/repositories/entry-stock-repository";
import { EntryStock } from "@/server/enterprise/entities/entry-stock";
import { StockOutRepository } from "../../database/repositories/stock-out-repository";
import { StockOut } from "@/server/enterprise/entities/stock-out";
import { StockOutDTO } from "../../dto/stock-out-dto";

export class StockOutUseCase {
  constructor(
    private stockRepository: StockRepository,
    private stockOutRepository: StockOutRepository
  ) {}

  async execute({ data }: StockOutDTO) {
    const stockOut = new StockOut(data);

    const stockProduct = await this.stockRepository.findByProductItemId(
      stockOut.productItemId
    );

    if (!stockProduct) throw new ResourceNotFoundError("produto não existe");

    const newStockQuantity = stockProduct.quantity - stockOut.quantity;

    if (newStockQuantity < 0)
      throw new Error("Estoque não possui essa quantidade");

    const newStock = new Stock(
      {
        productItemId: stockOut.productItemId,
        quantity: newStockQuantity,
      },
      stockProduct.id
    );

    await this.stockOutRepository.createStockOutAndUpdateStock(
      stockOut,
      newStock
    );
  }
}
