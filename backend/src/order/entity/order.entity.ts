import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ProductEntity } from "src/product/entity/products.enity";
import { OrderItem } from "./order-item.entity";
import { UserEntity } from "src/user/entity/user.entity";

@Entity('order')
export class OrderEntity {
	@PrimaryGeneratedColumn()
	id: number;
  
	@ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
	user: UserEntity;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
	orderItems: OrderItem[];

	@Column('decimal', { precision: 10, scale: 2 })
	totalPrice: number;
  
	@Column({ type: 'enum', enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
	status: string;
  
	@Column()
	createdAt: Date;
}