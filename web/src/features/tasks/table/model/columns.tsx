import {ProjectTag} from '@/entities/project';
import {TaskType} from '@/entities/task';
import {UserTag} from '@/entities/user';
import {Button} from '@/shared/ui';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

const columns: ColumnDef<TaskType>[] = [
    {
        accessorKey: 'name',
        header: 'Task name'
    },
    {
        accessorKey: 'project',
        header: 'Project',
        cell({row}) {
            return <ProjectTag project={row?.original?.project} />;
        }
    },
    {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell({row}) {
            const assignee = row?.original?.assignee;
            return assignee ? (
                <UserTag user={row?.original?.assignee} />
            ) : (
                <p className='text-muted-foreground'>No assignee</p>
            );
        }
    },
    {
        accessorKey: 'dueDate',
        header: 'Due date',
        cell({row}) {
            const dueDate = row?.original?.dueDate;

            return (
                <div>
                    {dueDate ? (
                        new Date(dueDate).toLocaleDateString()
                    ) : (
                        <p className='text-muted-foreground'>No due date</p>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Created',
        cell({row}) {
            const createdAt = row?.original?.createdAt;

            return (
                <div>
                    {createdAt
                        ? new Date(createdAt).toLocaleDateString()
                        : 'No due date'}
                </div>
            );
        }
    },
    {
        accessorKey: '',
        header: 'Overview',
        cell({row}) {
            const id = row?.original?.id;

            return <Link href={`/app/tasks/${id}`}>More...</Link>;
        }
    }
];

export {columns};
