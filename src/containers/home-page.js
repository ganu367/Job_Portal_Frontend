import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../components";
import { RiSendPlaneFill } from "react-icons/ri";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <>
        <Card.CardRowHolder>
            <Card forHome>
                <Card.Title centered>
                    HIRE CANDIDATES
                </Card.Title>
                <Card.Line />
                <Card.HomeText>Post your requirements & Get matching candidates as per your needs.</Card.HomeText>
                <Card.ButtonGroup marginBottom>
                    <Button onClick={() => navigate("/employer/signin")}>Sign in as Employer</Button>
                </Card.ButtonGroup>
            </Card>
            <Card forHome>
                <Card.Title centered>
                    POST RESUME
                </Card.Title>
                <Card.Line />
                <Card.HomeText>Our Unique job assistance program helps you to find matching job. Post your resume for free.</Card.HomeText>
                <Card.ButtonGroup marginBottom>
                    <Button onClick={() => navigate("/candidate/signin")}>Sign in as Job-Seeker</Button>
                </Card.ButtonGroup>
            </Card>
        </Card.CardRowHolder>
        </>
    );
}