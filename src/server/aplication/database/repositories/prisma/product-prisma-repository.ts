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
      description: product.description,
      name: product.name,
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
      description: product.description,
      name: product.name,
    };

    return parsedProduct;
  }

  async findProductWithItems(productId: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        ProductItem: {
          include: {
            color: true,
            size: true,
            ProductImages: true,
          },
        },
        brand: true,
        category: true,
      },
    });

    if (!product) return null;

    const brandMapped = {
      id: product.brand.id,
      name: product.brand.name,
    };

    const categoryMapped = {
      id: product.category.id,
      name: product.category.name,
    };

    const productItemMapped = product.ProductItem.map((item) => {
      const colorMapped = {
        id: item.color.id,
        name: item.color.name,
        value: item.color.value,
      };

      const sizeMapped = {
        id: item.size.id,
        name: item.size.name,
        value: item.size.value,
      };

      const productImagesMapped = item.ProductImages.map((item) => {
        return {
          id: item.id,
          productItemId: item.product_item_id,
          imageUrl: item.image_url,
        };
      });

      return {
        id: item.id,
        productId: item.product_id,
        code: item.code,
        colorId: item.color_id,
        color: colorMapped,
        sizeId: item.size_id,
        size: sizeMapped,
        price: Number(item.price),
        descount: item.descont,
        productImages: productImagesMapped,
      };
    });

    const parsedProduct: RepositoryProduct = {
      id: product.id,
      brand: brandMapped,
      brandId: product.brand_id,
      category: categoryMapped,
      categoryId: product.category_id,
      description: product.description,
      name: product.name,
      productItem: productItemMapped,
    };

    return parsedProduct;
  }

  async create(data: RepositoryCreateProduct) {
    await prisma.product.create({
      data: {
        name: data.name,
        brand_id: data.brandId,
        category_id: data.categoryId,
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
        description: product.description,
        name: product.name,
      };
    });
    return productsMapped;
  }
}
