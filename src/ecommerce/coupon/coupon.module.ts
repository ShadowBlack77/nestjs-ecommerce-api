import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, User } from 'src/core/entities';
import { UserService } from 'src/core/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, User])],
  controllers: [CouponController],
  providers: [CouponService, UserService]
})
export class CouponModule {}
