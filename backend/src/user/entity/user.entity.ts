import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { OrderEntity } from "src/order/entity/order.entity";

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column()
	email: string;

	@Column({ default: false })
	is_admin: boolean;

	@Column()
	password: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  	createdAt: Date;

	@OneToMany(()=>OrderEntity,order=>order.user)
	order:OrderEntity[]

}