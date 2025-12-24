import {IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';

export class WorkspaceDto {
    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    public name: string;

    @IsString()
    @Length(1, 128)
    @IsOptional()
    public description: string;
}
