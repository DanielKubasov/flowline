import {PaginatedMeta} from '@/shared/api/types';

type UserPaginationType = {search?: string} & Pick<
    PaginatedMeta,
    'page' | 'take'
>;

export type {UserPaginationType};
