import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column({
        unique: true,
        length: 10
    })
    vat: string;

    @Column({
        unique: true
    })
    email:string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

}