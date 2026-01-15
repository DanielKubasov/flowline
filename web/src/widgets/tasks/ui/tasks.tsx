'use client';

import {createContext, useEffect, useState} from 'react';

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/shared/ui';

import type {TaskPaginationType, TaskType} from '@/entities/task';
import type {UserPaginationType, UserType} from '@/entities/user';

import type {TasksContextType} from '../types/context.type';

import {TAB_ITEMS, TAB_VALUES} from '../constants';
import {DataTable} from './table';
import {columns} from '../table/columns';
import {tasksApi} from '../api';
import {Assignee} from './assignee';
import {PaginatedApiResponse} from '@/shared/api/types';
import {ProjectPaginationType, ProjectType} from '@/entities/project';
import {Project} from './project';

const TasksContext = createContext<TasksContextType>({} as TasksContextType);

const Tasks = () => {
    // API

    const {getAllTasks, getAllAssignees, getAllProjects} = tasksApi();

    // States

    const t = {data: [] as TaskType[]} as PaginatedApiResponse<TaskType>;
    const u = {data: [] as UserType[]} as PaginatedApiResponse<UserType>;
    const p = {data: [] as ProjectType[]} as PaginatedApiResponse<ProjectType>;

    const [tasks, setTasks] = useState<PaginatedApiResponse<TaskType>>(t);
    const [users, setUsers] = useState<PaginatedApiResponse<UserType>>(u);
    const [projects, setProjects] =
        useState<PaginatedApiResponse<ProjectType>>(p);

    // Pagination logic

    const [tasksOptions, setTasksOptions] = useState<TaskPaginationType>({
        page: 1,
        take: 10,
        assigneeId: '',
        projectId: '',
        statusId: ''
    });

    const [usersOptions, setUsersOptions] = useState<UserPaginationType>({
        page: 1,
        take: 10,
        search: ''
    });

    const [projectsOptions, setProjectsOptions] =
        useState<ProjectPaginationType>({
            page: 0,
            take: 10,
            search: '',
            workspaceId: ''
        });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    async function nextPage() {
        setTasksOptions(prev => ({...prev, page: prev.page + 1}));
        await fetchTasks();
    }

    async function prevPage() {
        setTasksOptions(prev => ({...prev, page: prev.page - 1}));
        await fetchTasks();
    }

    // Fetching

    async function fetchTasks() {
        setIsLoading(true);

        try {
            setTasks(await getAllTasks(tasksOptions));
        } catch (err: unknown) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchUsers() {
        setIsLoading(true);

        try {
            setUsers(await getAllAssignees(usersOptions));
        } catch (err: unknown) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchProjects() {
        setIsLoading(true);

        try {
            setProjects(await getAllProjects(projectsOptions));
        } catch (err: unknown) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        Promise.allSettled([fetchTasks(), fetchUsers()]);
    }, []);

    useEffect(() => void fetchTasks(), [tasksOptions]);
    useEffect(() => void fetchProjects(), [projectsOptions]);
    useEffect(() => void fetchUsers(), [usersOptions]);

    // Context

    const contextValue: TasksContextType = {
        tasksOptions,
        setTasksOptions,
        usersOptions,
        setUsersOptions,
        projectsOptions,
        setProjectsOptions,
        users,
        setUsers,
        tasks,
        setTasks,
        projects,
        setProjects
    };

    return (
        <TasksContext value={contextValue}>
            <>
                <div className='flex items-center gap-2 mb-4'>
                    <Assignee users={users.data} />
                    <Project projects={projects.data} />
                </div>

                <Tabs defaultValue='table'>
                    <TabsList>
                        {TAB_ITEMS.map(item => (
                            <TabsTrigger
                                className='cursor-pointer'
                                value={item.value}
                                key={item.value}
                            >
                                {item.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value={TAB_VALUES.table}>
                        <DataTable columns={columns} data={tasks.data} />

                        {tasks?.meta?.itemCount > tasksOptions.take && (
                            <Pagination className='justify-start mt-8'>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className={
                                                !tasks?.meta?.hasPreviousPage
                                                    ? 'opacity-50 pointer-events-none'
                                                    : ''
                                            }
                                            onClick={prevPage}
                                        />
                                    </PaginationItem>

                                    <PaginationItem>
                                        {tasksOptions.page > 1 && (
                                            <PaginationLink onClick={prevPage}>
                                                {tasksOptions.page - 1}
                                            </PaginationLink>
                                        )}

                                        <PaginationLink
                                            className='bg-primary text-white pointer-events-none'
                                            href='#'
                                        >
                                            {tasksOptions.page}
                                        </PaginationLink>

                                        <PaginationLink
                                            className={
                                                !tasks?.meta?.hasNextPage
                                                    ? 'opacity-50 pointer-events-none'
                                                    : ''
                                            }
                                            onClick={nextPage}
                                        >
                                            {tasksOptions.page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            className={
                                                !tasks?.meta?.hasNextPage
                                                    ? 'opacity-50 pointer-events-none'
                                                    : ''
                                            }
                                            onClick={nextPage}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </TabsContent>

                    <TabsContent value={TAB_VALUES.kanban}>Kanban</TabsContent>

                    <TabsContent value={TAB_VALUES.calendar}>
                        Calendar
                    </TabsContent>
                </Tabs>
            </>
        </TasksContext>
    );
};

export {Tasks, TasksContext};
