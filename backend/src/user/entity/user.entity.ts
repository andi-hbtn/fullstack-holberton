import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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
	phone: number;

	@Column()
	email: string;

	@Column({ default: 'user' })
	roles: string;

	@Column()
	password: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@OneToMany(() => OrderEntity, order => order.user)
	order: OrderEntity[]

	@Column({ nullable: true })
	passwordResetToken: string;

	@Column({ nullable: true })
	passwordResetExpires: Date;
}