import {$clientFetch} from '@/shared/api';
import {ApiError} from '@/shared/errors';

import type {PaginatedApiResponse} from '@/shared/api/types';
import type {UserType} from '../types/user.type';
import type {UserPaginationType} from '../types/user-pagination.type';

function userApi() {
    const getAllUsers = async (
        options: UserPaginationType
    ): Promise<PaginatedApiResponse<UserType>> => {
        const {take, skip, search} = options;

        try {
            const params = new URLSearchParams({
                take: take ? String(take) : String(0),
                skip: take ? String(skip) : String(skip),
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
