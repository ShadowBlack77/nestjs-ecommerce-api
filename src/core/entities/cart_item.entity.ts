import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity()
export class CartItem {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  readonly cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: 'CASCADE' })
  readonly product: Product;

  @Column()
  readonly quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  readonly totalPrice: number;
}