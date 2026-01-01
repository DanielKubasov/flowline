import {Navigation} from './navigation.ui';
import {NavigationList} from './navigation-list.ui';
import {NavigationItem} from './navigation-item.ui';

import {MENU_SCHEMA} from '../constants';

import {Profile} from '@/features/profile';

const Sidebar = () => {
    return (
        <div className='h-screen w-[300px] p-4'>
            <Profile className='mb-8' />
            <Navigation>
                <NavigationList>
                    {MENU_SCHEMA.map((item, index) => (
                        <NavigationItem
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            href={item.href}
                        />
                    ))}
                </NavigationList>
            </Navigation>
        </div>
    );
};

export {Sidebar};
