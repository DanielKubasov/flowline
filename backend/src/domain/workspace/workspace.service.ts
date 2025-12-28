import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {PageMetaDto} from '@/shared/dto/page-meta.dto';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {UserEntity} from '../user/entities/user.entity';

import {WorkspaceDto} from './dto/workspace.dto';
import {WorkspaceEntity} from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
    public constructor(
        @InjectRepository(WorkspaceEntity)
        private readonly workspaceRepository: Repository<WorkspaceEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async getAllWorkspaces(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<WorkspaceEntity>> {
        const workspaces = await this.workspaceRepository.find({
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
            order: {
                createdAt: pageOptionsDto.order
            },
            where: [{isActive: true, isArchived: false}],
            relations: {
                user: true
            }
        });

        const itemCount = await this.workspaceRepository.count({
            where: [{isActive: true, isArchived: false}]
        });
        const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

        return new PageDto(workspaces, pageMetaDto);
    }

    public async getWorkspaceById(id: string): Promise<WorkspaceEntity> {
        const workspace = await this.workspaceRepository.findOne({
            where: {id}
        });

        if (!workspace) {
            throw new NotFoundException('Workspace not found.');
        }

        return workspace;
    }

    public async createWorkspace(
        dto: WorkspaceDto,
        userId: string
    ): Promise<WorkspaceEntity> {
        const old = await this.workspaceRepository.findOne({
            where: {name: dto.name}
        });

        if (old) {
            throw new ConflictException(
                'Workspace with this name already exist.'
            );
        }

        const user = await this.userRepository.findOneBy({id: userId});

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const workspace = await this.workspaceRepository.save({
            ...dto,
            user
        });

        return workspace;
    }

    public async updateWorkspace(
        dto: WorkspaceDto,
        id: string
    ): Promise<WorkspaceEntity> {
        const old = await this.workspaceRepository.findOneBy({id});

        if (!old) {
            throw new NotFoundException('Workspace not found.');
        }

        const data = {...old, ...dto};

        await this.workspaceRepository.save(data);

        return data;
    }

    public async deactivateWorkspace(id: string): Promise<WorkspaceEntity> {
        const workspace = await this.workspaceRepository.findOneBy({id});

        if (!workspace) {
            throw new NotFoundException('Workspace not found.');
        }

        await this.workspaceRepository.delete({id});

        return workspace;
    }
}
