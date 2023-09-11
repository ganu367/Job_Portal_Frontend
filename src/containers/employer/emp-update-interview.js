import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat } from "../../hooks";
import { FaTimes } from "react-icons/fa";

export default function EmpUpdateInterview({actionType}) {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const {dateConverter, dateTimeFormatter} = useDateFormat();
    const [title, setTitle] = useState("");
    const [schedDate, setSchedDate] = useState("");
    const [schedTime, setSchedTime] = useState("");

    const isInvalid = title === "" || schedDate === "" || schedTime === "";

    const resetInputFields = () => {
        setTitle("");
        setSchedDate("");
        setSchedTime("");
    }

    const handleUpdateInterview = () => {
        if(schedDate !== "" && schedTime !== "") {
            let enteredDateTime = dateTimeFormatter(schedDate,schedTime);
            let today = new Date();
            if (today >= enteredDateTime) {
                setAlert({msg: `Error: Invalid datetime!`, type: "error"});
                return;
            }
        }
        if(actionType === "create") {
            axiosPrivate
            .post("/api/employer/job/schedule-interview/"+params.jobID+"/"+params.candID, {interview_title: title, interview_date: schedDate, interview_time: schedTime},
            {headers: {
                "Content-Type": "application/json"
            }})
            .then(function (response) {
                // console.log(response?.data);
                setAlert({msg: `Success: ${response?.data}`, type: "success"});
                navigate("/employer/job/"+params.jobID+"/candidate/"+params.candID+"/interview", {state: { from: location }});
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
        else if(actionType === "update") {
            axiosPrivate
            .post("/api/employer/job/update-schedule-interview/"+params.interviewID, {interview_title: title, interview_date: schedDate, interview_time: schedTime},
            {headers: {
                "Content-Type": "application/json"
            }})
            .then(function (response) {
                // console.log(response?.data);
                setAlert({msg: `Success: ${response?.data}`, type: "success"});
                navigate("/employer/job/"+params.jobID+"/candidate/"+params.candID+"/interview", {state: { from: location }});
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
    }

    useEffect(() => {
        if (actionType === "update") {
            axiosPrivate
            .get("/api/employer/job/get-interview/"+params.interviewID)
            .then(function (response) {
                // console.log(response?.data);
                const interview = response?.data;
                setTitle(interview?.interview_title);
                setSchedDate(interview?.interview_date.substring(0,10));
                setSchedTime(interview?.interview_time);
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
                navigate("/employer/dashboard", {state: { from: location }});
            });
        }
    }, []);

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>{actionType === "create" ? "New Interview" : "Update interview"}</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/interview`, {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="text" id="title" placeholder=" " autoComplete="off" value={title} onChange={({target}) => setTitle(target.value)} />
                    <Card.Label htmlFor="title" mandatory>Title</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="date" id="schedDate" placeholder=" " onKeyDown={(e) => e.preventDefault()} autoComplete="off" value={schedDate} onChange={({ target }) => setSchedDate(target.value)} />
                    <Card.Label htmlFor="schedDate" mandatory>Date</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="time" id="schedTime" placeholder=" " autoComplete="off" value={schedTime} onChange={({target}) => setSchedTime(target.value)} />
                    <Card.Label htmlFor="schedTime" mandatory>Time</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.ButtonGroup marginTop>
                <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                <Button disabled={isInvalid} onClick={() => handleUpdateInterview()}>{actionType === "create" ? "Schedule" : "Update"}</Button>
            </Card.ButtonGroup>
        </Card>
    );
}