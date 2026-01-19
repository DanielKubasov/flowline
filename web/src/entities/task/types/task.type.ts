import type {ProjectType} from '@/entities/project';
import type {UserType} from '@/entities/user';
import type {EntityType} from '@/shared/types/entity.type';

type TaskType = {
    name: string;
    description: string;
    overview: string;
    dueDate: Date;
    project: ProjectType;
    assignee: UserType;
    status: Record<string, string>;
} & EntityType;

export type {TaskType};
