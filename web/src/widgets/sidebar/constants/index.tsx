import {LayoutDashboard} from 'lucide-react';
import {MenuItemType} from '../types/menu-item.type';

const MENU_SCHEMA: MenuItemType[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard />
    },
    {
        label: 'Projects',
        href: '/projects',
        icon: <LayoutDashboard />
    }
];

export {MENU_SCHEMA};
