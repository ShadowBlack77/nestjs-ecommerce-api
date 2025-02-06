import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Cart, CartItem, Category, Coupon, EmailTokens, LoginSession, Product, User, UserCoupon } from './core/entities';
import { Order } from './core/entities/order.entity';
import { CoreModule } from './core/core.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 2
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: "postgres",
      port: +process.env.PORT,
      entities: [User, EmailTokens, LoginSession, Cart, Product, CartItem, Order, UserCoupon, Coupon, Category],
      synchronize: true,
    }),
    CoreModule, EcommerceModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    }
  ]
})
export class AppModule {}
