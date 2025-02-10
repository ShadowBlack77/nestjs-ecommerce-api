import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Coupon } from 'src/core/entities';
import { Order } from 'src/core/entities/order.entity';
import { UserService } from 'src/core/user/user.service';
import { Stripe } from 'stripe';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {

  private stripe: Stripe;

  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  public async createCheckoutSession(req: Request | any, res: Response, checkoutDto: any) {
    try {

      const user = await this.userService.findOne(req.user.id);

      if (!user) {
        throw new UnauthorizedException('User not found')
      }

      const { products, couponCode } = checkoutDto;

      if (!Array.isArray(products) || products.length === 0) {
        throw new BadRequestException('Invalid or empty products array')
      }

      let totalAmount: number = 0;

      const lineItems = products.map((product) => {
        const amount = Math.round(product.price * 100);

        totalAmount += amount * product.quantity;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: amount,
          },
          quantity: product.quantity || 1,
        };
      });

      let coupon = null;

      if (couponCode) {
        coupon = await this.couponRepository.findOneBy({
          code: couponCode,
          isActive: true,
          users: user
        });

        if (coupon) {
          totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
        }
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
        discounts: coupon ? [
          {
            coupon: await this.createStripeCoupon(coupon.discountPercentage)
          }
        ]: [],
        metadata: {
          userId: user.id.toString(),
          couponCode: couponCode || "",
          products: JSON.stringify(
            products.map((p) => ({
              id: p.id,
              quantity: p.quantity,
              price: p.price
            }))
          )
        }
      });

      if (totalAmount >= 20000) {
        await this.createNewCoupon(req.user._id);
      }

      return res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async checkoutSession(req: Request, res: Response, sessionDto: any) {
    try {
      const sessionId = sessionDto.sessionId;
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        const user = await this.userService.findOne(parseInt(session.metadata!.userId));

        if (session.metadata!.couponCode) {

          const coupon = await this.couponRepository.findOneBy({
            code: session.metadata!.couponCode,
            users: user
          });

          await this.couponRepository.update(coupon, {
            isActive: false
          });
        }

        const products = JSON.parse(session.metadata!.products);

        const newOrder = await this.orderRepository.save({
          user: user,
          cart: products.map((product: any) => ({
            product: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
          totalAmount: session.amount_total! / 100,
          stripeSessionId: sessionId
        });

        return res.status(200).json({
          success: true,
          content: "Payment successful, order created, and coupon deactivated if used.",
          orderId: newOrder.id,
        })
      }
    } catch (error) {
      
    }
  }

  private async createStripeCoupon(discountPercentage: number) {
    const coupon = await this.stripe.coupons.create({
      percent_off: discountPercentage,
      duration: 'once'
    });

    return coupon.id;
  }

  private async createNewCoupon(userId: string) {

    const user = await this.userService.findOne(+userId);

    const coupon = await this.couponRepository.findOneBy({ users: user });
    await this.couponRepository.delete(coupon);

    const newCoupon = await this.couponRepository.save({
      code: `GIFT ${ Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return newCoupon;
  }
}
