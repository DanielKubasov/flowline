import type {PaginatedMeta} from '@/shared/api/types';

type TaskPaginationType = {
    assigneeId: string;
    projectId: string;
    statusId: string;
} & Pick<PaginatedMeta, 'page' | 'take'>;

export type {TaskPaginationType};
