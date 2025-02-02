import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from 'src/core/entities';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Product, Category])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
