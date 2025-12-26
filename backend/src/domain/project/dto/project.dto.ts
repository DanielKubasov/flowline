import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length
} from 'class-validator';

export class ProjectDto {
    @IsUUID()
    @IsNotEmpty()
    public workspaceId: string;

    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    public name: string;

    @IsString()
    @Length(1, 128)
    @IsOptional()
    public description: string;
}
