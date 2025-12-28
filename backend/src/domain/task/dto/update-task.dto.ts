import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

import {TaskDto} from './task.dto';

export class UpdateTaskDto implements Partial<TaskDto> {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    public description: string;
}
