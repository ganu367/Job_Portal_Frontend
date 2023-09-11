import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EmpCommentModal } from "../../containers";
import { Card, Filter, Button, PostCard, Checkbox, Pagination, Dropdown } from "../../components";
import { useAxiosPrivate, useAlert, useLoading } from "../../hooks";
import { jobTenureList, jobTypeList, jobModeList } from "../../constants";
import { FaTimes } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";

export default function EmpJobCandidate({children}) {
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const scrollCandsRef = useRef(null);
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [candidatesList, setCandidatesList] = useState([]);
    const [selected, setSelected] = useState([]);
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const [jobTitle, setJobTitle] = useState("");

    const [commentModal, setCommentModal] = useState(false);
    const [comment, setComment] = useState("");

    const resetFilterFields = () => {
        setSearchLoc("");
        setSearchSkills("");
        setSearchQuali("");
        setSearchType("");
        setSearchMode("");
        setSearchTenure("");
        setSearchExp("");
        setSearchSal("");
    }

    useEffect(() => {
        axiosPrivate
        .get("/search/employer/filter-values")
        .then(function (response) {
            // console.log(response?.data);
            setLocationsList(response?.data?.locations);
            setSkillsList(response?.data?.skills);
            setQualificationsList(response?.data?.qualifications);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
        if(params?.id || params?.jobID) {
            let jobID = params?.id || params?.jobID;
            axiosPrivate
            .get("/api/employer/job/get-job-status/"+jobID)
            .then(function (response) {
                setJobTitle(response?.data?.job_title);
                if (response?.data?.status === "Open") {
                    setShowComponent(true);
                }
                else {
                    setShowComponent(false);
                }
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
    },[]);

    const [showComponent, setShowComponent] = useState("");
    const [action, setAction] = useState("");
    const [filtering, setFiltering] = useState(false);
    const [locationsList, setLocationsList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [qualificationsList, setQualificationsList] = useState([]);

    const [searchLoc, setSearchLoc] = useState([]);
        const locRef = useRef();
        const [locDD, setLocDD] = useState(false);
    const [searchSkills, setSearchSkills] = useState([]);
        const skillsRef = useRef();
        const [skillsDD, setSkillsDD] = useState(false);
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
    const [searchExp, setSearchExp] = useState("");
    const [searchSal, setSearchSal] = useState("");

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
    const handleSelectedAll = () => {
        if (selected.length !== candidatesList.length) {
            setSelected(candidatesList.map((candidate) => candidate.id));
        }
        else {
            setSelected([]);
        }
    }
    const checkSelected = (id) => {
        return (selected.includes(id));
    }
    const checkSelectedAll = () => {
        return (candidatesList.every((candidate) => {
            return (selected.includes(candidate.id));
        }));
    }

    const viewCandidates = () => {
        axiosPrivate
        .post(`/search/employer/filtered-candidates/`+params.id+"/"+currentPage, {location: searchLoc.toString(), skill: searchSkills.toString(), qualification: searchQuali.toString(), type: searchType, mode: searchMode, tenure: searchTenure, exp: searchExp, sal: searchSal},
        {headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }})
        .then(function (response) {
            // console.log(response?.data);
            setCandidatesList(response?.data?.candidates);
            setnPages(Math.ceil(response?.data?.total_applied_candidates / recordsPerPage));
            scrollToRef(scrollCandsRef);
            setSelected([]);
            setFiltering(false);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    useEffect(() => {
        viewCandidates();
    }, [currentPage, filtering])

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

    const scrollToRef = (ref) => {
        ref.current.scroll({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // console.log("action: ",action);
        if (action !== "") {
            setCommentModal(true);
        }
    }, [action]);

    const handleAction = () => {
        let path = ""
        if(action === "Mark as Interested") {
            path = "/api/employer/job/job-intrest/";
        }
        else if(action === "Shortlist") {
            path = "/api/employer/job/job-shortlist/";
        }
        else if(action === "Hire") {
            path = "/api/employer/job/job-hire/";
        }
        else if(action === "Reject") {
            path = "/api/employer/job/job-reject/";
        }
        setLoading(true);
        axiosPrivate
        .post(path+params.id+"/"+selected[0], {employer_comment: comment},
        {headers:{ "Content-Type" : "application/json"}})
        .then(function (response) {
            setLoading(false);
            setAlert({msg: `Success: ${response?.data}`, type: "success"});
            setCommentModal(false);
            setComment("");
            // viewAppliedCandidates();
            viewCandidates();
            setAction("");
        })
        .catch(function (error) {
            setLoading(false);
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    return (
        // <Container>
        <>
        <Card rowDirection noPadding>
            <Card.RestContainer>
                <PostCard>
                    <Card.Title>{jobTitle}{jobTitle && " - "}Candidates</Card.Title>
                    <PostCard.Line />
                    <Card.Note small><Card.NoteIcon small><AiOutlineInfoCircle /></Card.NoteIcon>Message the candidates that you're interested to hire!</Card.Note>
                    {showComponent &&
                        <PostCard.Row noMargin>
                            <PostCard.ButtonGroup flexStart marginBottom>
                                {/* <Button small disabled={selected.length === 0} onClick={() => setAction("Shortlist")}>Shortlist</Button>
                                <Button small disabled={selected.length === 0} onClick={() => setAction("Hire")}>Hire</Button>
                                <Button danger small disabled={selected.length === 0} onClick={() => setAction("Reject")}>Reject</Button> */}
                            </PostCard.ButtonGroup>
                        </PostCard.Row>
                    }
                    <PostCard.Window refPointer={scrollCandsRef}>
                        {candidatesList.map((candidate) => {
                            return (
                                <PostCard.Post key={candidate.id}>
                                    <PostCard.Column fullHeight width="fit-content">
                                        <PostCard.Row>
                                            <Checkbox checked={checkSelected(candidate.id)} onClick={() => handleSelected(candidate.id)} />
                                        </PostCard.Row>
                                    </PostCard.Column>
                                    <PostCard.Column fullHeight width="100%">
                                        <PostCard.Row>
                                            <PostCard.Group>
                                                <PostCard.Column width="90%">
                                                    <PostCard.Title>{candidate.name}</PostCard.Title>
                                                    <PostCard.SmallText>{candidate.current_location}</PostCard.SmallText>
                                                </PostCard.Column>
                                            </PostCard.Group>
                                        </PostCard.Row>
                                        <PostCard.Row center>
                                            <PostCard.Label paddingRight>Qualification: </PostCard.Label>
                                            <PostCard.Text>{candidate.qualification}</PostCard.Text>
                                        </PostCard.Row>
                                        <PostCard.Row center>
                                            <PostCard.Label paddingRight>Skills: </PostCard.Label>
                                            <PostCard.Text>{candidate.skill}</PostCard.Text>
                                        </PostCard.Row>
                                        <PostCard.Row center>
                                            <PostCard.Label paddingRight>Experience: </PostCard.Label>
                                            <PostCard.Text>{candidate.total_no_of_years_exp} years</PostCard.Text>
                                            <PostCard.Dash>&</PostCard.Dash>
                                            <PostCard.Text>{candidate.total_no_of_month_exp} months</PostCard.Text>
                                        </PostCard.Row>
                                        <PostCard.Row center>
                                            <PostCard.Label paddingRight>Profile: </PostCard.Label>
                                            <PostCard.Text>
                                                {candidate?.profile_summery?.substring(0,250)}...
                                            </PostCard.Text>
                                        </PostCard.Row>
                                        <PostCard.Line />
                                        <PostCard.Row center flexEnd noMargin>
                                        <Button small onClick={() => navigate(`/employer/job/${params.id}/candidate/${candidate.id}`, {state: {from: location, status: "notApplied"}})}>View Profile</Button>
                                        <Button noMargin small iconPadding onClick={() => navigate(`/employer/job/${params.id}/chat`, {state: {from: location, candidateID: candidate.id}})}><Button.Icon alone><BiMessageDetail /></Button.Icon></Button>
                                        </PostCard.Row>
                                    </PostCard.Column>
                                </PostCard.Post>
                            );
                        })}
                        {candidatesList.length === 0 &&
                            <PostCard.SpecialRow>
                                No candidates to display!
                            </PostCard.SpecialRow>
                        }
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
                    <Button iconPadding small danger onClick={() => navigate("/employer/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Filter.InputColumn>
                <Filter.Line />
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
                <Filter.InputContainer>
                    <Filter.Input type="number" id="searchExp" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" value={searchExp} onKeyDown={blockInvalidNumber} onChange={({target}) => setSearchExp(target.value)} />
                    <Filter.Label htmlFor="searchExp">Min. Experience</Filter.Label>
                </Filter.InputContainer>
                <Filter.InputContainer>
                    <Filter.Input type="number" id="searchSal" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" value={searchSal} onKeyDown={blockInvalidNumber} onChange={({target}) => setSearchSal(target.value)} />
                    <Filter.Label htmlFor="searchSal">Min. Expected Salary</Filter.Label>
                </Filter.InputContainer>
                <Filter.ButtonGroup marginTop>
                    <Button nofill small marginTop onClick={() => resetFilterFields()}>Reset</Button>
                    <Button small onClick={() => setFiltering(true)}>Apply filters</Button>
                </Filter.ButtonGroup>
            </Filter>
        </Card>
        {(commentModal) ?
            <EmpCommentModal action={action} comment={comment} setComment={setComment} setCommentModal={setCommentModal} handleAction={handleAction} setAction={setAction} />
        : null}
        </>
        // </Container>
    );
}