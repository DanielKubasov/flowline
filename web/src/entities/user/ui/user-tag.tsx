import {Avatar, AvatarImage, AvatarFallback} from '@/shared/ui/avatar';
import type {UserType} from '../types/user.type';

type UserTagProps = {
    user: UserType;
};

const UserTag = ({user}: UserTagProps) => {
    return (
        <div className='flex items-center gap-2'>
            <Avatar className='w-8 h-8 rounded-full'>
                <AvatarImage src='' alt='@shadcn' />
                <AvatarFallback>
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                </AvatarFallback>
            </Avatar>
            <p>
                {user?.firstName} {user?.lastName}
            </p>
        </div>
    );
};

export {UserTag, type UserTagProps};
