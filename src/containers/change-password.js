import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "../components";
import { useAxiosPrivate, useAlert } from "../hooks";

export default function ChangePassword({userType}) {
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const isInvalid = oldPassword === "" || newPassword === "" || confirmNewPassword === "" || (newPassword !== confirmNewPassword);
    const resetInputFields = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    const handleChangePassword = () => {
        axiosPrivate
            .put("/auth/update-password", { current_password: oldPassword, new_password: newPassword, confirm_password: confirmNewPassword })
            .then(function (response) {
                setAlert({msg: `Success: ${response?.data[0]}`, type: "success"});
            })
            .then(() => {
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                navigate(`/${userType}/dashboard`, {state: { from: location }});
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
    }

    return (
        <>
            <Card width="40%">
                <Card.Title>
                    Change Password
                </Card.Title>
                <Card.Line />
                <Card.InputContainer>
                    <Card.Input type="text" id="oldPassword" placeholder=" " autoComplete="off" value={oldPassword} onChange={({ target }) => setOldPassword(target.value)} />
                    <Card.Label htmlFor="oldPassword">Old password</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="newPassword" placeholder=" " autoComplete="off" value={newPassword} onChange={({ target }) => setNewPassword(target.value)} />
                    <Card.Label htmlFor="newPassword">New password</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="confirmNewPassword" placeholder=" " autoComplete="off" value={confirmNewPassword} onChange={({ target }) => setConfirmNewPassword(target.value)} />
                    <Card.Label htmlFor="confirmNewPassword">Confirm new password</Card.Label>
                </Card.InputContainer>
                <Card.ButtonGroup>
                    <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                    <Button disabled={isInvalid} onClick={() => handleChangePassword()} type="submit">Change password</Button>
                </Card.ButtonGroup>
            </Card>
        </>
    );
}