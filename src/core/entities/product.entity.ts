import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart_item.entity";
import { Category } from "./category.entity";

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

  @Column({ default: false })
  readonly isFeatured: boolean;

  @OneToMany(() => CartItem, (cartItems) => cartItems.product)
  readonly cartItems: CartItem[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  readonly category: Category;
}