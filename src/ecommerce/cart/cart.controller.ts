import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {

  constructor (private readonly cartService: CartService) {}

  @Get('/')
  public getProducts(@Req() req: Request, @Res() res: Response) {
    return this.cartService.getProducts(req, res);
  }

  @Post('/')
  public addToCart(@Req() req: Request, @Res() res: Response, @Body() cartRequest: any) {
    return this.cartService.addToCart(req, res, cartRequest);
  }

  @Delete('/')
  public removeFromCart(@Req() req: Request, @Res() res: Response, @Body() cartRequest: any) {
    return this.cartService.removeFromCart(req, res, cartRequest);
  } 

  @Put('/:id')
  public updateQuantity(@Req() req: Request, @Res() res: Response, @Body() cartRequest: any, @Param('id') id: string) {
    return this.cartService.updateQuantity(req, res, cartRequest, id);
  }
}
