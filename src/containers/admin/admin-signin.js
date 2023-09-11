import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "../../components";
import axios from "../../api/axios";
import { useAuth } from "../../hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function AdminSignin() {
    const location = useLocation();
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isInvalid = password === "" || username === "";

    const resetInputFields = () => {
        setUsername("");
        setPassword("");
    }

    const isValidEmail = (username) => {
        return /\S+@\S+\.\S+/.test(username);
    }
    useEffect(() => {
        setError("");
    }, [username,password]);
    
    const handleSignin = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
        };
        try {
            const response = await axios.post("/auth/sign-in/admin",
            data,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded"},
                withCredentials: true
            }
            );
            // console.log(response.data);
            const accessToken = response?.data?.access_token;
            setAuth({accessToken});
            resetInputFields();
        }
        catch (err) {
            if(!err?.response) {
                setError("No server response!");
            }
            else if (err.response?.status === 400) {
                setError("Missing username or password!")
            }
            else if (err.response?.status === 401) {
                setError("Unauthorized!")
            }
            else {
                setError(`${err?.response?.data?.detail}`);
            }
        }
    }

    return (
        <>
        <Form>
            <Form.Title>ADMIN SIGN IN</Form.Title>
            <Form.Line />
            {error &&
            <Form.Error>
                Error: {error}
            </Form.Error>}
            <Form.ToggleGroup>
                <Form.Toggle marginRight onClick={() => {
                    navigate("/employer/signin", {state: { from: location }});
                    resetInputFields();
                }}>
                    Signin as employer
                </Form.Toggle>
                <Form.Toggle onClick={() => {
                    navigate("/candidate/signin", {state: { from: location }});
                    resetInputFields();
                }}>
                    Signin as candidate
                </Form.Toggle>
            </Form.ToggleGroup>
            <Form.Base onSubmit={handleSignin} >
                <Form.InputContainer>
                    <Form.Input type="text" id="username" placeholder=" " autoComplete="off" value={username} onChange={({target}) => setUsername(target.value)} />
                    <Form.Label htmlFor="username">Username</Form.Label>
                </Form.InputContainer>
                <Form.InputContainer>
                    <Form.Input type={(showPassword) ? "text" : "password"} id="password"  autoComplete="off" placeholder=" " value={password} onChange={({target}) => setPassword(target.value)} />
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Icon onClick={() => {setShowPassword(!showPassword)}}>
                        {(showPassword) ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </Form.Icon>
                </Form.InputContainer>
                <Form.Submit disabled={isInvalid} type="submit">Sign In</Form.Submit>
                <Form.Text>
                    Haven't registered? <Form.Link to="/admin/signup">Register now.</Form.Link>
                </Form.Text>
            </Form.Base>
        </Form>
        </>
    );
}

export default AdminSignin;
