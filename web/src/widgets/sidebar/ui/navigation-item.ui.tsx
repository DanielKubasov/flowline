import Link from 'next/link';

import type {MenuItemType} from '../types/menu-item.type';

const NavigationItem = ({label, icon, href}: MenuItemType) => {
    return (
        <li>
            <Link
                className='flex gap-4 border border-accent p-4 rounded-md hover:bg-primary hover:text-primary-foreground transition-all'
                href={href}
            >
                {icon} {label}
            </Link>
        </li>
    );
};

export {NavigationItem};
