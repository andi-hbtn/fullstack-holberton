import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { BookEntity } from "src/books/entity/books.enity";

@Entity('authors')
export class AuthorEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@OneToMany(() => BookEntity, book => book.author)
	books: BookEntity[]
}