import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, User } from 'src/core/entities';
import { UserService } from 'src/core/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User])],
  providers: [CartService, UserService],
  controllers: [CartController]
})
export class CartModule {}
