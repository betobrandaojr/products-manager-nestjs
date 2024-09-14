import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  CreateProductInputDto,
  CreateProductOutputDto,
  CreateProductUseCase,
} from 'src/core/product/application/use-case/product/create-project.use-case';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: CreateProductInputDto,
  ): Promise<CreateProductOutputDto> {
    return await this.createProductUseCase.execute(createProductDto);
  }
}
