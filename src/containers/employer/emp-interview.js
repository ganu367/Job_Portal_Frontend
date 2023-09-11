import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Button, PostCard, Checkbox } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat, useGetFile } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";

export default function EmpInterview() {
    const location = useLocation();
    const getFile = useGetFile();
    const params = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const {dateConverter, timeFormatter} = useDateFormat();
    const [interviews, setInterviews] = useState([]);
    const [selected, setSelected] = useState([]);

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
    
    useEffect(() => {
        axiosPrivate
        .get("/api/employer/job/all-interview-schedules/"+params.jobID+"/"+params.candID)
        .then(function (response) {
            // console.log(response?.data);
            const interviews = response?.data;
            setInterviews(interviews);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/employer/dashboard", {state: { from: location }});
        });
    },[]);

    return (
        <>
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>Interviews</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => navigate(`/employer/job/${params.jobID}/applications`, {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.ButtonGroup flexStart>
                <Button small onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/interview/schedule`, {state: { from: location }})}>Schedule New</Button>
                <Button small disabled={selected.length === 0} onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/interview/${selected[0]}`, {state: { from: location }})}>Update interview</Button>
            </Card.ButtonGroup>
        </Card>
        <Card width="75%">
            <PostCard>
                <PostCard.Window>
                    {interviews.map((interview) => {
                        return (
                            <PostCard.Post key={interview.id}>
                                <PostCard.Column fullHeight width="fit-content">
                                    <PostCard.Row>
                                        <Checkbox checked={checkSelected(interview.id)} onClick={() => handleSelected(interview.id)} />
                                    </PostCard.Row>
                                </PostCard.Column>
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
                                    {interview.interview_score !== null &&
                                        <>
                                            {interview.interview_remarks !== null &&
                                                <PostCard.Row center>
                                                    <PostCard.Label paddingRight>Remarks: </PostCard.Label>
                                                    <PostCard.Text>{interview.interview_remarks}</PostCard.Text>
                                                </PostCard.Row>
                                            }
                                            {interview.interview_document !== null &&
                                                <PostCard.Row center noMargin>
                                                    <PostCard.Label paddingRight>Attachment: </PostCard.Label>
                                                    <Button iconPadding small onClick={() => getFile(interview?.interview_document)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                                                </PostCard.Row>
                                            }
                                        </>
                                    }
                                    {/* {interview.interview_score === null &&
                                        <>
                                            <PostCard.Row center>
                                                <PostCard.Label paddingRight>Evaluation: </PostCard.Label>
                                                <PostCard.Status status={"shortlisted"}>Pending</PostCard.Status>
                                            </PostCard.Row>
                                        </>
                                    } */}
                                    <PostCard.Line noMarginTop={interview?.interview_document === null} />
                                    {interview.interview_score !== null &&
                                        <PostCard.Row center flexEnd noMargin>
                                            <PostCard.Row center noMargin>
                                                <PostCard.Label paddingRight>Score: </PostCard.Label>
                                                <PostCard.Status status={"applied"}>{interview.interview_score} / 10</PostCard.Status>
                                            </PostCard.Row>
                                            <PostCard.Row center flexEnd noMargin>
                                                <Button small onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/interview/${interview.id}/eval`, {state: { from: location }})}>Update evaluation</Button>
                                            </PostCard.Row>
                                        </PostCard.Row>
                                    }
                                    {interview.interview_score === null &&
                                        <PostCard.Row center flexEnd noMargin>
                                            <PostCard.Row center noMargin>
                                                <PostCard.Label paddingRight>Score: </PostCard.Label>
                                                <PostCard.Status status={"shortlisted"}>Pending</PostCard.Status>
                                            </PostCard.Row>
                                            <PostCard.Row center flexEnd noMargin>
                                                <Button small onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/interview/${interview.id}/eval/new`, {state: { from: location }})}>Evaluate</Button>
                                            </PostCard.Row>
                                        </PostCard.Row>
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