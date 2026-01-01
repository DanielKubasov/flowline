import {Heading2} from '@/shared/ui/typorgraphy/heading-2.ui';
import {cn} from '@/shared/utils';

type UserProjectsProps = {
    className?: string;
};

const UserProjects = ({className, ...props}: UserProjectsProps) => {
    return (
        <div
            className={cn(
                className,
                'h-full p-4 rounded-xl border border-gray-200'
            )}
            {...props}
        >
            <Heading2>Visited projects</Heading2>
        </div>
    );
};

export {UserProjects};
