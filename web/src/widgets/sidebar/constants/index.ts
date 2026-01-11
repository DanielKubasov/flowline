import {type MenuItemType} from '../types/menu-item.type';

const MENU_LAYOUT: MenuItemType[] = [
    {label: 'Home', href: '/app/dashboard'},
    {label: 'My tasks', href: '/app/tasks'}
] as const;

export {MENU_LAYOUT};
