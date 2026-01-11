'use client';

import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/shared/ui';
import {TAB_ITEMS, TAB_VALUES} from '../constants';
import {TaskType} from '@/entities/task';
import {DataTable} from './data-table';
import {useEffect, useState} from 'react';

import {tasksApi} from '../api';
import {columns} from '../table/columns';
import {AssigneeFilter} from '@/features/assignee-filter';

const Tasks = () => {
    const {getAllTasks} = tasksApi();

    const [data, setData] = useState<TaskType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    async function fetchData() {
        setIsLoading(true);

        try {
            const tasks = await getAllTasks();
            setData(tasks.data);
        } catch (err: unknown) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <div>
            {/* Panel */}
            <div className='mb-8'>
                <AssigneeFilter />
            </div>

            {/* Tasks */}
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
                    {!isError && !isLoading && (
                        <DataTable columns={columns} data={data} />
                    )}
                </TabsContent>

                <TabsContent value={TAB_VALUES.kanban}>Kanban</TabsContent>

                <TabsContent value={TAB_VALUES.calendar}>Calendar</TabsContent>
            </Tabs>
        </div>
    );
};

export {Tasks};
