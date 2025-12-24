import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

import {UserEntity} from '@/domain/user/entities/user.entity';

export class SignInDto implements Partial<UserEntity> {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public password: string;
}
