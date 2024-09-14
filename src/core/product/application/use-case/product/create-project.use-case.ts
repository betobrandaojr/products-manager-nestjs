import { ProductGateway } from 'src/core/product/domain/gateway/product.gateway';
import { UseCaseCommand } from '../use-case.comand';
import { Product } from 'src/core/product/domain/entity/product';

export type CreateProductInputDto = {
  name: string;
  price: number;
};

export type CreateProductOutputDto = {
  id: string;
};

export class CreateProductUseCase
  implements UseCaseCommand<CreateProductInputDto, CreateProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway): CreateProductUseCase {
    return new CreateProductUseCase(productGateway);
  }

  public async execute({
    name,
    price,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const aProduct = Product.create(name, price);

    await this.productGateway.save(aProduct);

    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id,
    };

    return output;
  }
}
