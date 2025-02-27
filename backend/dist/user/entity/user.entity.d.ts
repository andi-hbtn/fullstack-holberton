import { OrderEntity } from "src/order/entity/order.entity";
export declare class UserEntity {
    id: number;
    name: string;
    lastname: string;
    email: string;
    is_admin: boolean;
    password: string;
    createdAt: Date;
    order: OrderEntity[];
}
