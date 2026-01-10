import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, OneToMany} from 'typeorm';

import {TaskEntity} from '@/domain/task/entities/task.entity';
import {UserEntity} from '@/domain/user/entities/user.entity';
import {BaseEntity} from '@/shared/typeorm/base.entity';

@Entity({name: 'statuses'})
export class StatusEntity extends BaseEntity {
    @OneToMany(() => TaskEntity, t => t.assignee)
    public users: UserEntity[];

    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    @ApiProperty()
    public name: string;

    @Column({type: 'text', nullable: true})
    @ApiProperty()
    public description: string;
}
