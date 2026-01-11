import type {EntityType} from '@/shared/types';

type ProjectType = {
    name: string;
    description: string;
} & EntityType;

export type {ProjectType};
