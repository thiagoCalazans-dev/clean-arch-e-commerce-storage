export interface RepositoryCreateCategory {
  name: string;
}

export interface RepositoryCategory {
  id: string;
  name: string;
}

export interface CategoryRepository {
  create: (data: RepositoryCreateCategory) => Promise<RepositoryCategory>;
  findMany: () => Promise<RepositoryCategory[]>;
}
