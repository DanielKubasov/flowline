import React from 'react';
import {cn} from '@/shared/utils';

type GroupProps = {
    className?: string;
    children?: React.ReactNode;
};

const Group = ({children, className}: GroupProps) => {
    return <div className={cn(className, 'my-4')}>{children}</div>;
};

export {Group, type GroupProps};
