import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {StatusEntity} from '@/domain/status/entities/status.entity';
import {PageMetaDto} from '@/shared/dto/page-meta.dto';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {ProjectEntity} from '../project/entities/project.entity';
import {UserEntity} from '../user/entities/user.entity';

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
        private readonly projectRepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(StatusEntity)
        private readonly statusRepository: Repository<StatusEntity>
    ) {}

    public async getAllTasks(
        pageOptionsDto: PageOptionsDto & GetAllQueryDto
    ): Promise<PageDto<TaskEntity>> {
        const {take, page, projectId, assigneeId, order} = pageOptionsDto;

        const project = {project: {id: projectId}};
        const assignee = {assignee: {id: assigneeId}};

        const options = {
            isActive: true,
            isArchived: false,
            ...(projectId && project),
            ...(assigneeId && assignee)
        };

        const tasks = await this.taskRepository.find({
            take,
            skip: (page - 1) * take,
            order: {
                createdAt: order
            },
            where: [options],
            relations: {project: true, assignee: true, status: true}
        });

        const itemCount = await this.taskRepository.count({
            where: [options]
        });

        const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

        return new PageDto(tasks, pageMetaDto);
    }

    public async getTaskById(id: string): Promise<TaskEntity> {
        const existingEntity = await this.taskRepository.findOne({
            where: {id},
            relations: {
                assignee: true,
                project: true,
                status: true
            }
        });

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
        const existingEntity = await this.taskRepository.findOne({
            where: {id},
            relations: {
                assignee: true,
                status: true,
                project: true
            }
        });

        if (!existingEntity) {
            throw new NotFoundException('Task not found.');
        }

        let toInsert: {
            assignee?: UserEntity;
            project?: ProjectEntity;
            status?: StatusEntity;
        } = {};

        if (dto.assigneeId) {
            const existingAssignee = await this.userRepository.findOneBy({
                id: dto.assigneeId
            });

            if (!existingAssignee) {
                throw new NotFoundException('Assignee not found.');
            }

            toInsert = {...toInsert, assignee: existingAssignee};
        }

        if (dto.projectId) {
            const existingProject = await this.projectRepository.findOneBy({
                id: dto.projectId
            });

            if (!existingProject) {
                throw new NotFoundException('Project not found.');
            }

            toInsert = {...toInsert, project: existingProject};
        }

        if (dto.statusId) {
            const existingStatus = await this.statusRepository.findOneBy({
                id: dto.statusId
            });

            if (!existingStatus) {
                throw new NotFoundException('Status not found.');
            }

            toInsert = {...toInsert, status: existingStatus};
        }

        console.log(dto);

        const updatedEntity = await this.taskRepository.save({
            ...existingEntity,
            ...dto,
            ...(toInsert.assignee ? {assignee: toInsert.assignee} : {}),
            ...(toInsert.project ? {project: toInsert.project} : {}),
            ...(toInsert.status ? {status: toInsert.status} : {})
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
