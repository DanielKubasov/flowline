import type {PaginatedMeta} from '@/shared/api/types';

type ProjectPaginationType = {
    workspaceId: string;
    search: string;
} & Pick<PaginatedMeta, 'page' | 'take'>;

export type {ProjectPaginationType};
