import {Column, Entity} from 'typeorm';

import {BaseEntity} from '../../infrastructure/typeorm/base.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @Column({type: 'varchar', length: 255, unique: true})
    public email: string;

    @Column({type: 'varchar', length: 255})
    public username: string;

    @Column({type: 'text'})
    public password: string;

    @Column({type: 'text'})
    public firstName: string;

    @Column({type: 'text'})
    public lastName: string;
}
