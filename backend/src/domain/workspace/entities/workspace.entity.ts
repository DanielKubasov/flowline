import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import {UserEntity} from '@/domain/user/entities/user.entity';
import {BaseEntity} from '@/shared/typeorm/base.entity';

@Entity({name: 'workspaces'})
export class WorkspaceEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, u => u.workspaces)
    @JoinColumn({name: 'owner_id'})
    public user: UserEntity;

    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    @ApiProperty()
    public name: string;

    @Column({type: 'varchar', length: 64, nullable: true})
    @ApiProperty()
    public description: string;
}
