import { Entity, Column } from 'typeorm';
import { Person } from './utils/Person.entity';

@Entity('users')
export class User extends Person {

    @Column()
    password: string;

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;
    
}