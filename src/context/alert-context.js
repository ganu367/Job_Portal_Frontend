import React, { useState, useEffect } from 'react'

export const AlertContext = React.createContext();

const AlertProvider = ({children}) => {
    const [alert,setAlert] = useState({msg: "",type: ""});

    useEffect(() => {
        // console.log("alert: ",alert);
        if(alert.msg !== "") {
            const timeout = setTimeout(() => {
                setAlert({msg: "",type: ""});
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [alert]);

    return (
        <AlertContext.Provider value={{alert,setAlert}}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;