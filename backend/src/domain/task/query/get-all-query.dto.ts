import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

export class GetAllQueryDto {
    @IsUUID()
    @ApiProperty()
    public projectId: string;
}
