import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Cart, CartItem, Category, Coupon, EmailTokens, LoginSession, Product, User, UserCoupon } from './core/entities';
import { Order } from './core/entities/order.entity';
import { ProductsModule } from './ecommerce/products/products.module';
import { LoginSessionModule } from './core/login-session/login-session.module';
import { MailsModule } from './core/mails/mails.module';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { PaymentsModule } from './ecommerce/payments/payments.module';
import { CartModule } from './ecommerce/cart/cart.module';
import { CouponModule } from './ecommerce/coupon/coupon.module';
import { AnalyticsModule } from './ecommerce/analytics/analytics.module';

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
    UserModule, AuthModule, MailsModule, LoginSessionModule, ProductsModule, PaymentsModule, CartModule, CouponModule, AnalyticsModule
  ],
})
export class AppModule {}
