import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import {ProjectEntity} from '@/domain/project/entities/project.entity';
import {BaseEntity} from '@/shared/typeorm/base.entity';

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @ManyToOne(() => ProjectEntity, p => p.tasks)
    @JoinColumn({name: 'project_id'})
    public project: ProjectEntity;

    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    @ApiProperty()
    public name: string;

    @Column({type: 'varchar', length: 64, nullable: true})
    @ApiProperty()
    public description: string;
}
