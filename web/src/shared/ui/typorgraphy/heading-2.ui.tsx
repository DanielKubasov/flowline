import {cn} from '@/shared/utils';
import React from 'react';

type Heading2Props = {
    children?: React.ReactNode;
    className?: string;
};

const Heading2 = ({children, className, ...props}: Heading2Props) => {
    return (
        <h2
            className={cn(className, 'text-2xl font-bold text-gray-800')}
            {...props}
        >
            {children}
        </h2>
    );
};

export {Heading2};
