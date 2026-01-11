import {
    PageIndicator,
    type PageIndicatorProps
} from '@/features/page-indicator';
import {UserProfile} from '@/features/user-profile';

type HeaderProps = {
    pageIndicator: PageIndicatorProps;
};

const Header = ({pageIndicator}: HeaderProps) => {
    return (
        <header className='flex w-full justify-between items-center p-6'>
            <PageIndicator {...pageIndicator} />
            <UserProfile />
        </header>
    );
};

export {Header, type HeaderProps};
