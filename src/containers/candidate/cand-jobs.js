import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Filter, Button, PostCard, Checkbox, Pagination, Dropdown } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { jobTenureList, jobTypeList, jobModeList } from "../../constants";
import { GiShare } from "react-icons/gi";
import { FiCheck } from "react-icons/fi";

const CopyIcon = ({params}) => {
    const {setAlert} = useAlert();
    const [copied, setCopied] = useState(false);
    const copyLink = (params) => {
        navigator.clipboard.writeText(params);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    useEffect(() => {
        if (copied) {
            setAlert({type: "success", msg: "Link copied to clipboard!"})
        }
    }, [copied]);

    return (<>
                <Button iconPadding onClick={() => copyLink(params)}>
                    <Button.Icon alone>{copied ? <FiCheck /> : <GiShare />}</Button.Icon>
                </Button>
            </>
            );
}

export default function CandJobs({children}) {
    const location = useLocation();
    const {dateConverter} = useDateFormat();
    const scrollJobsRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [jobsList, setJobsList] = useState([]);
    const [selected, setSelected] = useState([]);
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const [filtering, setFiltering] = useState(false);
    const [locationsList, setLocationsList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [titlesList, setTitlesList] = useState([]);
    const [qualificationsList, setQualificationsList] = useState([]);
    const [functionsList, setFunctionsList] = useState([]);

    const [searchLoc, setSearchLoc] = useState([]);
        const locRef = useRef();
        const [locDD, setLocDD] = useState(false);
    const [searchSkills, setSearchSkills] = useState([]);
        const skillsRef = useRef();
        const [skillsDD, setSkillsDD] = useState(false);
    const [searchTitles, setSearchTitles] = useState([]);
        const titlesRef = useRef();
        const [titlesDD, setTitlesDD] = useState(false);
    const [searchQuali, setSearchQuali] = useState([]);
        const qualiRef = useRef();
        const [qualiDD, setQualiDD] = useState(false);
    const [searchType, setSearchType] = useState("");
        const typeRef = useRef();
        const [typeDD, setTypeDD] = useState(false);
    const [searchMode, setSearchMode] = useState("");
        const modeRef = useRef();
        const [modeDD, setModeDD] = useState(false);
    const [searchTenure, setSearchTenure] = useState("");
        const tenureRef = useRef();
        const [tenureDD, setTenureDD] = useState(false);
    const [searchFunc, setSearchFunc] = useState("");
        const functionRef = useRef();
        const [functionDD, setFunctionDD] = useState(false);
    const [searchExp, setSearchExp] = useState("");
    const [searchSal, setSearchSal] = useState("");

    const resetFilterFields = () => {
        setSearchLoc("");
        setSearchSkills("");
        setSearchTitles("");
        setSearchQuali("");
        setSearchType("");
        setSearchMode("");
        setSearchTenure("");
        setSearchFunc("");
        setSearchExp("");
        setSearchSal("");
    }

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

    // useEffect(() => {
    //     if (!filtering) {
    //         axiosPrivate
    //         .get("/api/candidate/job/view-jobs/"+currentPage)
    //         .then(function (response) {
    //             // console.log(response?.data);
    //             setJobsList(response?.data?.job_posts);
    //             setnPages(Math.ceil(response?.data?.total_open_job_posts / recordsPerPage));
    //             scrollToRef(scrollJobsRef);
    //             setSelected([]);
    //         })
    //         .catch(function (error) {
    //             setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
    //             navigate("/candidate/dashboard");
    //         });
    //     }
    // },[currentPage]);

    useEffect(() => {
        axiosPrivate
        .post("/search/candidate/filtered-jobs/"+currentPage, {location: searchLoc.toString(), skill: searchSkills.toString(), title: searchTitles.toString(), qualification: searchQuali.toString(), function: searchFunc.toString(), type: searchType, mode: searchMode, tenure: searchTenure, exp: searchExp, sal: searchSal},
        {headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }})
        .then(function (response) {
            // console.log(response?.data);
            setJobsList(response?.data?.job_posts);
            setnPages(Math.ceil(response?.data?.total_open_job_posts / recordsPerPage));
            scrollToRef(scrollJobsRef);
            setSelected([]);
            setFiltering(false);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard", {state: { from: location }});
        });
    }, [currentPage, filtering])
    
    useEffect(() => {
        setCurrentPage(1);
    }, [nPages]);

    // const handleApplyFilters = () => {
    //     // console.log(searchLoc.toString());
    //     // const queryLocList = searchLoc.split(",");
    //     // for (let i=0; i<queryLocList.length; i++) {
    //     //     queryLocList[i] = queryLocList[i].trim();
    //     // }
    //     // console.log(queryLocList);
        
    //     axiosPrivate
    //     .post("/job-search/filtered-jobs/"+currentPage, {location: searchLoc.toString(), skills: searchSkills.toString()},
    //     {headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     }})
    //     .then(function (response) {
    //         console.log(response?.data);
    //         setJobsList(response?.data?.job_posts);
    //         setnPages(Math.ceil(response?.data?.total_open_job_posts / recordsPerPage));
    //         scrollToRef(scrollJobsRef);
    //         setSelected([]);
    //     })
    //     .catch(function (error) {
    //         setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
    //         navigate("/candidate/dashboard");
    //     });
    // }

    useEffect(() => {
        axiosPrivate
        .get("/search/candidate/filter-values")
        .then(function (response) {
            // console.log(response?.data);
            setLocationsList(response?.data?.locations);
            setTitlesList(response?.data?.titles);
            setSkillsList(response?.data?.skills);
            setQualificationsList(response?.data?.qualifications);
            setFunctionsList(response?.data?.functions);
        })
        .catch(function (error) {
            // console.log(error);
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
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(skillsDD && !skillsRef?.current?.contains(e.target)) {
                setSkillsDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [skillsDD, skillsRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(titlesDD && !titlesRef?.current?.contains(e.target)) {
                setTitlesDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [titlesDD, titlesRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(qualiDD && !qualiRef?.current?.contains(e.target)) {
                setQualiDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [qualiDD, qualiRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(typeDD && !typeRef?.current?.contains(e.target)) {
                setTypeDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [typeDD, typeRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(modeDD && !modeRef?.current?.contains(e.target)) {
                setModeDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [modeDD, modeRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(tenureDD && !tenureRef?.current?.contains(e.target)) {
                setTenureDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [tenureDD, tenureRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(functionDD && !functionRef?.current?.contains(e.target)) {
                setFunctionDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [functionDD, functionRef]);

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
    const handleSearchSkills = (id) => {
        if (!searchSkills.includes(id)) {
            setSearchSkills([...searchSkills, id]);
        }
        else {
            setSearchSkills(searchSkills.filter((item) => item !== id));
        }
    }
    const checkSearchSkills = (id) => {
        return (searchSkills.includes(id));
    }
    const handleSearchTitles = (id) => {
        if (!searchTitles.includes(id)) {
            setSearchTitles([...searchTitles, id]);
        }
        else {
            setSearchTitles(searchTitles.filter((item) => item !== id));
        }
    }
    const checkSearchTitles = (id) => {
        return (searchTitles.includes(id));
    }
    const handleSearchQuali = (id) => {
        if (!searchQuali.includes(id)) {
            setSearchQuali([...searchQuali, id]);
        }
        else {
            setSearchQuali(searchQuali.filter((item) => item !== id));
        }
    }
    const checkSearchQuali = (id) => {
        return (searchQuali.includes(id));
    }
    const handleSearchFunc = (id) => {
        if (!searchFunc.includes(id)) {
            setSearchFunc([...searchFunc, id]);
        }
        else {
            setSearchFunc(searchFunc.filter((item) => item !== id));
        }
    }
    const checkSearchFunc = (id) => {
        return (searchFunc.includes(id));
    }
    const changeType = (item) => {
        setSearchType(item);
        setTypeDD(false);
    }
    const changeMode = (item) => {
        setSearchMode(item);
        setModeDD(false);
    }
    const changeTenure = (item) => {
        setSearchTenure(item);
        setTenureDD(false);
    }

    const handleApplyToJob = (jobIDarray) => {
        if (jobIDarray.length === 1) {
            navigate(`/candidate/job/${jobIDarray[0]}/assignment`, {state: {from: location, type: "create"}});
        }
    }

    // useEffect(() => {
    //     console.log("filtering: ", filtering);
    // }, [filtering]);

    return (
        // <Container>
        <Card rowDirection noPadding alignStart>
            <Card.RestContainer>
                <PostCard>
                    <Card.Title>Jobs</Card.Title>
                    <PostCard.Line />
                    <PostCard.ButtonGroup flexStart marginBottom>
                        <Button disabled={selected.length === 0} small onClick={() => handleApplyToJob(selected)}>Apply</Button>
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
                                                {job.started_date &&
                                                    <PostCard.Column width="20%" center>
                                                        <PostCard.Label paddingBottom>Start Date:</PostCard.Label>
                                                        <PostCard.Text>{dateConverter(job.started_date)}</PostCard.Text>
                                                    </PostCard.Column>
                                                }
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
                                            <Button small onClick={() => navigate(`/candidate/job/${job.id}`, {state: {from: location, status: "notApplied"}})}>View Details</Button>
                                            <CopyIcon params={job.share_link} />
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
                    <Button iconPadding small danger onClick={() => navigate("/candidate/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Filter.InputColumn>
                <Filter.Line />
                <Filter.InputContainer  refPointer={titlesRef}>
                    <Filter.Input readOnly type="text" id="searchTitles" placeholder=" " autoComplete="off" value={searchTitles} onClick={() => setTitlesDD((titlesDD) => !titlesDD)} />
                    <Filter.Label htmlFor="searchTitles">Title</Filter.Label>
                    <Dropdown width={"100%"} dropdown={titlesDD} flexDirection="column">
                    {titlesList.map((item, index) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchTitles === item) ? "selected" : undefined} key={index} >
                                    <Checkbox noMargin checked={checkSearchTitles(item)} onClick={() => handleSearchTitles(item)} />{item}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(titlesDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer refPointer={locRef}>
                    <Filter.Input readOnly type="text" id="searchLoc" placeholder=" " autoComplete="off" value={searchLoc} onClick={() => setLocDD((locDD) => !locDD)} />
                    <Filter.Label htmlFor="searchLoc">Location</Filter.Label>
                    <Dropdown width={"100%"} dropdown={locDD} flexDirection="column">
                    {locationsList.map((item, index) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchLoc === item) ? "selected" : undefined} key={index} >
                                    <Checkbox noMargin checked={checkSearchLoc(item)} onClick={() => handleSearchLoc(item)} />{item}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(locDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer  refPointer={skillsRef}>
                    <Filter.Input readOnly type="text" id="searchSkills" placeholder=" " autoComplete="off" value={searchSkills} onClick={() => setSkillsDD((skillsDD) => !skillsDD)} />
                    <Filter.Label htmlFor="searchSkills">Skills</Filter.Label>
                    <Dropdown width={"100%"} dropdown={skillsDD} flexDirection="column">
                    {skillsList.map((item, index) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchSkills === item) ? "selected" : undefined} key={index} >
                                    <Checkbox noMargin checked={checkSearchSkills(item)} onClick={() => handleSearchSkills(item)} />{item}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(skillsDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer  refPointer={qualiRef}>
                    <Filter.Input readOnly type="text" id="searchQuali" placeholder=" " autoComplete="off" value={searchQuali} onClick={() => setQualiDD((qualiDD) => !qualiDD)} />
                    <Filter.Label htmlFor="searchQuali">Qualification</Filter.Label>
                    <Dropdown width={"100%"} dropdown={qualiDD} flexDirection="column">
                    {qualificationsList.map((item, index) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchQuali === item) ? "selected" : undefined} key={index} >
                                    <Checkbox noMargin checked={checkSearchQuali(item)} onClick={() => handleSearchQuali(item)} />{item}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(qualiDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer  refPointer={typeRef}>
                    <Filter.Input readOnly type="text" id="searchType" placeholder=" " autoComplete="off" value={searchType} onClick={() => setTypeDD((typeDD) => !typeDD)} />
                    <Filter.Label htmlFor="searchType">Type</Filter.Label>
                    <Dropdown width={"100%"} dropdown={typeDD} flexDirection="column">
                    {jobTypeList.map((item) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchType === item.type) ? "selected" : undefined} key={item.id} onClick={() => changeType(item.type)}>
                                    {item.type}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(typeDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer  refPointer={modeRef}>
                    <Filter.Input readOnly type="text" id="searchMode" placeholder=" " autoComplete="off" value={searchMode} onClick={() => setModeDD((modeDD) => !modeDD)} />
                    <Filter.Label htmlFor="searchMode">Mode</Filter.Label>
                    <Dropdown width={"100%"} dropdown={modeDD} flexDirection="column">
                    {jobModeList.map((item) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchMode === item.mode) ? "selected" : undefined} key={item.id} onClick={() => changeMode(item.mode)}>
                                    {item.mode}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(modeDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer  refPointer={tenureRef}>
                    <Filter.Input readOnly type="text" id="searchTenure" placeholder=" " autoComplete="off" value={searchTenure} onClick={() => setTenureDD((tenureDD) => !tenureDD)} />
                    <Filter.Label htmlFor="searchTenure">Tenure</Filter.Label>
                    <Dropdown width={"100%"} dropdown={tenureDD} flexDirection="column">
                    {jobTenureList.map((item) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchTenure === item.tenure) ? "selected" : undefined} key={item.id} onClick={() => changeTenure(item.tenure)}>
                                    {item.tenure}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(tenureDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer  refPointer={functionRef}>
                    <Filter.Input readOnly type="text" id="searchFunc" placeholder=" " autoComplete="off" value={searchFunc} onClick={() => setFunctionDD((functionDD) => !functionDD)} />
                    <Filter.Label htmlFor="searchFunc">Function</Filter.Label>
                    <Dropdown width={"100%"} dropdown={functionDD} flexDirection="column">
                    {functionsList.map((item, index) => {
                        return <Dropdown.Option noPointer justifyStart selected={(searchFunc === item) ? "selected" : undefined} key={index} >
                                    <Checkbox noMargin checked={checkSearchFunc(item)} onClick={() => handleSearchFunc(item)} />{item}
                                </Dropdown.Option>
                    })}
                    </Dropdown>
                    <Filter.Icon style={{pointerEvents: "none"}}>
                        {(functionDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Filter.Icon>
                </Filter.InputContainer>
                <Filter.InputContainer>
                    <Filter.Input type="number" id="searchExp" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" value={searchExp} onKeyDown={blockInvalidNumber} onChange={({target}) => setSearchExp(target.value)} />
                    <Filter.Label htmlFor="searchExp">Experience</Filter.Label>
                </Filter.InputContainer>
                <Filter.InputContainer>
                    <Filter.Input type="number" id="searchSal" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" value={searchSal} onKeyDown={blockInvalidNumber} onChange={({target}) => setSearchSal(target.value)} />
                    <Filter.Label htmlFor="searchSal">Min. Salary</Filter.Label>
                </Filter.InputContainer>
                <Filter.ButtonGroup marginTop>
                    <Button nofill small marginTop onClick={() => resetFilterFields()}>Reset</Button>
                    <Button small onClick={() => setFiltering(true)}>Apply filters</Button>
                </Filter.ButtonGroup>
            </Filter>
        </Card>
        // </Container>
    );
}