import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity('user_address')
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    vat_number: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    town: string;

    @Column()
    zipCode: string;

    @Column()
    street_address: string;

    @Column()
    appartment: string;

    @Column()
    message: string;
}