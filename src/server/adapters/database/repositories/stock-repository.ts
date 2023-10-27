export interface RepositoryStock {
  id: string;
  productItemId: string;
  quantity: number;
}

export interface RepositoryCreateStock {
  productItemId: string;
  quantity: number;
}

export interface StockRepository {
  create: (data: RepositoryCreateStock) => Promise<void>;
  findMany: () => Promise<RepositoryStock[]>;
  findByProductItemId: (
    ProductItemId: string
  ) => Promise<RepositoryStock | null>;
  findById: (id: string) => Promise<RepositoryStock | null>;
}
