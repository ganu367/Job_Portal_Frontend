import React, { useState } from "react";
import { Card } from "../components";

export default function Profile() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");

    return (
        <Card width="75%">
            <Card.Title>
                My Profile
            </Card.Title>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="text" id="name" placeholder=" " autoComplete="off" value={name} onChange={({target}) => setName(target.value)} />
                    <Card.Label htmlFor="name">Name</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="username" placeholder=" " autoComplete="off" value={username} onChange={({target}) => setUsername(target.value)} />
                    <Card.Label htmlFor="username">Username</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Textarea type="text" id="address" placeholder=" " autoComplete="off" value={address} onChange={({target}) => setAddress(target.value)} />
                    <Card.Label htmlFor="address">Address</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
        </Card>
    );
}