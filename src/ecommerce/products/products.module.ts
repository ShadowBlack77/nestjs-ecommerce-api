import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from 'src/core/entities';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { RedisService } from 'src/core/redis/redis.service';
import { RedisModule } from 'src/core/redis/redis.module';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Product, Category]),
    RedisModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, RedisService]
})
export class ProductsModule {}
