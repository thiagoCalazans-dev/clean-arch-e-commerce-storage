import { prisma } from "../../prismadb";
import {
  BrandRepository,
  RepositoryBrand,
  RepositoryCreateBrand,
} from "../brand-repository";

export class PrismaBrandRepository implements BrandRepository {
  async update(data: RepositoryBrand) {
    await prisma.brand.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });
  }
  async remove(id: string) {
    await prisma.brand.delete({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string) {
    const brand = await prisma.brand.findUnique({
      where: {
        name: name,
      },
    });
    return brand;
  }
  async findById(id: string) {
    const brand = await prisma.brand.findUnique({
      where: {
        id,
      },
    });

    return brand;
  }

  async create(data: RepositoryCreateBrand) {
    await prisma.brand.create({
      data: {
        name: data.name,
      },
    });
  }

  async findMany() {
    const categories = prisma.brand.findMany();
    return categories;
  }

  async findBrandinInRelationships(brandId: string) {
    const brandExists = await prisma.product.findFirst({
      where: {
        brand_id: brandId,
      },
    });

    if (brandExists === null) return false;
    return true;
  }
}
