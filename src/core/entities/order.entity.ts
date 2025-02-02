import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Cart } from "./cart.entity";

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User)
  readonly user: User;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinColumn()
  readonly cart: Cart;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  readonly totalAmount: number;

  @Column()
  readonly stripeSessionId: string;

  @Column()
  readonly status: string;

  @CreateDateColumn()
  readonly cratedAt: Date;
}