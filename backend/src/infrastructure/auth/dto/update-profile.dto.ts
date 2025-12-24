import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';

import {SignUpDto} from './sign-up.dto';

export class UpdateProfileDto implements Partial<SignUpDto> {
    @IsString()
    @Length(1, 32)
    @IsOptional()
    @ApiProperty()
    username: string;

    @IsString()
    @Length(1, 96)
    @IsOptional()
    @ApiProperty()
    public firstName: string;

    @IsString()
    @Length(1, 96)
    @IsOptional()
    @ApiProperty()
    public lastName: string;
}
