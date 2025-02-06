import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/create-checkout-session')
  public createCheckoutSession(@Req() req: Request, @Res() res: Response, @Body() checkoutRequest: any) {
    return this.paymentsService.createCheckoutSession(req, res, checkoutRequest);
  }

  @Post('/checkout-success')
  public checkoutSuccess(@Res() res: Response) {

  }
}
