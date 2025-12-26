import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {UserEntity} from '@/domain/user/entities/user.entity';

import {WorkspaceEntity} from './entities/workspace.entity';
import {WorkspaceController} from './workspace.controller';
import {WorkspaceService} from './workspace.service';

@Module({
    imports: [TypeOrmModule.forFeature([WorkspaceEntity, UserEntity])],
    controllers: [WorkspaceController],
    providers: [WorkspaceService]
})
export class WorkspaceModule {}
