import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CategoryEntity } from "src/category/entity/category.entity";
import { AuthorEntity } from "src/author/entity/author.entity";

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
	category: CategoryEntity;

	@ManyToOne(() => AuthorEntity, (author) => author.books, { cascade: true })
	@JoinColumn({ name: 'author_id' })
	author: AuthorEntity;

}