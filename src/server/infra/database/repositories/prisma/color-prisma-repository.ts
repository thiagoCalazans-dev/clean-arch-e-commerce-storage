import { prisma } from "../../prismadb";
import {
  ColorRepository,
  RepositoryColor,
  RepositoryCreateColor,
} from "../color-repository";

export class PrismaColorRepository implements ColorRepository {
  async update(data: RepositoryColor) {
    await prisma.color.update({
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
    await prisma.color.delete({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string) {
    const color = await prisma.color.findUnique({
      where: {
        name: name,
      },
    });
    return color;
  }

  async findByValue(value: string) {
    const color = await prisma.color.findUnique({
      where: {
        value: value,
      },
    });
    return color;
  }

  async findById(id: string) {
    const color = await prisma.color.findUnique({
      where: {
        id,
      },
    });

    return color;
  }

  async create(data: RepositoryCreateColor) {
    await prisma.color.create({
      data: {
        name: data.name,
        value: data.value,
      },
    });
  }

  async findMany() {
    const categories = prisma.color.findMany();
    return categories;
  }
}
