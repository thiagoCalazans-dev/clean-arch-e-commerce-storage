import { prisma } from "../../prismadb";
import {
  SizeRepository,
  RepositorySize,
  RepositoryCreateSize,
} from "../size-repository";

export class PrismaSizeRepository implements SizeRepository {
  async update(data: RepositorySize) {
    await prisma.size.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        value: data.value,
      },
    });
  }
  async remove(id: string) {
    await prisma.size.delete({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string) {
    const size = await prisma.size.findUnique({
      where: {
        name: name,
      },
    });
    return size;
  }

  async findByValue(value: string) {
    const size = await prisma.size.findUnique({
      where: {
        value: value,
      },
    });
    return size;
  }

  async findById(id: string) {
    const size = await prisma.size.findUnique({
      where: {
        id,
      },
    });

    return size;
  }

  async create(data: RepositoryCreateSize) {
    await prisma.size.create({
      data: {
        name: data.name,
        value: data.value,
      },
    });
  }

  async findMany() {
    const categories = prisma.size.findMany();
    return categories;
  }
}
