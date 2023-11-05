import { prisma } from "../../prismadb";
import { ImageRepository, RepositoryCreateImage } from "../image-repository";

export class PrismaImageRepository implements ImageRepository {
  async remove(id: string) {
    await prisma.image.delete({
      where: {
        id: id,
      },
    });
  }

  async findByUrl(url: string) {
    const image = await prisma.image.findUnique({
      where: {
        url: url,
      },
    });
    return image;
  }

  async findById(id: string) {
    const image = await prisma.image.findUnique({
      where: {
        id: id,
      },
    });
    return image;
  }

  async create(data: RepositoryCreateImage) {
    await prisma.image.create({
      data: {
        name: data.name,
        url: data.url,
      },
    });
  }

  async findMany() {
    const images = prisma.image.findMany();
    return images;
  }
}
