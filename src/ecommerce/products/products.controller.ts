import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/core/auth/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from './models';
import { Response } from 'express';

@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductsService) {}

  @Get('/')
  public getAll(@Query() paginationDto: PaginationDto) {
    return this.productService.getAll(paginationDto);
  }

  @Public()
  @Get('/featured')
  public getAllFeatured(@Res() res: Response, @Query() paginationDto: PaginationDto) {
    return this.productService.getAllFeatured(res, paginationDto);
  }

  @Get('/categories')
  public getAllCategories() {
    return this.productService.getAllCategories();
  }

  @Public()
  @Get('/category/:category')
  public getByCategory(@Param('category') category: any) {
    return this.productService.getByCategory(category);
  }

  @Public()
  @Get('/recommendations')
  public getAllRecommendations() {
    return this.productService.getAllRecommended();
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  public create(@Body() newProductRequest: any, @UploadedFile() file: any) {
    return this.productService.create(newProductRequest, file);
  }

  @Patch('/:id')
  public update(@Param('id', ParseIntPipe) id: number, @Body() updateProductRquest: any) {
    return this.productService.update(id, updateProductRquest);
  }

  @Patch('/featured/:id')
  public updateFeatured(@Param('id', ParseIntPipe) id: number) {
    return this.productService.toggleFeatured(id);
  }

  @Delete('/:id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
