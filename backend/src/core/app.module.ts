import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';

import {UserModule} from '@/domain/user/user.module';
import {WorkspaceModule} from '@/domain/workspace/workspace.module';
import {AuthModule} from '@/infrastructure/auth/auth.module';

import {configService} from '../infrastructure/config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        JwtModule.register({
            global: true,
            secret: configService.get<any>('JWT_ACCESS_SECRET'),
            signOptions: {
                expiresIn: configService.get<number>('JWT_EXPIRES_IN')
            }
        }),
        AuthModule,
        UserModule,
        WorkspaceModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
