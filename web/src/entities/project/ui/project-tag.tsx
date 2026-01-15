import {Avatar, AvatarImage, AvatarFallback} from '@/shared/ui/avatar';
import type {ProjectType} from '../types/project.type';
import Link from 'next/link';

type ProjectTagProps = {
    project: ProjectType;
};

const ProjectTag = ({project}: ProjectTagProps) => {
    return (
        <Link
            href={`/projects/${project.id}`}
            className='flex items-center gap-2'
        >
            <Avatar className='w-8 h-8 rounded-full'>
                <AvatarImage src='' alt='@shadcn' />
                <AvatarFallback>{project?.name[0]}</AvatarFallback>
            </Avatar>
            <p>{project?.name}</p>
        </Link>
    );
};

export {ProjectTag, type ProjectTagProps};
