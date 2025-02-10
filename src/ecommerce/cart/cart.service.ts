import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Cart } from 'src/core/entities';
import { UserService } from 'src/core/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

  constructor (
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService
  ) {}

  public async getProducts(req: Request | any, res: Response) {
    try {
      const userId = req.user.id;
      const user = await this.userService.findOne(userId);

      const cart = await this.cartRepository.findOneBy({
        user: user
      });

      const products = cart.items;

      return res.status(200).json(products);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async addToCart(req: Request | any, res: Response, cartDto: any) {
    try {
      const productId = cartDto.id;
      const userId = req.user.id;

      const user = await this.userService.findOne(userId);

      const cart = await this.cartRepository.findOne({
        where: {
          user: user
        },
        relations: ['items']
      });

      const existingItem = cart.items.find((item: any) => item.id === productId);

      if (existingItem) {
        
      } else {

      }

      return res.status(200).json({ content: 'Product added' });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async removeFromCart(req: Request, res: Response, cartDto: any) {

  }

  public async updateQuantity(req: Request, res: Response, cartDto: any, id: string) {

  }
}
