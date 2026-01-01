import {Heading2} from '@/shared/ui/typorgraphy/heading-2.ui';
import {cn} from '@/shared/utils';

type UserTasksProps = {
    className?: string;
};

const UserTasks = ({className, ...props}: UserTasksProps) => {
    return (
        <div
            className={cn(
                className,
                'h-full p-4 rounded-xl border border-gray-200'
            )}
            {...props}
        >
            <Heading2>Recent tasks</Heading2>
        </div>
    );
};

export {UserTasks};
