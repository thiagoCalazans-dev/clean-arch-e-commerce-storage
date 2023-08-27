import { ProductNotFoundError } from "@/server/aplication/error/ProductNotFoundError";
import { prisma } from "../../prismadb";
import {
  ProductRepository,
  RepositoryCreateProduct,
  RepositoryProduct,
} from "../product-repository";

export class PrismaProductRepository implements ProductRepository {
  async update(data: RepositoryProduct) {
    await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        brand_id: data.brandId,
        category_id: data.categoryId,
        code: data.code,
        cost: data.cost,
        trending: data.trending,
        description: data.description,
      },
    });
  }
  async remove(id: string) {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  async findByCode(code: string) {
    const product = await prisma.product.findUnique({
      where: {
        code: code,
      },
    });

    if (!product) return null;

    const parsedProduct: RepositoryProduct = {
      id: product.id,
      brandId: product.brand_id,
      categoryId: product.category_id,
      code: product.code,
      cost: Number(product.cost),
      description: product.description,
      name: product.name,
      trending: product.trending,
    };

    return parsedProduct;
  }
  async findByName(name: string) {
    const product = await prisma.product.findUnique({
      where: {
        name: name,
      },
    });

    if (!product) return null;

    const parsedProduct: RepositoryProduct = {
      id: product.id,
      brandId: product.brand_id,
      categoryId: product.category_id,
      code: product.code,
      cost: Number(product.cost),
      description: product.description,
      name: product.name,
      trending: product.trending,
    };

    return parsedProduct;
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) return null;

    const parsedProduct: RepositoryProduct = {
      id: product.id,
      brandId: product.brand_id,
      categoryId: product.category_id,
      code: product.code,
      cost: Number(product.cost),
      description: product.description,
      name: product.name,
      trending: product.trending,
    };

    return parsedProduct;
  }

  async create(data: RepositoryCreateProduct) {
    await prisma.product.create({
      data: {
        name: data.name,
        brand_id: data.brandId,
        category_id: data.categoryId,
        code: data.code,
        cost: data.cost,
        trending: data.trending,
        description: data.description,
      },
    });
  }

  async findMany() {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
      },
    });
    const productsMapped = products.map((product) => {
      return {
        id: product.id,
        brandId: product.brand_id,
        brand: product.brand,
        categoryId: product.category_id,
        category: product.category,
        code: product.code,
        cost: Number(product.cost),
        description: product.description,
        name: product.name,
        trending: product.trending,
      };
    });
    return productsMapped;
  }
}
