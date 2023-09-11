import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Filter, Button, PostCard, Checkbox, Pagination, Dropdown } from "../components";
import { useAxiosPrivate, useAlert } from "../hooks";
import { FaTimes } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { jobTenureList, jobTypeList, jobModeList } from "../constants";

export default function CandJobs({children}) {
    const scrollJobsRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [jobsList, setJobsList] = useState([]);
    const [selected, setSelected] = useState([]);

    const [locationsList, setLocationsList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [titlesList, setTitlesList] = useState([]);
    const [qualificationsList, setQualificationsList] = useState([]);
    const locRef = useRef();
    const [locDD, setLocDD] = useState(false);
    const [searchLoc, setSearchLoc] = useState([]);
    const [searchSkills, setSearchSkills] = useState([]);

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

    // useEffect(() => {
    //     console.log("selected: ", selected);
    // }, [selected]);

    const scrollToRef = (ref) => {
        ref.current.scroll({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/job/view-jobs/"+currentPage)
        .then(function (response) {
            // console.log(response?.data);
            setJobsList(response?.data?.job_posts);
            setnPages(Math.ceil(response?.data?.total_open_job_posts / recordsPerPage));
            scrollToRef(scrollJobsRef);
            setSelected([]);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard");
        });
    },[currentPage]);

    useEffect(() => {
        axiosPrivate
        .get("/job-search/values")
        .then(function (response) {
            // console.log(response?.data);
            setLocationsList(response?.data?.locations);
            setTitlesList(response?.data?.titles);
            setSkillsList(response?.data?.skills);
            setQualificationsList(response?.data?.qualifications);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    },[]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(locDD && !locRef?.current?.contains(e.target)) {
                setLocDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [locDD, locRef]);
    const changeLoc = (item) => {
        setSearchLoc(item);
        setLocDD(false);
    }
    const handleSearchLoc = (id) => {
        if (!searchLoc.includes(id)) {
            setSearchLoc([...searchLoc, id]);
        }
        else {
            setSearchLoc(searchLoc.filter((item) => item !== id));
        }
    }
    const checkSearchLoc = (id) => {
        return (searchLoc.includes(id));
    }

    const handleApplyToJob = (jobIDarray) => {
        if (jobIDarray.length === 1) {
            navigate(`/candidate/job/${jobIDarray[0]}/assignment`);
        }
    }

    const handleApplyFilters = () => {
        // console.log(searchLoc.toString());
        // const queryLocList = searchLoc.split(",");
        // for (let i=0; i<queryLocList.length; i++) {
        //     queryLocList[i] = queryLocList[i].trim();
        // }
        // console.log(queryLocList);
        
        axiosPrivate
        .post("/job-search/filtered-jobs/"+currentPage, {location: searchLoc.toString(), skills: searchSkills.toString()},
        {headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }})
        .then(function (response) {
            console.log(response?.data);
            setJobsList(response?.data?.job_posts);
            setnPages(Math.ceil(response?.data?.total_open_job_posts / recordsPerPage));
            scrollToRef(scrollJobsRef);
            setSelected([]);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard");
        });
    }

    useEffect(() => {
        if (nPages == 1) {
            setCurrentPage(1);
        }
    }, [nPages]);

    return (
        // <Container>
        <Card rowDirection noPadding>
            <Card.RestContainer>
                <PostCard>
                    <Card.Title>Jobs</Card.Title>
                    <PostCard.Line />
                    <PostCard.ButtonGroup flexStart marginBottom>
                        <Button small onClick={() => handleApplyToJob(selected)}>Apply</Button>
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
                                        <Button small onClick={() => navigate(`/candidate/job/${job.id}`)}>View Details</Button>
                                        </PostCard.Row>
                                    </PostCard.Column>
                                </PostCard.Post>
                            );
                        })}
                        {jobsList.length === 0 &&
                            <PostCard.SpecialRow>
                                No jobs to display!
                            </PostCard.SpecialRow>
                        }
                    </PostCard.Window>
                    {nPages > 1 && 
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage} 
                            setCurrentPage={setCurrentPage}
                        />
                    }
                </PostCard>
            </Card.RestContainer>
            <Filter>
                <Filter.InputColumn notResponsive>
                    <Filter.Title>Filters</Filter.Title>
                    <Button iconPadding small danger onClick={() => navigate("/employer/dashboard")}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Filter.InputColumn>
                <Filter.Line />
                <Filter.InputContainer refPointer={locRef}>
                    <Filter.Input readOnly type="text" id="searchLoc" placeholder=" " autoComplete="off" value={searchLoc} onClick={() => setLocDD((locDD) => !locDD)} />
                    <Filter.Label htmlFor="searchLoc">Location</Filter.Label>
                    <Dropdown width={"100%"} dropdown={locDD} flexDirection="column">
                    {locationsList.map((item, index) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchLoc === item) ? "selected" : undefined} key={index} > {/* onClick={() => changeLoc(item)} */}
                                    <Checkbox noMargin checked={checkSearchLoc(item)} onClick={() => handleSearchLoc(item)} />{item}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(locDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer>
                    <Filter.Input type="text" id="searchSkills" placeholder=" " autoComplete="off" value={searchSkills} onChange={({target}) => setSearchSkills(target.value)} />
                    <Filter.Label htmlFor="searchSkills">Skills</Filter.Label>
                </Filter.InputContainer>
                <Filter.ButtonGroup marginTop>
                <Button nofill small marginTop>Reset</Button>
                <Button small onClick={() => handleApplyFilters()}>Apply filters</Button>
            </Filter.ButtonGroup>
            </Filter>
        </Card>
        // </Container>
    );
}