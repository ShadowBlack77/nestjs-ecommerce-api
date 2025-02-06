import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CouponModule } from './coupon/coupon.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AnalyticsModule, 
    CartModule, 
    CouponModule, 
    PaymentsModule, 
    ProductsModule,
  ]
})
export class EcommerceModule {}
