import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { CategoryList } from "src/ecommerce/products/enum/category.enum";

@Entity()
export class Category {
  
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    type: 'enum',
    enum: CategoryList,
    default: CategoryList.JAVASCRIPT,
    enumName: 'category_list_enum'
  })
  readonly name: CategoryList;

  @OneToMany(() => Product, (product) => product.category)
  readonly products: Product[]
}