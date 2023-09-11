import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Filter, Button, PostCard, Checkbox, Pagination } from "../../components";
import { useAxiosPrivate, useAlert } from "../../hooks";
import { FaTimes } from "react-icons/fa";

export default function CandAppliedJobs({children}) {
    const location = useLocation();
    const scrollJobsRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [jobsList, setJobsList] = useState([]);
    const [selected, setSelected] = useState([]);

    const [searchLoc, setSearchLoc] = useState("");
    const [searchSkills, setSearchSkills] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const [nPages, setnPages] = useState(1);

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

    const scrollToRef = (ref) => {
        ref.current.scroll({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/job/view-applied-jobs/"+currentPage)
        .then(function (response) {
            // console.log(response?.data);
            setJobsList(response?.data?.job_posts);
            setnPages(Math.ceil(response?.data?.total_applied_job_posts / recordsPerPage));
            scrollToRef(scrollJobsRef);
            setSelected([]);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard", {state: { from: location }});
        });
    },[currentPage]);

    const handleWithdrawJob = (jobIDarray) => {
        if (jobIDarray.length === 1) {
            axiosPrivate
            .put("/api/candidate/job/withdrawn-job/"+selected[0])
            .then(function (response) {
                setAlert({msg: `Success: ${response?.data}`, type: "success"});
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
    }

    return (
        // <Container>
        <Card rowDirection noPadding>
            <Card.RestContainer>
                <PostCard>
                    <Card.Title>Applied Jobs</Card.Title>
                    <PostCard.Line />
                    <PostCard.ButtonGroup flexStart marginBottom>
                        <Button danger small onClick={() => handleWithdrawJob(selected)}>Withdraw</Button>
                    </PostCard.ButtonGroup>
                    <PostCard.Window refPointer={scrollJobsRef}>
                        {jobsList.map((job) => {
                            return (
                                <PostCard.Post key={job.id}>
                                    <PostCard.Column fullHeight width="fit-content">
                                        <PostCard.Row>
                                            <Checkbox checked={checkSelected(job.id)} onClick={() => handleSelected(job.id)} />
                                        </PostCard.Row>
                                    </PostCard.Column>
                                    <PostCard.Column fullHeight width="100%">
                                        <PostCard.Row>
                                            <PostCard.Group>
                                                <PostCard.Column width="90%">
                                                    <PostCard.Title>{job.job_title}</PostCard.Title>
                                                    <PostCard.SmallText>{job.company_name}</PostCard.SmallText>
                                                </PostCard.Column>
                                                <PostCard.Column width="20%" center>
                                                    <PostCard.Label paddingBottom>Start Date:</PostCard.Label>
                                                    <PostCard.Text>{job.started_date.substring(0,10)}</PostCard.Text>
                                                </PostCard.Column>
                                            </PostCard.Group>
                                        </PostCard.Row>
                                        <PostCard.Row center noMargin>
                                            <PostCard.Column>
                                                <PostCard.Row center>
                                                    <PostCard.Label paddingRight>Location: </PostCard.Label>
                                                    <PostCard.Text>{job.job_location}</PostCard.Text>
                                                </PostCard.Row>
                                            </PostCard.Column>
                                            <PostCard.Column>
                                                <PostCard.Row center>
                                                    <PostCard.Label paddingRight>Type: </PostCard.Label>
                                                    <PostCard.Text>{job.job_type}</PostCard.Text>
                                                </PostCard.Row>
                                            </PostCard.Column>
                                        </PostCard.Row>
                                        <PostCard.Row center noMargin>
                                            <PostCard.Column>
                                                <PostCard.Row center>
                                                    <PostCard.Label paddingRight>Tenure: </PostCard.Label>
                                                    <PostCard.Text>{job.job_tenuer}</PostCard.Text>
                                                </PostCard.Row>
                                            </PostCard.Column>
                                            <PostCard.Column>
                                                <PostCard.Row center>
                                                    <PostCard.Label paddingRight>Mode: </PostCard.Label>
                                                    <PostCard.Text>{job.job_mode}</PostCard.Text>
                                                </PostCard.Row>
                                            </PostCard.Column>
                                        </PostCard.Row>
                                        <PostCard.Row noMargin>
                                            <PostCard.Label paddingRight paddingTop>Description: </PostCard.Label>
                                            <PostCard.Text>
                                                {job.job_desc.substring(0,250)}...
                                            </PostCard.Text>
                                        </PostCard.Row>
                                        <PostCard.Line />
                                        <PostCard.Row center flexEnd noMargin>
                                        <PostCard.Label paddingRight>Status: </PostCard.Label>
                                        <PostCard.Status status={job.status}>{job.status}</PostCard.Status>
                                        <Button small onClick={() => navigate(`/candidate/job/${job.id}`, {state: { from: location }})}>View Details</Button>
                                        </PostCard.Row>
                                    </PostCard.Column>
                                </PostCard.Post>
                            );
                        })}
                    </PostCard.Window>
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}
                    />
                </PostCard>
            </Card.RestContainer>
            <Filter>
                <Filter.InputColumn notResponsive>
                    <Filter.Title>Filters</Filter.Title>
                    <Button iconPadding small danger onClick={() => navigate("/candidate/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Filter.InputColumn>
                <Filter.Line />
                <Filter.InputContainer>
                    <Filter.Input type="text" id="searchLoc" placeholder=" " autoComplete="off" value={searchLoc} onChange={({target}) => setSearchLoc(target.value)} />
                    <Filter.Label htmlFor="searchLoc">Location</Filter.Label>
                </Filter.InputContainer>
                <Filter.InputContainer>
                    <Filter.Input type="text" id="searchSkills" placeholder=" " autoComplete="off" value={searchSkills} onChange={({target}) => setSearchSkills(target.value)} />
                    <Filter.Label htmlFor="searchSkills">Skills</Filter.Label>
                </Filter.InputContainer>
                <Filter.ButtonGroup marginTop>
                <Button nofill small marginTop>Reset</Button>
                <Button small>Apply filters</Button>
            </Filter.ButtonGroup>
            </Filter>
        </Card>
        // </Container>
    );
}