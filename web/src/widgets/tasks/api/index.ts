import {TaskType} from '@/entities/task';
import {$clientFetch} from '@/shared/api';
import {PaginatedApiResponse} from '@/shared/api/types';

function tasksApi() {
    const getAllTasks = async (): Promise<PaginatedApiResponse<TaskType>> => {
        try {
            const res = await $clientFetch<PaginatedApiResponse<TaskType>>(
                '/tasks'
            );

            if (!res.ok) {
                throw new Error();
            }

            return await res.json();
        } catch (err: unknown) {
            throw new Error();
        }
    };

    return {getAllTasks};
}

export {tasksApi};
