import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, User } from 'src/core/entities';
import { UserService } from 'src/core/user/user.service';
import { Order } from 'src/core/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, User, Order])
  ],
  providers: [PaymentsService, UserService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
