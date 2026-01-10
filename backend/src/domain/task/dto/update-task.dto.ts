import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsOptional, IsString, IsUUID} from 'class-validator';

import {TaskDto} from './task.dto';

export class UpdateTaskDto implements Partial<TaskDto> {
    @IsString()
    @IsOptional()
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
