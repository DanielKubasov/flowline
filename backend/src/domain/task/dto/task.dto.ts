import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

import {TaskEntity} from '../entities/task.entity';

export class TaskDto implements Partial<TaskEntity> {
    @IsUUID()
    @IsNotEmpty()
    public projectId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    public description: string;
}
