import {Avatar, AvatarImage, AvatarFallback} from '@/shared/ui';
import {cn} from '@/shared/utils';

type ProfileProps = {
    className?: string;
};

const Profile = ({className}: ProfileProps) => {
    return (
        <div className={cn(className, 'flex items-center gap-4')}>
            <Avatar className='w-12 h-12'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>...</AvatarFallback>
            </Avatar>
            <div className='flex flex-col justify-between'>
                <p className='text-lg'>Hawk Peterson</p>
                <p className='text-gray-400 text-sm'>Dashboard</p>
            </div>
        </div>
    );
};

export {Profile};
