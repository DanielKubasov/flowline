import {Avatar, AvatarImage, AvatarFallback} from '@/shared/ui/avatar';
import type {UserType} from '../types/user.type';
import Link from 'next/link';

type UserTagProps = {
    user: UserType;
};

const UserTag = ({user}: UserTagProps) => {
    return (
        <Link
            href={`/app/users/${user.id}`}
            className='flex items-center gap-2'
        >
            <Avatar className='w-8 h-8 rounded-full'>
                <AvatarImage src='' alt='@shadcn' />
                <AvatarFallback>
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                </AvatarFallback>
            </Avatar>
            <p>{user?.username}</p>
        </Link>
    );
};

export {UserTag, type UserTagProps};
