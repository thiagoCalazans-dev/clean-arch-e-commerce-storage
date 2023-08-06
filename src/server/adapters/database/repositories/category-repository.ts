export interface RepositoryCreateCategory {
  name: string;
}

export interface RepositoryCategory {
  id: string;
  name: string;
}

export interface CategoryRepository {
  create: (data: RepositoryCreateCategory) => Promise<void>;
  update: (data: RepositoryCategory) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositoryCategory[]>;
  findByName: (name: string) => Promise<RepositoryCategory | null>;
  findById: (id: string) => Promise<RepositoryCategory | null>;
}
