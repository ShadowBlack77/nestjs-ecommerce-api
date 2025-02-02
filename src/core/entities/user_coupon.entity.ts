import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Coupon } from "./coupon.entity";

@Entity()
export class UserCoupon {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User, (user) => user.coupons, { onDelete: 'CASCADE' })
  readonly user: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.users, { onDelete: 'CASCADE' })
  readonly coupon: Coupon;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  readonly assignedAt: Date;
}