import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity} from 'typeorm';

import {BaseEntity} from '../../shared/typeorm/base.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @Column({type: 'varchar', length: 255, unique: true})
    @ApiProperty()
    public email: string;

    @Column({type: 'varchar', length: 255})
    @ApiProperty()
    public username: string;

    @Column({type: 'text'})
    @ApiProperty()
    public password: string;

    @Column({type: 'text'})
    @ApiProperty()
    public firstName: string;

    @Column({type: 'text'})
    @ApiProperty()
    public lastName: string;
}
