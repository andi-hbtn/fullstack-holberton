import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { BookEntity } from "src/books/entity/books.enity";

@Entity('category')
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => BookEntity, book => book.category)
	books: BookEntity[];
}