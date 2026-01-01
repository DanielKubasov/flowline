import React from 'react';

type NavigationListProps = {
    children?: React.ReactNode;
};

const NavigationList = ({children}: NavigationListProps) => {
    return <ul className='flex flex-col gap-2'>{children}</ul>;
};

export {NavigationList, type NavigationListProps};
