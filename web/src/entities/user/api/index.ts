import {$clientFetch} from '@/shared/api';
import {ApiError} from '@/shared/errors';

import type {PaginatedApiResponse} from '@/shared/api/types';
import type {UserType} from '../types/user.type';
import type {UserPaginationType} from '../types/user-pagination.type';

function userApi() {
    const getAllUsers = async ({
        page,
        take,
        search
    }: UserPaginationType): Promise<PaginatedApiResponse<UserType>> => {
        try {
            const params = new URLSearchParams({
                page: page ? page.toString() : '1',
                take: take ? take.toString() : '10',
                ...(search ? {search: search.toString()} : {})
            });

            const url = '/users?' + params.toString();

            const res = await $clientFetch(url, {
                next: {
                    tags: ['users']
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

    const getUserById = (id: string) => {};

    return {getAllUsers, getUserById};
}

export {userApi};
