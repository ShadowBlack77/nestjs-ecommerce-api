import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserCoupon } from "./user_coupon.entity";

@Entity()
export class Coupon {
  
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly code: string;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  readonly discountPercentage: number;

  @Column({ type: 'timestamp' })
  readonly expirationDate: Date;

  @Column()
  readonly isActive: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.coupon)
  readonly users: UserCoupon[];
}