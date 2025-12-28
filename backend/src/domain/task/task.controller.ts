import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';

import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {TaskDto} from './dto/task.dto';
import {TaskEntity} from './entities/task.entity';
import {GetAllQueryDto} from './query/get-all-query.dto';
import {TaskService} from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    public getAll(
        @Query() query: PageOptionsDto & GetAllQueryDto
    ): Promise<PageDto<TaskEntity>> {
        return this.taskService.getAllTasks(query);
    }

    @Get(':id')
    public getOneById(@Param('id') id: string): Promise<TaskEntity> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    public createOne(@Body() dto: TaskDto): Promise<TaskEntity> {
        return this.taskService.createTask(dto);
    }

    @Patch(':id')
    public updateOne(
        @Param('id') id: string,
        @Body() dto: TaskDto
    ): Promise<TaskEntity> {
        return this.taskService.updateTask(dto, id);
    }

    @Delete(':id')
    public deactivateOne(@Param('id') id: string): Promise<TaskEntity> {
        return this.taskService.deactivateTask(id);
    }
}
