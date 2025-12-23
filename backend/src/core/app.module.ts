import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AuthModule} from '@/infrastructure/auth/auth.module';

import {UserModule} from '../domain/user/user.module';
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
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
