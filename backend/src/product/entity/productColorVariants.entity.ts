// src/product/entity/product_color_image.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './products.entity';

@Entity('product_color_variants')
export class ProductColorVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    stock: number;

    @Column()
    color: string;

    @Column()
    color_image: string;

    @Column()
    product_color_image: string;

    @ManyToOne(() => ProductEntity, (product) => product.colorVariants, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column()
    product_id: number;
}
