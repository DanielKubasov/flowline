import {ApiProperty} from '@nestjs/swagger';
import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID
} from 'class-validator';

import {TaskEntity} from '../entities/task.entity';

export class TaskDto implements Partial<TaskEntity> {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    public description: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public dueDate: Date;

    @IsUUID()
    @IsOptional()
    @ApiProperty()
    public assigneeId: string;

    @IsUUID()
    @IsOptional()
    @ApiProperty()
    public projectId: string;

    @IsUUID()
    @IsOptional()
    @ApiProperty()
    public statusId: string;
}
