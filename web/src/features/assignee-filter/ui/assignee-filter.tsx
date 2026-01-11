'use client';

import {CheckIcon, ChevronsUpDownIcon} from 'lucide-react';

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
import {useEffect, useState} from 'react';
import type {PaginatedApiResponse, PaginatedMeta} from '@/shared/api/types';
import type {UserType} from '@/entities/user';
import {assigneeFilterApi} from '../api';
import {ApiError} from '@/shared/errors';

type PagOptionsType = Pick<
    PaginatedMeta,
    'take' | 'page' | 'hasNextPage' | 'hasPreviousPage'
> & {search: string};

const AssigneeFilter = () => {
    // Extracting api function

    const {getAllAssignees} = assigneeFilterApi();

    // Combobox logic

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    // Data logic

    const [users, setUsers] = useState<PaginatedApiResponse<UserType>>(
        {} as PaginatedApiResponse<UserType>
    );

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [_, setErrorMessage] = useState<string>('');

    // Pagination logic

    const [pagOptions, setPagOptions] = useState<PagOptionsType>({
        page: 1,
        take: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        search: ''
    });

    // Data fetch function

    async function fetchData() {
        setIsLoading(true);

        try {
            const users = await getAllAssignees({
                ...pagOptions
            });

            setUsers(users);
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                setIsError(true);
                setErrorMessage(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Fetch data on load

    useEffect(() => {
        void fetchData();
    }, [pagOptions]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                >
                    {value
                        ? users.data.find(u => u.id === value)?.username
                        : 'Select assignee...'}
                    <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder='Search assignee...'
                        value={pagOptions.search}
                        onValueChange={value => {
                            setPagOptions(prev => ({
                                ...prev,
                                page: 1,
                                search: value
                            }));
                        }}
                    />
                    <CommandList>
                        {!isLoading && !isError && (
                            <>
                                <CommandEmpty>No assignees found.</CommandEmpty>
                                <CommandGroup>
                                    {users.data?.map((u: UserType) => (
                                        <CommandItem
                                            key={u.id}
                                            value={u.username}
                                            onSelect={() => {
                                                setValue(u.id);
                                                setOpen(false);
                                            }}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    value === u.id
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {u.username}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                        {isLoading && <CommandEmpty>Loading..</CommandEmpty>}
                        {isError && <CommandEmpty>Error</CommandEmpty>}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export {AssigneeFilter};
