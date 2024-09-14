import { Module } from '@nestjs/common';
import { ProductController } from './infra/api/controller/product.controller';
import { PrismaClient } from '@prisma/client';
import { ProductRepositoryPrisma } from './infra/persistence/product.repository.prisma';
import { CreateProductUseCase } from './application/use-case/product/create-project.use-case';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductGateway',
      useFactory: (prismaClient: PrismaClient) =>
        ProductRepositoryPrisma.create(prismaClient),
      inject: [PrismaClient],
    },
    {
      provide: CreateProductUseCase,
      useFactory: (productGateway: ProductRepositoryPrisma) =>
        CreateProductUseCase.create(productGateway),
      inject: ['ProductGateway'],
    },
    PrismaClient,
  ],
})
export class ProductModule {}
