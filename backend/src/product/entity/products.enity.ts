import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CategoryEntity } from "src/category/entity/category.entity";
import { OrderItemEntity } from "src/order/entity/order_item.entity";
import { ProductColorImageEntity } from "./productColors.entity";

@Entity('products')
export class ProductEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column()
	stock: number;

	@Column({ default: true })
	is_active: boolean;

	@OneToMany(() => ProductColorImageEntity, (colorImage) => colorImage.product, { cascade: true })
	colorImages: ProductColorImageEntity[];

	@ManyToOne(() => CategoryEntity, (category) => category.products, { cascade: true })
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@Column()
	image: string;

	@Column({ name: 'category_id', nullable: false })
	category_id: number;

}
