import {IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';

import {ProjectDto} from './project.dto';

export class UpdateProjectDto implements Partial<ProjectDto> {
    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    public name: string;

    @IsString()
    @Length(1, 128)
    @IsOptional()
    public description: string;
}
