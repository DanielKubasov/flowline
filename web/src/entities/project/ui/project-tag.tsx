import {Avatar, AvatarImage, AvatarFallback} from '@/shared/ui/avatar';
import type {ProjectType} from '../types/project.type';

type ProjectTagProps = {
    project: ProjectType;
};

const ProjectTag = ({project}: ProjectTagProps) => {
    return (
        <div className='flex items-center gap-2'>
            <Avatar className='w-8 h-8 rounded-full'>
                <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                />
                <AvatarFallback>{project?.name[0]}</AvatarFallback>
            </Avatar>
            <p>{project?.name}</p>
        </div>
    );
};

export {ProjectTag, type ProjectTagProps};
