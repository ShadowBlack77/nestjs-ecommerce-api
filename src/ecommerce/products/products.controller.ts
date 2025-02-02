import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductsService) {}

  @Get('/')
  public getAll() {
    return this.productService.getAll();
  }

  @Get('/featured')
  public getAllFeatured() {
    return this.productService.getAllFeatured();
  }

  @Get('/category/:category')
  public getByCategory(@Param('category') category: string) {
    return this.productService.getByCategory(category);
  }

  @Get('/recommendations')
  public getAllRecommendations() {
    return this.getAllRecommendations();
  }

  @Post('/')
  public create(@Body() newProductRequest: any) {
    return this.productService.create(newProductRequest);
  }

  @Patch('/:id')
  public update(@Param('id', ParseIntPipe) id: number, @Body() updateProductRquest: any) {
    return this.productService.update(id, updateProductRquest);
  }

  @Patch('/featured/:id')
  public updateFeatured(@Param('id', ParseIntPipe) id: number) {
    return this.updateFeatured(id);
  }

  @Delete('/:id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.delete(id);
  }
}
