import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BookEntity } from "src/books/entity/books.enity";
import { timestamp } from "rxjs";

@Entity('category')
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: 'timestamp', default: () => { return 'CURRENT_TIMESTAMP' } })
	created: Date;

	@OneToMany(() => BookEntity, book => book.category)
	books: BookEntity[];
}