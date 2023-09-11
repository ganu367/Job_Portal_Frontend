import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Card } from "../components";
import axios from "../api/axios";
// import { useAuth } from "../hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Dashboard() {
    // const {setAuth} = useAuth();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/company";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [userType, setUserType] = useState("candidate");
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
        if(!isValidEmail(event.target.username.value)) {
            setError("Username is invalid!");
            return;
        }
        const isAdmin = (userType === "employer" ? "True" : "False");
        const data = {
            username: username,
            password: password,
        };
        try {
            const response = await axios.post("/auth/login/"+isAdmin,
            data,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Control-Allow-Origin": "*" },
                withCredentials: true
            }
            );
            const accessToken = response?.data?.access_token;
            const tokenType = response?.data?.token_type;
            // setAuth({accessToken, tokenType});
            setUsername("");
            setPassword("");
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
        <Card width="75%">
            <Card.Title>
                Dashboard
            </Card.Title>
            <Card.Line />
            <Table>
                <Table.Row header last>
                    <Table.Column>
                        <Table.Header>Profile</Table.Header>
                    </Table.Column>
                    <Table.Column>
                        <Table.Header>Status</Table.Header>
                    </Table.Column>
                    <Table.Column>
                        <Table.Header last>Action</Table.Header>
                    </Table.Column>
                </Table.Row>
                <Table.Row>
                    <Table.Column>
                        <Table.Data>Profile</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Status</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Action</Table.Data>
                    </Table.Column>
                </Table.Row>
                <Table.Row>
                    <Table.Column>
                        <Table.Data>Profile</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Status</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Action</Table.Data>
                    </Table.Column>
                </Table.Row>
                <Table.Row>
                    <Table.Column>
                        <Table.Data>Profile</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Status</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Action</Table.Data>
                    </Table.Column>
                </Table.Row>
                <Table.Row last>
                    <Table.Column>
                        <Table.Data>Profile</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Status</Table.Data>
                    </Table.Column>
                    <Table.Column>
                        <Table.Data>Action</Table.Data>
                    </Table.Column>
                </Table.Row>
            </Table>
        </Card>
        </>
    );
}

export default Dashboard;
