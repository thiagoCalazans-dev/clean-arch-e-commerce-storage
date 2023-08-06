export interface RepositoryCreateSize {
  name: string;
  value: string;
}

export interface RepositorySize {
  id: string;
  name: string;
  value: string;
}

export interface SizeRepository {
  create: (data: RepositoryCreateSize) => Promise<void>;
  update: (data: RepositorySize) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositorySize[]>;
  findByName: (name: string) => Promise<RepositorySize | null>;
  findByValue: (value: string) => Promise<RepositorySize | null>;
  findById: (id: string) => Promise<RepositorySize | null>;
}
