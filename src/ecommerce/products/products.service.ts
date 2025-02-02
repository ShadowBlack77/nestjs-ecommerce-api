import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/core/entities';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  public async getAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new NotFoundException("Products not found");
    }
  }

  public async getAllFeatured() {
    try {
      return await this.productRepository.find({
        where: {
          isFeatured: true
        }
      });
    } catch (error) {
      throw new NotFoundException("Featured products not found");
    }
  }

  public async create(newProductDto: any) {
    try {
      let cloudinaryResponse = null;

      if (newProductDto.image) {
        cloudinaryResponse = await cloudinary.uploader.upload(newProductDto.image, { folder: 'products' });
      }

      return await this.productRepository.save({
        ...newProductDto,
        image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
      });
    } catch (error) {
      throw new BadRequestException('Cannot create product');
    }
  }

  public async update(id: number, updateProductDto: any) {

  }

  public async delete(id: number) {

  }

  public async getAllRecommended() {

  }

  public async getByCategory(category: string) {

  }

  public async toggleFeatured(id: number) {

  }

  private async updateFeaturedCache() {
    
  }
}
