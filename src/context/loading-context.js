import React, { useState, useEffect } from 'react'

export const LoadingContext = React.createContext();

const LoadingProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
    
    return (
        <LoadingContext.Provider value={{loading,setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;