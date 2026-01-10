import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import {ProjectEntity} from '@/domain/project/entities/project.entity';
import {StatusEntity} from '@/domain/status/entities/status.entity';
import {UserEntity} from '@/domain/user/entities/user.entity';
import {BaseEntity} from '@/shared/typeorm/base.entity';

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @ManyToOne(() => ProjectEntity, p => p.tasks)
    @JoinColumn({name: 'project_id'})
    public project: ProjectEntity;

    @ManyToOne(() => UserEntity, u => u.users)
    @JoinColumn({name: 'assignee_id'})
    public assignee: UserEntity;

    @ManyToOne(() => StatusEntity, s => s.users)
    @JoinColumn({name: 'status_id'})
    public status: StatusEntity;

    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    @ApiProperty()
    public name: string;

    @Column({type: 'text', nullable: true})
    @ApiProperty()
    public description: string;

    @Column({type: 'timestamptz', nullable: true})
    @ApiProperty()
    public dueDate: Date;
}
