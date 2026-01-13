import {$clientFetch} from '@/shared/api';
import {ApiError} from '@/shared/errors';

import {userApi, type UserPaginationType} from '@/entities/user';
import {projectApi, type ProjectPaginationType} from '@/entities/project';
import type {TaskPaginationType, TaskType} from '@/entities/task';

import type {PaginatedApiResponse} from '@/shared/api/types';

function tasksApi() {
    const getAllTasks = async (
        options: TaskPaginationType
    ): Promise<PaginatedApiResponse<TaskType>> => {
        try {
            const params = new URLSearchParams({
                page: options.page ? options.page.toString() : '1',
                take: options.take ? options.take.toString() : '10',
                ...(options.assigneeId
                    ? {assigneeId: options.assigneeId.toString()}
                    : {}),
                ...(options.projectId
                    ? {projectId: options.projectId.toString()}
                    : {})
            });

            const url = '/tasks?' + params.toString();

            const res = await $clientFetch(url, {
                next: {
                    tags: ['tasks']
                }
            });

            const json = await res.json();

            if (!res.ok) {
                throw new ApiError(json.message, json.statusCode);
            }

            return json;
        } catch (err: unknown) {
            throw new ApiError();
        }
    };

    const getAllAssignees = async (options: UserPaginationType) => {
        const {getAllUsers} = userApi();

        try {
            return getAllUsers(options);
        } catch (err: unknown) {
            throw new ApiError();
        }
    };

    const getAllProjects = async (options: ProjectPaginationType) => {
        const {getAllProjects} = projectApi();

        try {
            return getAllProjects(options);
        } catch (err: unknown) {
            throw new ApiError();
        }
    };

    return {getAllTasks, getAllAssignees, getAllProjects};
}

export {tasksApi};
