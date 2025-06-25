import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CategoryEntity } from "src/category/entity/category.entity";
import { ProductColorImageEntity } from "./productColors.entity";

@Entity('products')
export class ProductEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ default: true })
	is_active: boolean;

	@OneToMany(() => ProductColorImageEntity, (colorImage) => colorImage.product, { cascade: true })
	colorImages: ProductColorImageEntity[];

	@ManyToOne(() => CategoryEntity, (category) => category.products)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@Column({ name: 'category_id', nullable: false })
	category_id: number;

	@Column()
	image: string;

}
