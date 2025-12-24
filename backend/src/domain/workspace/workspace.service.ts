import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {PageMetaDto} from '@/shared/dto/page-meta.dto';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {WorkspaceDto} from './dto/workspace.dto';
import {WorkspaceEntity} from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
    public constructor(
        @InjectRepository(WorkspaceEntity)
        private readonly workspaceRepository: Repository<WorkspaceEntity>
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
            where: [{isActive: true}, {isArchived: false}]
        });

        const itemCount = await this.workspaceRepository.count({
            where: [{isActive: true}, {isArchived: false}]
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

    public async createWorkspace(dto: WorkspaceDto): Promise<WorkspaceEntity> {
        const old = await this.workspaceRepository.findOne({
            where: {name: dto.name}
        });

        if (old) {
            throw new ConflictException(
                'Workspace with this name already exist.'
            );
        }

        const workspace = await this.workspaceRepository.save(dto);

        return workspace;
    }
}
