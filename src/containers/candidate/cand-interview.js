import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, PostCard, Checkbox, Pagination } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat } from "../../hooks";
import { FaTimes } from "react-icons/fa";

export default function CandInterview() {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const {dateConverter, timeFormatter} = useDateFormat();
    const [interviews, setInterviews] = useState([]);
    const [selected, setSelected] = useState([]);
    const [upcomingTab, setUpcomingTab] = useState(true);
    const [completedTab, setCompletedTab] = useState(false);

    const toggleUpcomingTab = () => {
        setUpcomingTab(true);
        setCompletedTab(false);
    }
    const toggleCompletedTab = () => {
        setUpcomingTab(false);
        setCompletedTab(true);
    }

    const handleSelected = (id) => {
        if (!selected.includes(id)) {
            setSelected([id]);
        }
        else {
            setSelected(selected.filter((item) => item !== id));
        }
    }
    const checkSelected = (id) => {
        return (selected.includes(id));
    }
    
    const viewInterviews = () => {
        if(upcomingTab) {
            axiosPrivate
            .get("/api/candidate/all-interview-schedules-upcoming")
            .then(function (response) {
                // console.log(response?.data);
                const interviews = response?.data?.interviews;
                setInterviews(interviews);
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
                // navigate("/candidate/dashboard");
            });
        }
        else if(completedTab) {
            axiosPrivate
            .get("/api/candidate/all-interview-schedules-evaluated")
            .then(function (response) {
                // console.log(response?.data);
                const interviews = response?.data?.interviews;
                setInterviews(interviews);
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
                // navigate("/candidate/dashboard");
            });
        }
    }

    useEffect(() => {
        viewInterviews();
    }, [upcomingTab, completedTab]);

    return (
        <>
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>Interviews</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => navigate(`/candidate/dashboard`, {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.ButtonGroup flexStart>
                <Button small nofill={!upcomingTab} onClick={() => toggleUpcomingTab()}>Pending</Button>
                <Button small nofill={!completedTab} onClick={() => toggleCompletedTab()}>Completed</Button>
            </Card.ButtonGroup>
        </Card>
        <Card width="75%">
            <PostCard>
                <PostCard.Window>
                    {interviews.map((interview) => {
                        return (
                            <PostCard.Post key={interview.id}>
                                {/* <PostCard.Column fullHeight width="fit-content">
                                    <PostCard.Row>
                                        <Checkbox checked={checkSelected(interview.id)} onClick={() => handleSelected(interview.id)} />
                                    </PostCard.Row>
                                </PostCard.Column> */}
                                <PostCard.Column fullHeight width="100%">
                                    <PostCard.Row>
                                        <PostCard.Group alignStart>
                                            <PostCard.Column width="90%">
                                                <PostCard.Title alone>{interview.interview_title}</PostCard.Title>
                                                {/* <PostCard.SmallText>Round {interview.id}</PostCard.SmallText> */}
                                            </PostCard.Column>
                                            <PostCard.Column width="fit-content" center marginRight>
                                                <PostCard.Label paddingBottom>Date:</PostCard.Label>
                                                <PostCard.Text>{dateConverter(interview.interview_date)}</PostCard.Text>
                                            </PostCard.Column>
                                            <PostCard.Column width="fit-content" center>
                                                <PostCard.Label paddingBottom>Time:</PostCard.Label>
                                                <PostCard.Text>{timeFormatter(interview.interview_time)}</PostCard.Text>
                                            </PostCard.Column>
                                        </PostCard.Group>
                                    </PostCard.Row>
                                    <PostCard.Row center>
                                        <PostCard.Label paddingRight>Job Role: </PostCard.Label>
                                        <PostCard.Text>{interview.job_title}</PostCard.Text>
                                    </PostCard.Row>
                                    <PostCard.Row center>
                                        <PostCard.Label paddingRight>Company: </PostCard.Label>
                                        <PostCard.Text>{interview.company_name}</PostCard.Text>
                                    </PostCard.Row>
                                    <PostCard.Line />
                                    {interview.interview_score !== null &&
                                        <>
                                            <PostCard.Row center flexEnd noMargin>
                                                <PostCard.Label paddingRight>Score: </PostCard.Label>
                                                <PostCard.Status status={"applied"}>{interview.interview_score} / 10</PostCard.Status>
                                            </PostCard.Row>
                                        </>
                                    }
                                    {interview.interview_score === null &&
                                        <>
                                            <PostCard.Row center flexEnd noMargin>
                                                <PostCard.Label paddingRight>Score: </PostCard.Label>
                                                <PostCard.Status status={"shortlisted"}>Pending</PostCard.Status>
                                            </PostCard.Row>
                                        </>
                                    }
                                </PostCard.Column>
                            </PostCard.Post>
                        );
                    })}
                    {interviews.length === 0 &&
                        <PostCard.SpecialRow>
                            No interviews to display!
                        </PostCard.SpecialRow>
                    }
                </PostCard.Window>
            </PostCard>
        </Card>
        </>
    );
}