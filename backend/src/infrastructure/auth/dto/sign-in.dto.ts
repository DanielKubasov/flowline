import {IsNotEmpty, IsString} from 'class-validator';

import {UserEntity} from '@/domain/user/user.entity';

export class SignInDTO implements Partial<UserEntity> {
    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}
