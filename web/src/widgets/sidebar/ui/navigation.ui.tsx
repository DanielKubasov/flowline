import React from 'react';

type NavigationProps = {
    children?: React.ReactNode;
};

const Navigation = ({children}: NavigationProps) => {
    return <nav>{children}</nav>;
};

export {Navigation, type NavigationProps};
