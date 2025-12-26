import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, ManyToOne} from 'typeorm';

import {WorkspaceEntity} from '@/domain/workspace/entities/workspace.entity';
import {BaseEntity} from '@/shared/typeorm/base.entity';

@Entity({name: 'projects'})
export class ProjectEntity extends BaseEntity {
    @ManyToOne(() => WorkspaceEntity, w => w.projects)
    public workspace: WorkspaceEntity;

    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    @ApiProperty()
    public name: string;

    @Column({type: 'varchar', length: 64, nullable: true})
    @ApiProperty()
    public description: string;
}
