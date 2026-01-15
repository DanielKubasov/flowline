import {Dispatch, SetStateAction} from 'react';

import type {PaginatedApiResponse} from '@/shared/api/types';

import type {UserPaginationType, UserType} from '@/entities/user';
import type {TaskPaginationType, TaskType} from '@/entities/task';
import type {ProjectPaginationType, ProjectType} from '@/entities/project';

type TasksContextType = {
    users: PaginatedApiResponse<UserType>;
    setUsers: Dispatch<SetStateAction<PaginatedApiResponse<UserType>>>;
    projects: PaginatedApiResponse<ProjectType>;
    setProjects: Dispatch<SetStateAction<PaginatedApiResponse<ProjectType>>>;
    tasks: PaginatedApiResponse<TaskType>;
    setTasks: Dispatch<SetStateAction<PaginatedApiResponse<TaskType>>>;
    tasksOptions: TaskPaginationType;
    setTasksOptions: Dispatch<SetStateAction<TaskPaginationType>>;
    usersOptions: UserPaginationType;
    setUsersOptions: Dispatch<SetStateAction<UserPaginationType>>;
    projectsOptions: ProjectPaginationType;
    setProjectsOptions: Dispatch<SetStateAction<ProjectPaginationType>>;
};

export type {TasksContextType};
