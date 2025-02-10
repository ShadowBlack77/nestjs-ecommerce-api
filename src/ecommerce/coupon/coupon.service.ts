import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Coupon } from 'src/core/entities';
import { UserService } from 'src/core/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {

  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>,
    private readonly userService: UserService
  ) {}

  public async get(req: Request | any, res: Response) {
    try {

      const user = await this.userService.findOne(req.user.id);

      const coupon = await this.couponRepository.findOneBy({
        users: user,
        isActive: true
      });

      return res.status(200).json({ coupon });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async validateCoupon(req: Request | any, res: Response, couponDto: any) {
    try {
      const code = couponDto.code;
      const user = await this.userService.findOne(req.user.id);

      const coupon = await this.couponRepository.findOneBy({
        code: code,
        users: user,
        isActive: true
      });

      if (!coupon) {
        throw new NotFoundException('Coupon not found');
      }

      if (coupon.expirationDate < new Date()) {
        await this.couponRepository.update(coupon, {
          isActive: false
        });

        throw new BadRequestException('Coupon Expired');
      }

      return res.status(200).json({
        content: 'Coupon is valid',
        code: coupon.code,
        discountPercentage: coupon.discountPercentage
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
