import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {WorkspaceEntity} from '@/domain/workspace/entities/workspace.entity';
import {PageMetaDto} from '@/shared/dto/page-meta.dto';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {ProjectDto} from './dto/project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {ProjectEntity} from './entities/project.entity';

@Injectable()
export class ProjectService {
    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
        @InjectRepository(WorkspaceEntity)
        private readonly workspaceRepository: Repository<WorkspaceEntity>
    ) {}

    public async getAllProjects(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<ProjectEntity>> {
        const projects = await this.projectRepository.find({
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
            order: {
                createdAt: pageOptionsDto.order
            },
            where: [{isActive: true, isArchived: false}],
            relations: {workspace: true}
        });

        const itemCount = await this.projectRepository.count({
            where: [{isActive: true}, {isArchived: false}]
        });

        const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

        return new PageDto(projects, pageMetaDto);
    }

    public async getProjectById(id: string): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOneBy({id});

        if (!project) {
            throw new NotFoundException('Project not found.');
        }

        return project;
    }

    public async createProject(dto: ProjectDto): Promise<ProjectEntity> {
        const existingEntity = await this.projectRepository.findOne({
            where: [{name: dto.name}]
        });

        const existingWorkspace = await this.workspaceRepository.findOneBy({
            id: dto.workspaceId
        });

        if (existingEntity) {
            throw new ConflictException(
                'Project with this name already exists.'
            );
        }

        if (!existingWorkspace) {
            throw new NotFoundException('Workspace not found.');
        }

        const createdEntity = await this.projectRepository.save({
            ...dto,
            workspace: existingWorkspace
        });

        return createdEntity;
    }

    public async updateProject(
        dto: UpdateProjectDto,
        id: string
    ): Promise<ProjectEntity> {
        const existingEntity = await this.projectRepository.findOneBy({id});

        if (!existingEntity) {
            throw new NotFoundException('Project not found.');
        }

        const updatedEntity = await this.projectRepository.save({
            ...existingEntity,
            ...dto
        });

        return updatedEntity;
    }

    public async deactivateProject(id: string): Promise<ProjectEntity> {
        const existingEntity = await this.projectRepository.findOneBy({id});

        if (!existingEntity) {
            throw new NotFoundException('Project not found.');
        }

        await this.projectRepository.delete({id});

        return existingEntity;
    }
}
