import React from 'react';

type AuthAlterProps = {
    children: React.ReactNode;
};

const AuthAlter = ({children}: AuthAlterProps) => {
    return (
        <div className='relative py-4'>
            <p className='absolute z-10 top-1/2 left-50 -translate-y-1/2 -translate-x-1/2 text-gray-800 text-small bg-background p-2'>
                {children}
            </p>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-gray-800'></div>
        </div>
    );
};

export {AuthAlter, type AuthAlterProps};
