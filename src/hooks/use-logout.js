// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";
import useAuth from "./use-auth";
// import { useAlert } from "../context/alert-context";

export default function useLogout() {
    const {setAuth} = useAuth();
    // const navigate = useNavigate();
    // const {setAlert} = useAlert();

    const logout = async () => {
        setAuth({accessToken: ""});
        // navigate("/signin");
        // try {
        //     const response = await axios("/logout",
        //         {
        //             withCredentials: true
        //         }
        //     );
        // }
        // catch (err) {
        //     setAlert({msg: err, type: "error"});
        // }
    }

    return logout;
}
