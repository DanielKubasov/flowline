import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {PageMetaDto} from '@/shared/dto/page-meta.dto';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {ProjectEntity} from '../project/entities/project.entity';

import {TaskDto} from './dto/task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {TaskEntity} from './entities/task.entity';
import {GetAllQueryDto} from './query/get-all-query.dto';

@Injectable()
export class TaskService {
    public constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>
    ) {}

    public async getAllTasks(
        pageOptionsDto: PageOptionsDto & GetAllQueryDto
    ): Promise<PageDto<TaskEntity>> {
        const tasks = await this.taskRepository.find({
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
            order: {
                createdAt: pageOptionsDto.order
            },
            where: [
                {
                    isActive: true,
                    ...(pageOptionsDto?.projectId && {
                        project: {id: pageOptionsDto.projectId}
                    })
                }
            ],
            relations: {project: true}
        });

        const itemCount = await this.taskRepository.count({
            where: [{isActive: true}, {isArchived: false}]
        });

        const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

        return new PageDto(tasks, pageMetaDto);
    }

    public async getTaskById(id: string): Promise<TaskEntity> {
        const existingEntity = await this.taskRepository.findOneBy({id});

        if (!existingEntity) {
            throw new NotFoundException('Task not found.');
        }

        return existingEntity;
    }

    public async createTask(dto: TaskDto): Promise<TaskEntity> {
        const existingEntity = await this.taskRepository.findOneBy({
            name: dto.name
        });

        if (existingEntity) {
            throw new ConflictException('Task with this name already exist.');
        }

        const existingProject = await this.projectRepository.findOneBy({
            id: dto.projectId
        });

        if (!existingProject) {
            throw new BadRequestException('Project not found.');
        }

        const newEntity = await this.taskRepository.save({
            ...dto,
            project: existingProject
        });

        return newEntity;
    }

    public async updateTask(
        dto: UpdateTaskDto,
        id: string
    ): Promise<TaskEntity> {
        const existingEntity = await this.taskRepository.findOneBy({id});

        if (!existingEntity) {
            throw new NotFoundException('Task not found.');
        }

        const updatedEntity = await this.taskRepository.save({
            ...existingEntity,
            ...dto
        });

        return updatedEntity;
    }

    public async deactivateTask(id: string): Promise<TaskEntity> {
        const existingEntity = await this.taskRepository.findOneBy({
            id,
            isActive: true
        });

        if (!existingEntity) {
            throw new NotFoundException('Task not found.');
        }

        await this.taskRepository.update({id}, {isActive: false});

        return existingEntity;
    }
}
