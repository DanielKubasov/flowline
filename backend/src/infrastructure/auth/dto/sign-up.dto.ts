import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length
} from 'class-validator';

import {UserEntity} from '@/domain/user/user.entity';

export class SignUpDTO implements Partial<UserEntity> {
    @IsString()
    @Length(4, 32)
    @IsNotEmpty()
    public username: string;

    @IsString()
    @IsStrongPassword()
    @Length(8, 64)
    @IsNotEmpty()
    public password: string;

    @IsString()
    @IsEmail()
    @Length(4, 96)
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 96)
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 96)
    @IsNotEmpty()
    public lastName: string;
}
