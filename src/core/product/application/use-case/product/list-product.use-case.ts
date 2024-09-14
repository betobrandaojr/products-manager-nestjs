import { ProductGateway } from 'src/core/product/domain/gateway/product.gateway';
import { UseCaseCommand } from '../use-case.comand';
import { Product } from 'src/core/product/domain/entity/product';

export type ListProductOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListPorductsUseCase
  implements UseCaseCommand<void, ListProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway): ListPorductsUseCase {
    return new ListPorductsUseCase(productGateway);
  }

  public async execute(): Promise<ListProductOutputDto> {
    const aProducts = await this.productGateway.list();

    const output = this.presenterOutput(aProducts);

    return output;
  }

  presenterOutput(products: Product[]): ListProductOutputDto {
    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        };
      }),
    };
  }
}
