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

	@Column({ default: true })
	is_active: boolean;

	@ManyToOne(() => CategoryEntity, (category) => category.books, { cascade: true })
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@ManyToOne(() => AuthorEntity, (author) => author.books, { cascade: true })
	@JoinColumn({ name: 'author_id' })
	author: AuthorEntity;

	@Column({ name: 'author_id', nullable: false })
	author_id: number;

	@Column({ name: 'category_id', nullable: false })
	category_id: number;

	@Column()
	image: string;

}




