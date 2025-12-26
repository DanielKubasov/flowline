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

import {ProjectDto} from './dto/project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {ProjectEntity} from './entities/project.entity';
import {ProjectService} from './project.service';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    public getAll(
        @Query() query: PageOptionsDto
    ): Promise<PageDto<ProjectEntity>> {
        return this.projectService.getAllProjects(query);
    }

    @Get(':id')
    public getOneById(@Param('id') id: string): Promise<ProjectEntity> {
        return this.projectService.getProjectById(id);
    }

    @Post()
    public createOne(@Body() dto: ProjectDto): Promise<ProjectEntity> {
        return this.projectService.createProject(dto);
    }

    @Patch(':id')
    public updateProject(
        @Param('id') id: string,
        @Body() dto: UpdateProjectDto
    ): Promise<ProjectEntity> {
        return this.projectService.updateProject(dto, id);
    }

    @Delete(':id')
    public deactivateProject(@Param('id') id: string): Promise<ProjectEntity> {
        return this.projectService.deactivateProject(id);
    }
}
