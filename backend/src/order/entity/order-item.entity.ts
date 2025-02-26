import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/product/entity/products.enity';

@Entity('orderItem')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.id, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @Column()
  order_id:number

  @ManyToOne(() => ProductEntity, (product) => product.id, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}