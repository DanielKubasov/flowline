import {cn} from '@/shared/utils';
import React from 'react';

type Heading1Props = {
    children: React.ReactNode;
    className?: string;
};

const Heading1 = ({children, className, ...props}: Heading1Props) => {
    return (
        <h1
            className={cn(className, 'text-4xl font-bold text-gray-800')}
            {...props}
        >
            {children}
        </h1>
    );
};

export {Heading1};
