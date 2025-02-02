import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CartItem } from "./cart_item.entity";
import { Order } from "./order.entity";

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  readonly id: number;
  
  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  readonly user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  readonly items: CartItem[];

  @OneToOne(() => Order, (order) => order.cart)
  readonly order: Order
}