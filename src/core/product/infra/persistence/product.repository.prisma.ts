import { PrismaClient } from '@prisma/client';
import { Product } from '../../domain/entity/product';
import { ProductGateway } from '../../domain/gateway/product.gateway';

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient);
  }
  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prismaClient.product.create({
      data: data,
    });
    console.log('Product saved', data);
  }

  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

    const productList = products.map((product) => {
      const aProduct = Product.whit({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });

      return aProduct;
    });

    return productList;
  }
}
