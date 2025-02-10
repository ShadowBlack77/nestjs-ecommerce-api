import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Request, Response } from 'express';

@Controller('coupon')
export class CouponController {

  constructor(private readonly couponService: CouponService) {}

  @Get('/')
  public get(@Req() req: Request, @Res() res: Response) {
    return this.couponService.get(req, res);
  }

  @Post('/vlaidate')
  public validate(@Req() req: Request, @Res() res: Response, @Body() couponRequest: any) {
    return this.couponService.validateCoupon(req, res, couponRequest);
  }
}
