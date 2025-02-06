import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Product } from 'src/core/entities';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { CategoryList } from './enum/category.enum';
import { RedisService } from 'src/core/redis/redis.service';
import { PaginationDto } from './models';
import { DEFAULT_PAGE_SIZE } from 'src/core/utils/constants';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly redisService: RedisService
  ) {}

  public async getAll(paginationDto: PaginationDto) {
    try {
      return await this.productRepository.find({
        skip: paginationDto.skip,
        take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
      });
    } catch (error) {
      throw new NotFoundException("Products not found");
    }
  }

  public async getAllFeatured(paginationDto: PaginationDto) {
    try {
      return await this.productRepository.find({
        skip: paginationDto.skip,
        take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
        where: {
          isFeatured: true
        }
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException("Featured products not found");
    }
  }

  public async create(newProductDto: any, file: any) {
    try {
      let cloudinaryResponse = null;

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      if (file) {
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
  
        cloudinaryResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          bufferStream.pipe(uploadStream);
        });
      }

      const selectedCategory = await this.categoryRepository.findOne({
        where: {
          name: newProductDto.category
        }
      });

      if (!selectedCategory) {
        throw new NotFoundException('Category not found');
      }

      return await this.productRepository.save({
        name: newProductDto.productName,
        description: newProductDto.description,
        price: newProductDto.price,
        category: selectedCategory,
        image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot create product');
    }
  }

  public async update(id: number, updateProductDto: any) {
    try {
      return this.productRepository.update({
        id
      }, {
        ...updateProductDto
      });
    } catch (error) {
      throw new BadRequestException('Cannot update product');
    }
  }

  public async delete(id: number) {

  }

  public async getAllRecommended() {
    try {
       return await this.productRepository.find({
        take: 5
       });
    } catch(error) {
      throw new NotFoundException('Recommended products not found');
    }
  }

  public async getByCategory(category: CategoryList) {
    try {

      const selectedCategory = await this.categoryRepository.findOne({
        where: {
          name: category
        }
      });

      if (!selectedCategory) {
        throw new NotFoundException('Category not found');
      }

      return await this.productRepository.find({
        where: {
          category: selectedCategory
        }
      })
    } catch (error) {
      throw new NotFoundException('Products with selected category was not found');
    }
  }

  public async toggleFeatured(id: number) {
    try {

      const product = await this.productRepository.findOneBy({ id });

      const feature = product.isFeatured;

      await this.productRepository.update({
        id
      }, {
        isFeatured: !feature
      });

      return { content: 'product now is featured' };
    } catch(error) {
      throw new BadRequestException('Cannot toggle featured of product');
    }
  }

  public async getAllCategories() {
    try {
      return await this.categoryRepository.find();
    } catch(error) {
      throw new NotFoundException('Categories not found');
    }
  }

  private async updateFeaturedCache() {
    
  }
}
