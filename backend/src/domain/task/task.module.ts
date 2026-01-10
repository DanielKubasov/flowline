import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ProjectEntity} from '@/domain/project/entities/project.entity';
import {StatusEntity} from '@/domain/status/entities/status.entity';
import {UserEntity} from '@/domain/user/entities/user.entity';

import {TaskEntity} from './entities/task.entity';
import {TaskController} from './task.controller';
import {TaskService} from './task.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TaskEntity,
            ProjectEntity,
            UserEntity,
            StatusEntity
        ])
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
