import {$clientFetch} from '@/shared/api';
import {ApiError} from '@/shared/errors';

import type {PaginatedApiResponse} from '@/shared/api/types';
import type {ProjectPaginationType} from '../types/project-pagination.type';
import type {ProjectType} from '../types/project.type';

function projectApi() {
    const getAllProjects = async (
        options: ProjectPaginationType
    ): Promise<PaginatedApiResponse<ProjectType>> => {
        try {
            const params = new URLSearchParams({
                page: options.skip ? options.skip.toString() : '1',
                take: options.take ? options.take.toString() : '10',
                ...(options.workspaceId
                    ? {workspaceId: options.workspaceId.toString()}
                    : {}),
                ...(options.search ? {search: options.search.toString()} : {})
            });

            const url = '/projects?' + params.toString();

            const res = await $clientFetch(url, {
                next: {
                    tags: ['projects']
                }
            });
            const data = await res.json();

            if (!res.ok) {
                throw new ApiError(data?.message, data?.statusCode);
            }

            return data;
        } catch (err: unknown) {
            throw new ApiError('Internal server error', 500);
        }
    };

    const getProjectById = (id: string) => {};

    return {getAllProjects, getProjectById};
}

export {projectApi};
