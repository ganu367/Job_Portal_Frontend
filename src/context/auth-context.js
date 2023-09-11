import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = React.createContext({});

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || {accessToken: ""});
    // const [auth, setAuth] = useState(JSON.parse(Cookies.get('auth') || "{}") || { accessToken: '' });
    const [JWT,setJWT] = useState(auth?.accessToken ? jwt_decode(auth.accessToken) : undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setJWT(() => (auth?.accessToken ? jwt_decode(auth?.accessToken) : undefined));
        // navigate("/employer/dashboard");
    }, [auth]);

    useEffect(() => {
        const userType = JWT?.user?.userType;
        // console.log("JWT: ",JWT);
        // if(JWT?.user?.isProfileCompleted) {
        //     navigate(`/${userType}/dashboard`);
        // }
    }, [JWT]);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
        // Cookies.set('auth', JSON.stringify(auth), { expires: 1 });
    }, [auth])
    
    return (
        <AuthContext.Provider value={{auth,setAuth,JWT,setJWT}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;