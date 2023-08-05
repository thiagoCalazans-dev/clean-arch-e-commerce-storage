export interface RepositoryCreateColor {
  name: string;
  value: string;
}

export interface RepositoryColor {
  id: string;
  name: string;
  value: string;
}

export interface ColorRepository {
  create: (data: RepositoryCreateColor) => Promise<void>;
  update: (data: RepositoryColor) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositoryColor[]>;
  findByName: (name: string) => Promise<RepositoryColor | null>;
  findByValue: (value: string) => Promise<RepositoryColor | null>;
  findById: (id: string) => Promise<RepositoryColor | null>;
}
