import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('category')
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string
}