import {cn} from '@/shared/utils';
import React from 'react';

type Heading2Props = {
    children?: React.ReactNode;
    className?: string;
};

const Heading3 = ({children, className, ...props}: Heading2Props) => {
    return (
        <h3 className={cn(className, 'text-lg text-gray-800')} {...props}>
            {children}
        </h3>
    );
};

export {Heading3};
