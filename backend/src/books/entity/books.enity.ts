import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
	is_active: boolean
}