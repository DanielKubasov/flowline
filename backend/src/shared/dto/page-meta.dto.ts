import {ApiProperty} from '@nestjs/swagger';

import type {PageMetaParams} from '../types/page-meta-params.types';

export class PageMetaDto {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly take: number;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({pageOptionsDto, itemCount}: PageMetaParams) {
        this.page = Number(pageOptionsDto.page);
        this.take = Number(pageOptionsDto.take);
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
