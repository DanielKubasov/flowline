import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query
} from '@nestjs/common';

import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {WorkspaceDto} from './dto/workspace.dto';
import {WorkspaceEntity} from './entities/workspace.entity';
import {WorkspaceService} from './workspace.service';

@Controller('workspaces')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public getAll(
        @Query() pageMetaDto: PageOptionsDto
    ): Promise<PageDto<WorkspaceEntity>> {
        return this.workspaceService.getAllWorkspaces(pageMetaDto);
    }

    @Get(':id')
    public getById(@Param('id') id: string): Promise<WorkspaceEntity> {
        return this.workspaceService.getWorkspaceById(id);
    }

    @Post()
    public createOne(@Body() dto: WorkspaceDto): Promise<WorkspaceEntity> {
        return this.workspaceService.createWorkspace(dto);
    }
}
