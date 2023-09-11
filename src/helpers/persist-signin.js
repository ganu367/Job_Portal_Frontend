import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

export default function PersistSignin() {
    const [isLoading,setIsLoading] = useState(true);
    const {auth} = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            // try {
            //     await auth.accessToken;
            // }
            // catch (err) {

            // }
            // finally {
            //     setIsLoading(false);
            // }
            setIsLoading(false);
            return auth.JWT.accessToken;
        }
        (auth?.JWT?.accessToken === "") ? verifyToken() : setIsLoading(false);

    }, []);

    return (
        <>
            {isLoading ? <div>LOADING...</div> : <Outlet />}
        </>
    );
}

export function PersistSuperSignin() {
    const [isLoading,setIsLoading] = useState(true);
    const {superauth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(superauth.loggedIn) {
            setIsLoading(false);
        }
        else {
            navigate("/super-signin");
        }
    }, []);

    return (
        <>
            {isLoading ? <div>LOADING...</div> : <Outlet />}
        </>
    );
}