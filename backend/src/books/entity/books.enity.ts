import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CategoryEntity } from "src/category/entity/category.entity";

@Entity('books')
export class BookEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column()
	is_active: boolean;

	@ManyToOne(() => CategoryEntity, (category) => category.books, { cascade: true })
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity
}