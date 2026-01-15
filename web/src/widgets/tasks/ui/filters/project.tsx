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

import type {TaskPaginationType} from '@/entities/task';
import type {ProjectPaginationType, ProjectType} from '@/entities/project';

import {useContext, useEffect, useState} from 'react';
import {TasksContext} from '../tasks';

type ProjectProps = {
    projects: ProjectType[];
};

const Project = ({projects}: ProjectProps) => {
    // Combobox logic

    const [open, setOpen] = useState<boolean>(false);
    const [projectId, setProjectId] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    // Data logic

    const {setTasksOptions, setProjectsOptions} = useContext(TasksContext);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setProjectsOptions((prev: ProjectPaginationType) => ({
            ...prev,
            search: debouncedSearch
        }));
    }, [debouncedSearch]);

    useEffect(() => {
        setTasksOptions((prev: TaskPaginationType) => ({
            ...prev,
            projectId
        }));
    }, [projectId]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                >
                    {projectId
                        ? projects.find(u => u.id === projectId)?.name
                        : 'All projects'}
                    <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder='Search projects...'
                        value={search}
                        onValueChange={value => {
                            setSearch(value);
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No projects found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setProjectId('');
                                    setOpen(false);
                                }}
                            >
                                <CheckIcon
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        projectId === ''
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                All projects
                            </CommandItem>
                            {projects?.map((p: ProjectType) => (
                                <CommandItem
                                    key={p.id}
                                    value={p.name}
                                    onSelect={() => {
                                        setProjectId(p.id);
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            projectId === p.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {p.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export {Project, type ProjectProps};
