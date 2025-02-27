import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { OrderEntity } from "src/order/entity/order.entity";

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@Column()
	email: string;

	@Column({ default: false })
	is_admin: boolean;

	@Column()
	password: string;

	@Column()
  	createdAt: Date;

	@OneToMany(()=>OrderEntity,order=>order.user)
	order:OrderEntity[]

}