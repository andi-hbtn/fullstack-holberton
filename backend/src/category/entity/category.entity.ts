import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductEntity } from "src/product/entity/products.enity";


@Entity('category')
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
	created: Date;

	@OneToMany(() => ProductEntity, product => product.category)
	products: ProductEntity[];

	@Column()
	image: string;
}