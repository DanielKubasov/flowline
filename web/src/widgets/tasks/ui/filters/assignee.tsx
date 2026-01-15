'use client';

import {CheckIcon, ChevronsUpDownIcon} from 'lucide-react';

import {useDebounce} from '@/shared/hooks';
import {cn} from '@/shared/utils';
import {Button} from '@/shared/ui';
import {Popover, PopoverTrigger, PopoverContent} from '@/shared/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from '@/shared/ui/command';

import type {UserPaginationType, UserType} from '@/entities/user';
import type {TaskPaginationType} from '@/entities/task';

import {useContext, useEffect, useState} from 'react';
import {TasksContext} from '../tasks';

type AssigneeProps = {
    users: UserType[];
};

const Assignee = ({users}: AssigneeProps) => {
    // Combobox logic

    const [open, setOpen] = useState<boolean>(false);
    const [assigneeId, setAssigneeId] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    // Data logic

    const {setUsersOptions, setTasksOptions} = useContext(TasksContext);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setUsersOptions((prev: UserPaginationType) => ({
            ...prev,
            search: debouncedSearch
        }));
    }, [debouncedSearch]);

    useEffect(() => {
        setTasksOptions((prev: TaskPaginationType) => ({
            ...prev,
            assigneeId
        }));
    }, [assigneeId]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                >
                    {assigneeId
                        ? users.find(u => u.id === assigneeId)?.username
                        : 'All assignees'}
                    <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder='Search assignee...'
                        value={search}
                        onValueChange={value => {
                            setSearch(value);
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No assignees found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setAssigneeId('');
                                    setOpen(false);
                                }}
                            >
                                <CheckIcon
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        assigneeId === ''
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                All assignees
                            </CommandItem>
                            {users?.map((u: UserType) => (
                                <CommandItem
                                    key={u.id}
                                    value={u.username}
                                    onSelect={() => {
                                        setAssigneeId(u.id);
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            assigneeId === u.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {u.username}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export {Assignee, type AssigneeProps};
