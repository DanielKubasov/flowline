import {Heading1} from '@/shared/ui/typorgraphy/heading-1.ui';
import {UserProjects} from '@/widgets/user-projects';
import {UserTasks} from '@/widgets/user-tasks';

const DashboardView = () => {
    return (
        <div className='max-w-full h-full'>
            <Heading1 className='mb-8'>Dashboard page</Heading1>

            <div className='grid grid-cols-2 gap-4 h-full'>
                <UserTasks />
                <UserProjects />
            </div>
        </div>
    );
};

export {DashboardView};
