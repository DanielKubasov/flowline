import React from 'react';
import {cn} from '@/shared/utils';

type TagProps = {
    className?: string;
    children: React.ReactNode;
};

const Tag = ({children, className}: TagProps) => {
    return (
        <p className={cn(className, 'text-xs text-muted-foreground uppercase')}>
            {children}
        </p>
    );
};

export {Tag, type TagProps};
