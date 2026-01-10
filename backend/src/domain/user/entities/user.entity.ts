import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, Index, OneToMany} from 'typeorm';

import {TaskEntity} from '@/domain/task/entities/task.entity';
import {WorkspaceEntity} from '@/domain/workspace/entities/workspace.entity';
import {BaseEntity} from '@/shared/typeorm/base.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @Column({type: 'varchar', length: 255, unique: true})
    @Index()
    @ApiProperty()
    public email: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    @Index()
    @ApiProperty()
    public username: string;

    @Column({type: 'text', nullable: false})
    @ApiProperty()
    public password: string;

    @Column({type: 'text', nullable: false})
    @ApiProperty()
    public firstName: string;

    @Column({type: 'text', nullable: false})
    @ApiProperty()
    public lastName: string;

    @OneToMany(() => WorkspaceEntity, w => w.user)
    public workspaces: WorkspaceEntity[];

    @OneToMany(() => TaskEntity, t => t.assignee)
    public users: UserEntity[];
}
