'use client';

import Link from 'next/link';

import {Button} from '@/shared/ui';

import {MENU_LAYOUT} from '../constants';
import {Group} from './group';
import {Separator} from './separator';
import {Tag} from './tag';

const Sidebar = () => {
    return (
        <aside className='flex flex-col w-64 p-3 gap-3 bg-background-dark'>
            <Separator />
            <Tag>Workspaces</Tag>
            <Group></Group>
            <Separator />
            <Tag>Navigation</Tag>
            <Group>
                <div className='flex flex-col gap-3'>
                    {MENU_LAYOUT.map((item, index) => {
                        return (
                            <Button key={index} asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </Button>
                        );
                    })}
                </div>
            </Group>
            <Separator />
            <Tag>Projects</Tag>
            <Group></Group>
        </aside>
    );
};

export {Sidebar};
