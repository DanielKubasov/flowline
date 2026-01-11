import {type TabItem} from '../types/tabs-item.type';

const TAB_VALUES = {
    table: 'table',
    kanban: 'kanban',
    calendar: 'calendar'
} as const;

const TAB_ITEMS: TabItem[] = [
    {
        label: 'Table',
        value: TAB_VALUES.table
    },
    {
        label: 'Kanban board',
        value: TAB_VALUES.kanban
    },
    {
        label: 'Calendar',
        value: TAB_VALUES.calendar
    }
];

export {TAB_ITEMS, TAB_VALUES};
