import { ProductEntity } from "src/product/entity/products.enity";
export declare class CategoryEntity {
    id: number;
    name: string;
    description: string;
    created: Date;
    products: ProductEntity[];
}
