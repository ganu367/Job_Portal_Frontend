import React, { useState } from 'react'

export const SidebarContext = React.createContext();

const SidebarProvider = ({children}) => {
    const [sidebarToggle,setSidebarToggle] = useState(true);

    return (
        <SidebarContext.Provider value={{sidebarToggle,setSidebarToggle}}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;