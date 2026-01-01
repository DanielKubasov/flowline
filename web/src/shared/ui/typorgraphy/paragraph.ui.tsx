import {cn} from '@/shared/utils';
import React from 'react';

type ParagraphProps = {
    children?: React.ReactNode;
    className?: string;
};

const Paragraph = ({children, className, ...props}: ParagraphProps) => {
    return (
        <p className={cn(className, 'text-gray-400')} {...props}>
            {children}
        </p>
    );
};

export {Paragraph};
