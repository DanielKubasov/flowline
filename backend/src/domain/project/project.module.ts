import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {WorkspaceEntity} from '@/domain/workspace/entities/workspace.entity';

import {ProjectEntity} from './entities/project.entity';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, WorkspaceEntity])],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [TypeOrmModule.forFeature([ProjectEntity])]
})
export class ProjectModule {}
