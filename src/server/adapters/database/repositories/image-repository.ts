export interface RepositoryCreateImage {
  name: string;
  url: string;
}

export interface RepositoryImage {
  id: string;
  name: string;
  url: string;
}

export interface ImageRepository {
  create: (data: RepositoryCreateImage) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositoryImage[]>;
  findByUrl: (url: string) => Promise<RepositoryImage | null>;
  findById: (url: string) => Promise<RepositoryImage | null>;
}
