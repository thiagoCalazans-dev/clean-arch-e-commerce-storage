export interface RepositoryCreateBrand {
  name: string;
}

export interface RepositoryBrand {
  id: string;
  name: string;
}

export interface BrandRepository {
  create: (data: RepositoryCreateBrand) => Promise<void>;
  update: (data: RepositoryBrand) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositoryBrand[]>;
  findByName: (name: string) => Promise<RepositoryBrand | null>;
  findById: (id: string) => Promise<RepositoryBrand | null>;
  findBrandinInRelationships: (brandId: string) => Promise<boolean>;
}
