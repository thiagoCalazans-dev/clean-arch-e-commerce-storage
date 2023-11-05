import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryStockRepository } from "../../database/repositories/in-memory-repositories/stock-in-memory-repository";
import { GetStocksUseCase } from "./get-stocks-use-case";

let repository: InMemoryStockRepository;
let sut: GetStocksUseCase;

describe("test Get StocksUseCase", () => {
  beforeEach(async () => {
    repository = new InMemoryStockRepository();
    sut = new GetStocksUseCase(repository);

    await repository.create({ productItemId: "a71h23831", quantity: 1 });
  });

  it("should fetch all Stocks", async () => {
    const stocks = await sut.execute();
    expect(stocks.data).toHaveLength(1);
    expect(stocks.data[0].productItemId).toBe("a71h23831");
  });
});
