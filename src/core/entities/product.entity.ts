import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart_item.entity";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  readonly price: number;

  @Column()
  readonly image: string;

  @Column()
  readonly category: string;

  @Column()
  readonly isFeatured: boolean;

  @OneToMany(() => CartItem, (cartItems) => cartItems.product)
  readonly cartItems: CartItem[];
}