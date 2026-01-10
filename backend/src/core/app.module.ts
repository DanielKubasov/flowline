import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ProjectModule} from '@/domain/project/project.module';
import {TaskModule} from '@/domain/task/task.module';
import {UserModule} from '@/domain/user/user.module';
import {WorkspaceModule} from '@/domain/workspace/workspace.module';
import {AuthModule} from '@/infrastructure/auth/auth.module';

import {configService} from '../infrastructure/config/config.service';

import {getTypeOrmConfig} from './configs/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(getTypeOrmConfig()),
        JwtModule.register({
            global: true,
            secret: configService.get<any>('JWT_ACCESS_SECRET'),
            signOptions: {
                expiresIn: configService.get<number>('JWT_EXPIRES_IN')
            }
        }),
        AuthModule,
        UserModule,
        WorkspaceModule,
        ProjectModule,
        TaskModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
