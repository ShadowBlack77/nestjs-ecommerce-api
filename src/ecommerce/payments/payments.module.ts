import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, User } from 'src/core/entities';
import { UserService } from 'src/core/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, User])
  ],
  providers: [PaymentsService, UserService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
