import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components";
import axios from "../api/axios";
import { useAlert, useLoading } from "../hooks";

export default function VerifiedContainer() {
    const {loading, setLoading} = useLoading();
    const params = useParams();
    const {setAlert} = useAlert();
    const [message, setMessage] = useState();

    useEffect(() => {
        console.log(params);
    }, []);

    const verify = async () => {
        setLoading(true);
        axios
        .get(`/auth/verifyemail/${params?.userType}/${params?.code}`)
        .then(function (response) {
            setLoading(false);
            setAlert({msg: `Success: ${response?.data}`, type: "success"});
            // navigate("/candidate/jobs", {state: { from: location }});
        })
        .catch(function (error) {
            setLoading(false);
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    useEffect(() => {
        verify()
    }, []);

    return (
        <>
            <Card width="fit-content">
                <Card.CenterText borderBottom>Your email has been verified!</Card.CenterText>
                <Card.InputColumn width="fit-content">
                    <Card.CenterText><Card.Link to={`/${params.userType}/signin`}>Click here to Login.</Card.Link></Card.CenterText>
                </Card.InputColumn>
            </Card>
        </>
    );
}