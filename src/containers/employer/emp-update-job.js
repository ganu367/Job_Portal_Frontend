import React, { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Dropdown, Modal, Checkbox } from "../../components";
import { useAxiosPrivate, useAlert, useGetFile, useBase64ToFile, useFileSizeCheck, useValidFileExtension, useLoading, useSecondIndex, useAuth } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { jobTenureList, jobTypeList, jobModeList } from "../../constants";

export default function EmpUpdateJob() {
    const {JWT} = useAuth();
    const getSecondIndex = useSecondIndex();
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const jobFunctionRef = useRef();
    const qualificationRef = useRef();
    const skillRef = useRef();
    const getFile = useGetFile();
    const isFileSizeValid = useFileSizeCheck();
    const isValidFileExtension = useValidFileExtension();
    const dataURLtoFile = useBase64ToFile();
    const params = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const [jobTitle, setJobTitle] = useState("");
    const [hiringFor, setHiringFor] = useState("");
    const [jobDescription, setJobDescription] = useState(""); 
    const [qualification, setQualification] = useState("");
    const [skill, setSkill] = useState("");
    const [expMin, setExpMin] = useState("");
    const [expMax, setExpMax] = useState("");
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [perks, setPerks] = useState(""); 
    const [startDate, setStartDate] = useState("");
    const [jobLoc, setJobLoc] = useState("");
    const [jobTenure, setJobTenure] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobMode, setJobMode] = useState("");
    const [openings, setOpenings] = useState("");
    const [jobFunction, setJobFunction] = useState("");
    const [fileAttach, setFileAttach] = useState([]);
    const [otherDetails, setOtherDetails] = useState("");
    const [detailsReq, setDetailsReq] = useState("");
    
    const [assignment, setAssignment] = useState("");
    const [assignmentAttach, setAssignmentAttach] = useState([]);
    const [assignmentLink, setAssignmentLink] = useState("");

    const [jobFunctionDD, setJobFunctionDD] = useState(false);
    const [jobFunctionList, setJobFunctionList] = useState([]);
    const [jobFunctionModal, setJobFunctionModal] = useState(false);
    const [newJobFunction, setNewJobFunction] = useState("");

    const [qualificationDD, setQualificationDD] = useState(false);
    const [qualificationList, setQualificationList] = useState([]);
    const [qualificationModal, setQualificationModal] = useState(false);
    const [newQualification, setNewQualification] = useState("");

    const [skillDD, setSkillDD] = useState(false);
    const [skillList, setSkillList] = useState([]);
    const [skillModal, setSkillModal] = useState(false);
    const [newSkill, setNewSkill] = useState("");

    const [search, setSearch] = useState("");
    const jobTenureRef = useRef();
    const [jobTenureDD, setJobTenureDD] = useState(false);
    const jobTypeRef = useRef();
    const [jobTypeDD, setJobTypeDD] = useState(false);
    const jobModeRef = useRef();
    const [jobModeDD, setJobModeDD] = useState(false);
    const isInvalid = jobTitle === "" || hiringFor === "" || jobDescription === "" || qualification.length === 0 || skill.length === 0 || expMin === "" || salaryMin === "" || jobLoc === "" || jobTenure === "" || jobType === "" || jobMode === "" || fileAttach.length === 0 || openings === "" || jobFunction === "";

    const [generalTab, setGeneralTab] = useState(true);
    const [assignmentTab,setAssignmentTab] = useState(false);

    const isValidURL = (url) => {
        return /((https?:\/\/)?(www\.)?([a-z0-9]+\.)?[^\s]+)/gi.test(url);
        // return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(url);
        // return /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(url);
    }

    const resetGeneralInputFields = () => {
        setJobTitle("");
        setHiringFor("");
        setJobDescription("");
        setQualification("");
        setSkill("");
        setExpMin("");
        setExpMax("");
        setSalaryMin("");
        setSalaryMax("");
        setPerks("");
        setStartDate("");
        setJobLoc("");
        setJobTenure("");
        setJobType("");
        setJobMode("");
        setOpenings("");
        setJobFunction("");
        setFileAttach([]);
        setOtherDetails("");
        setDetailsReq("");
    }
    const resetAssignmentInputFields = () => {
        setAssignment("");
        setAssignmentAttach([]);
        setAssignmentLink("");
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(jobTenureDD && !jobTenureRef?.current?.contains(e.target)) {
                setJobTenureDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [jobTenureDD, jobTenureRef]);
    const changeJobTenure = (item) => {
        setJobTenure(item);
        setSearch("");
        setJobTenureDD(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(jobTypeDD && !jobTypeRef?.current?.contains(e.target)) {
                setJobTypeDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [jobTypeDD, jobTypeRef]);
    const changeJobType = (item) => {
        setJobType(item);
        setSearch("");
        setJobTypeDD(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(jobModeDD && !jobModeRef?.current?.contains(e.target)) {
                setJobModeDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [jobModeDD, jobModeRef]);
    const changeJobMode = (item) => {
        setJobMode(item);
        setSearch("");
        setJobModeDD(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(jobFunctionDD && !jobFunctionRef?.current?.contains(e.target)) {
                setJobFunctionDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [jobFunctionDD, jobFunctionRef]);
    const changeJobFunction = (item) => {
        setJobFunction(item);
        setJobFunctionDD(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(qualificationDD && !qualificationRef?.current?.contains(e.target)) {
                setQualificationDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [qualificationDD, qualificationRef]);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(skillDD && !skillRef?.current?.contains(e.target)) {
                setSkillDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [skillDD, skillRef]);

    const toggleGeneralTab = () => {
        setGeneralTab(true);
        setAssignmentTab(false);
    }
    const toggleAssignmentTab = () => {
        setGeneralTab(false);
        setAssignmentTab(true);
    }

    const fileAttachHandler = (docs) => {
        const fileList = []
        for(let i = 0; i < docs.length; i++) {
            fileList.push(docs[i]);
        }
        setFileAttach(fileList);
    }
    const assignmentAttachHandler = (docs) => {
        const fileList = []
        for(let i = 0; i < docs.length; i++) {
            fileList.push(docs[i]);
        }
        setAssignmentAttach(fileList);
    }

    const removeFileAttach = (filename) => {
        setFileAttach(fileAttach.filter((file) => file.name !== filename));
    }
    const removeAssignmentAttach = (filename) => {
        setAssignmentAttach(assignmentAttach.filter((file) => file.name !== filename));
    }

    // useEffect(() => {
    //     console.log(fileAttach);
    //     console.log(assignmentAttach);
    // }, [fileAttach,assignmentAttach]);

    const fileHandler = (file,filePath) => {
        if(filePath === "fileAttach") {
            if(file !== undefined) {
                setFileAttach([file]);
            }
            else {
                setFileAttach([]);
            }
        }
        else {
            if(file !== undefined) {
                setAssignmentAttach([file]);
            }
            else {
                setAssignmentAttach([]);
            }
        }
    }
    const viewFile = async (path, filePath) => {
        try {
            const response = await axiosPrivate.get("/api/utility/send-file", {params: {file_path: path}}, {responseType: "arraybuffer"});
            if(response?.data) {
                const previewURL = "data:image/jpeg;base64," + response?.data;
                var subPath = path.substring(path.lastIndexOf('/'));
                const docFile = dataURLtoFile(previewURL, subPath.substring(getSecondIndex(subPath,'_')), {type: "application/octet-stream"});
                // const docFile = dataURLtoFile(previewURL, path.substring(path.lastIndexOf('/')+9), {type: "application/octet-stream"});
                fileHandler(docFile,filePath);
            }
            else {
                throw new Error();
            }
        }
        catch (err) {
            setAlert({msg: err.message, type: "error"});
        }
    }

    useEffect(() => {
        axiosPrivate
        .get("/api/employer/job/get-jobs/"+params.id)
        .then(function (response) {
            // console.log(response?.data);
            const job = response?.data;
            setJobTitle(job?.job_title ? job?.job_title : "");
            setHiringFor(job?.hiring_for ? job?.hiring_for : "");
            setJobDescription(job?.job_desc ? job?.job_desc : "");
            setQualification(job?.qualification ? job?.qualification.split(",") : "");
            setSkill(job?.skill ? job?.skill.split(",") : "");
            setExpMin(job?.experience_min ? job?.experience_min : "0");
            setExpMax(job?.experience_max ? job?.experience_max : "");
            setSalaryMin(job?.salary_min ? job?.salary_min : "0");
            setSalaryMax(job?.salary_max ? job?.salary_max : "");
            setPerks(job?.perks ? job?.perks : "");
            setStartDate(job?.started_date ? (job?.started_date).substring(0, 10) : "");
            setJobLoc(job?.job_location ? job?.job_location : "");
            setJobTenure(job?.job_tenuer ? job?.job_tenuer : "");
            setJobType(job?.job_type ? job?.job_type : "");
            setJobMode(job?.job_mode ? job?.job_mode : "");
            setOpenings(job?.no_of_openings ? job?.no_of_openings : "");
            setJobFunction(job?.job_function ? job?.job_function : "");
            setOtherDetails(job?.other_details ? job?.other_details : "");
            setDetailsReq(job?.required_details ? job?.required_details : "");
            setAssignment(job?.assignment ? job?.assignment : "");
            setAssignmentLink(job?.assignment_link ? job?.assignment_link : "");
            if(job?.job_file !== null) {
                viewFile(job?.job_file,"fileAttach");
            }
            if(job?.assignment_file !== null) {
                viewFile(job?.assignment_file,"assignmentAttach");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/employer/dashboard", {state: { from: location }});
        });
    },[]);

    const handleUpdateJob = () => {
        // if(startDate !== "") {
        //     let enteredDate = new Date(startDate);
        //     let today = new Date();
        //     if (today >= enteredDate) {
        //         setAlert({msg: `Error: Invalid start date!`, type: "error"});
        //         return;
        //     }
        // }
        if(assignment === "") {
            setAssignmentAttach([]);
            setAssignmentLink("");
        }
        if(expMax !== "" && parseInt(expMax) <= parseInt(expMin)) {
            setAlert({msg: `Error: Max experience cannot be less than min experience!`, type: "error"});
            return;
        }
        if(salaryMax !== "" && parseInt(salaryMax) <= parseInt(salaryMin)) {
            setAlert({msg: `Error: Max salary cannot be less than min salary!`, type: "error"});
            return;
        }
        if (assignmentLink !== "") {
            if(!isValidURL(assignmentLink)) {
                setAlert({msg: `Error: Assignment link is invalid!`, type: "error"});
                return;
            }
        }
        if (assignmentAttach.length !== 0) {
            if (!isValidFileExtension(assignmentAttach[0].name,["pdf","docx","xlsx"])) {
                setAlert({msg: "Type of Assignment Attachment invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(assignmentAttach[0].size)) {
                setAlert({msg: "Assignment File size limit is 1MB", type: "error"});
                return;
            }
        }
        if (fileAttach.length !== 0) {
            if (!isValidFileExtension(fileAttach[0].name,["pdf","docx","xlsx"])) {
                setAlert({msg: "Type of File Attachment invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(fileAttach[0].size)) {
                setAlert({msg: "File attachment size limit is 1MB", type: "error"});
                return;
            }
        }
        setLoading(true);
        axiosPrivate
        .put("/api/employer/job/update-job-post/"+params.id, {title: jobTitle, hiring_for: hiringFor, description: jobDescription, qualification: qualification.toString(), skill: skill.toString(), experience_min: expMin, experience_max: expMax, salary_min: salaryMin, salary_max: salaryMax, perks: perks, started_date: startDate, job_location: jobLoc, job_tenuer: jobTenure, job_type: jobType, job_mode: jobMode, no_of_openings: openings, job_files: fileAttach[0], other_details: otherDetails, required_details: detailsReq, assignment: assignment, assignment_files: assignmentAttach[0], assignment_link: assignmentLink, job_function: jobFunction},
        {headers: {
            "Content-Type": "multipart/form-data"
        }})
        .then(function (response) {
            setLoading(false);
            // console.log(response)
            setAlert({msg: `Success: ${response?.data[0]}`, type: "success"});
            navigate("/employer/job/"+params.id, {state: { from: location }});
        })
        .catch(function (error) {
            setLoading(false);
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // console.log(error)
        });
    }

    const openingsHandler = (num) => {
        if ((num >= 1) || num == "") {
            setOpenings(num.replace(/^0+/, ''));
        }
    }
    const expMinHandler = (num) => {
        if ((num >= 1) || num == "") {
            setExpMin(num.replace(/^0+/, ''));
        }
        if (num == 0) {
            setExpMin(num.replace(/^0+/, 0))
        }
    }
    const salMinHandler = (num) => {
        if ((num >= 1) || num == "") {
            setSalaryMin(num.replace(/^0+/, ''));
        }
        if (num == 0) {
            setSalaryMin(num.replace(/^0+/, 0))
        }
    }
    const expMaxHandler = (num) => {
        if ((num >= 1) || num == "") {
            setExpMax(num.replace(/^0+/, ''));
        }
    }
    const salMaxHandler = (num) => {
        if ((num >= 1) || num == "") {
            setSalaryMax(num.replace(/^0+/, ''));
        }
    }

    const showJobFunction = () => {
        axiosPrivate
        .get("/api/job-function/show-job-functions")
        .then(function (response) {
            // console.log(response?.data);
            setJobFunctionList(response?.data);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/employer/dashboard");
        });
    }

    useEffect(() => {
        showJobFunction();
    }, []);

    const handleAddNewJobFunction = () => {
        const lowerCaseNewJobFunction = newJobFunction.charAt(0).toUpperCase() + newJobFunction.slice(1).toLowerCase();
        const isNotPresent = jobFunctionList.every((item) => {
            // console.log(lowerCaseNewJobFunction, " != ",item.job_function, " ? ",lowerCaseNewJobFunction !== item.job_function);
            return lowerCaseNewJobFunction !== item.job_function;
        });
        if(isNotPresent) {
            axiosPrivate
            .post("/api/job-function/create-job-function", {job_function: lowerCaseNewJobFunction}, 
            {headers: {
                "Content-Type": "application/json"
            }})
            .then(function (response) {
                // console.log(response?.data)
                setAlert({msg: `Success: ${response?.data[0]}`, type: "success"});
            })
            .then(() => {
                setNewJobFunction("");
                setJobFunctionModal(false);
                setJobFunction(lowerCaseNewJobFunction);
                showJobFunction();
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
        else {
            setAlert({msg: `Error: Job Function already exists!`, type: "error"});
        }
    }

    const showQualification = () => {
        axiosPrivate
        .get("/api/qualification/show-qualifications")
        .then(function (response) {
            // console.log(response?.data);
            setQualificationList(response?.data);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/employer/dashboard");
        });
    }

    useEffect(() => {
        showQualification();
    }, []);

    const handleAddNewQualification = () => {
        const lowerCaseNewQualification = newQualification.charAt(0).toUpperCase() + newQualification.slice(1).toLowerCase();
        const isNotPresent = qualificationList.every((item) => {
            // console.log(lowerCaseNewQualification, " != ",item.job_function, " ? ",lowerCaseNewQualification !== item.job_function);
            return lowerCaseNewQualification !== item.job_function;
        });
        if(isNotPresent) {
            axiosPrivate
            .post("/api/qualification/create-qualification", {qualification: lowerCaseNewQualification}, 
            {headers: {
                "Content-Type": "application/json"
            }})
            .then(function (response) {
                // console.log(response?.data)
                setAlert({msg: `Success: ${response?.data[0]}`, type: "success"});
            })
            .then(() => {
                setNewQualification("");
                setQualificationModal(false);
                handleQualification(lowerCaseNewQualification);
                showQualification();
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
        else {
            setAlert({msg: `Error: Qualification already exists!`, type: "error"});
        }
    }

    const showSkill = () => {
        axiosPrivate
        .get("/api/skill/show-skills")
        .then(function (response) {
            // console.log(response?.data);
            setSkillList(response?.data);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/employer/dashboard");
        });
    }

    useEffect(() => {
        showSkill();
    }, []);

    const handleAddNewSkill = () => {
        const lowerCaseNewSkill = newSkill.charAt(0).toUpperCase() + newSkill.slice(1).toLowerCase();
        const isNotPresent = skillList.every((item) => {
            // console.log(lowerCaseNewSkill, " != ",item.job_function, " ? ",lowerCaseNewSkill !== item.job_function);
            return lowerCaseNewSkill !== item.job_function;
        });
        if(isNotPresent) {
            axiosPrivate
            .post("/api/skill/create-skill", {skill: lowerCaseNewSkill}, 
            {headers: {
                "Content-Type": "application/json"
            }})
            .then(function (response) {
                // console.log(response?.data)
                setAlert({msg: `Success: ${response?.data[0]}`, type: "success"});
            })
            .then(() => {
                setNewSkill("");
                setSkillModal(false);
                handleSkill(lowerCaseNewSkill);
                showSkill();
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
        else {
            setAlert({msg: `Error: Skill already exists!`, type: "error"});
        }
    }

    const handleSkill = (sname) => {
        if (!skill.includes(sname)) {
            setSkill([...skill, sname]);
        }
        else {
            setSkill(skill.filter((item) => item !== sname));
        }
    }
    const checkSkill = (sname) => {
        return (skill.includes(sname));
    }
    const handleQualification = (sname) => {
        if (!qualification.includes(sname)) {
            setQualification([...qualification, sname]);
        }
        else {
            setQualification(qualification.filter((item) => item !== sname));
        }
    }
    const checkQualification = (sname) => {
        return (qualification.includes(sname));
    }

    return (
        <>
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>Update Job</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => navigate(-1)}><Button.Icon alone><FaTimes /></Button.Icon></Button> {/* `/employer/job/${params.id}`, {state: { from: location }} */}
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.ButtonGroup flexStart marginLeft marginBottom>
                <Button small nofill={!generalTab} onClick={() => toggleGeneralTab()}>General details</Button>
                <Button small nofill={!assignmentTab} onClick={() => toggleAssignmentTab()}>Assignment details</Button>
            </Card.ButtonGroup>
            {generalTab && 
                <>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="jobTitle" placeholder=" " autoComplete="off" value={jobTitle} onChange={({target}) => setJobTitle(target.value)} />
                            <Card.Label htmlFor="jobTitle" mandatory>Job Title</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="hiringFor" placeholder=" " autoComplete="off" value={hiringFor} onChange={({target}) => setHiringFor(target.value)} />
                            <Card.Label htmlFor="hiringFor" mandatory>Hiring For</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        {/* <Card.InputContainer>
                            <Card.Input type="text" id="jobFunction" placeholder=" " autoComplete="off" value={jobFunction} onChange={({target}) => setJobFunction(target.value)} />
                            <Card.Label htmlFor="jobFunction" mandatory>Job Function</Card.Label>
                        </Card.InputContainer> */}
                        <Card.InputContainer refPointer={jobFunctionRef}>
                            <Card.Input readOnly type="text" id="jobFunction" placeholder=" " autoComplete="off" value={jobFunction} onClick={() => setJobFunctionDD((jobFunctionDD) => !jobFunctionDD)} />
                            <Card.Label htmlFor="jobFunction" mandatory>Job Function</Card.Label>
                            <Card.Dropdown dropdown={jobFunctionDD} flexDirection="column">
                                {jobFunctionList.map((item) => {
                                    return <Card.Option selected={(jobFunction === item.job_function) ? "selected" : undefined} key={item.id} onClick={({target}) => changeJobFunction(item.job_function)}>{item.job_function}</Card.Option>
                                })}
                                <Card.OptionButton onClick={() => setJobFunctionModal(true)}><Button>Add new</Button></Card.OptionButton>
                            </Card.Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(jobFunctionDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.Input type="text" id="openings" placeholder=" " autoComplete="off" value={openings} onChange={({target}) => openingsHandler(target.value)} />
                            <Card.Label htmlFor="openings" mandatory>Openings</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Textarea type="text" id="jobDescription" placeholder=" " autoComplete="off" value={jobDescription} onChange={({target}) => setJobDescription(target.value)} />
                            <Card.Label htmlFor="jobDescription" mandatory>Job Description</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        {/* <Card.InputContainer>
                            <Card.Input type="text" id="qualification" placeholder=" " autoComplete="off" value={qualification} onChange={({target}) => setQualification(target.value)} />
                            <Card.Label htmlFor="qualification" mandatory>Qualification required</Card.Label>
                        </Card.InputContainer> */}
                        <Card.InputContainer refPointer={qualificationRef}>
                            <Card.Input readOnly type="text" id="qualification" placeholder=" " autoComplete="off" value={qualification} onClick={() => setQualificationDD((qualificationDD) => !qualificationDD)} />
                            <Card.Label htmlFor="qualification" mandatory>Qualification required</Card.Label>
                            <Card.Dropdown dropdown={qualificationDD} flexDirection="column">
                                {qualificationList.map((item) => {
                                    return <Card.Option noPointer justifyStart selected={(qualification === item.qualification) ? "selected" : undefined} key={item.id} >
                                                <Checkbox noMargin checked={checkQualification(item.qualification)} onClick={() => handleQualification(item.qualification)} />{item.qualification}
                                            </Card.Option>
                                })}
                                <Card.OptionButton onClick={() => setQualificationModal(true)}><Button>Add new</Button></Card.OptionButton>
                            </Card.Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(qualificationDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                        {/* <Card.InputContainer>
                            <Card.Input type="text" id="skills" placeholder=" " autoComplete="off" value={skills} onChange={({target}) => setSkills(target.value)} />
                            <Card.Label htmlFor="skills" mandatory>Skills required</Card.Label>
                        </Card.InputContainer> */}
                        <Card.InputContainer refPointer={skillRef}>
                            <Card.Input readOnly type="text" id="skill" placeholder=" " autoComplete="off" value={skill} onClick={() => setSkillDD((skillDD) => !skillDD)} />
                            <Card.Label htmlFor="skill" mandatory>Skills required</Card.Label>
                            <Card.Dropdown dropdown={skillDD} flexDirection="column">
                                {skillList.map((item) => {
                                    return <Card.Option noPointer justifyStart selected={(skill === item.skill) ? "selected" : undefined} key={item.id} >
                                                <Checkbox noMargin checked={checkSkill(item.skill)} onClick={() => handleSkill(item.skill)} />{item.skill}
                                            </Card.Option>
                                })}
                                <Card.OptionButton onClick={() => setSkillModal(true)}><Button>Add new</Button></Card.OptionButton>
                            </Card.Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(skillDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer suffix={"years"}>
                            <Card.Input type="text" id="expMin" placeholder=" " autoComplete="off" value={expMin} onChange={({target}) => expMinHandler(target.value)} />
                            <Card.Label htmlFor="expMin" mandatory>Minimum Experience</Card.Label>
                        </Card.InputContainer>
                        <Card.InputContainer suffix={"years"}>
                            <Card.Input type="text" id="expMax" placeholder=" " autoComplete="off" value={expMax} onChange={({target}) => expMaxHandler(target.value)} />
                            <Card.Label htmlFor="expMax">Maximum Experience</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="salaryMin" placeholder=" " autoComplete="off" value={salaryMin} onChange={({target}) => salMinHandler(target.value)} />
                            <Card.Label htmlFor="salaryMin" mandatory>Minimum Salary</Card.Label>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.Input type="text" id="salaryMax" placeholder=" " autoComplete="off" value={salaryMax} onChange={({target}) => salMaxHandler(target.value)} />
                            <Card.Label htmlFor="salaryMax">Maximum Salary</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="perks" placeholder=" " autoComplete="off" value={perks} onChange={({target}) => setPerks(target.value)} />
                            <Card.Label htmlFor="perks">Perks & Benefits</Card.Label>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.Input type="date" id="startDate" placeholder=" " onKeyDown={(e) => e.preventDefault()} autoComplete="off" value={startDate} onChange={({ target }) => setStartDate(target.value)} />
                            <Card.Label htmlFor="startDate">Start Date</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="jobLoc" placeholder=" " autoComplete="off" value={jobLoc} onChange={({target}) => setJobLoc(target.value)} />
                            <Card.Label htmlFor="jobLoc" mandatory>Job Location</Card.Label>
                        </Card.InputContainer>
                        <Card.InputContainer refPointer={jobTenureRef}>
                            <Card.Input readOnly type="text" id="jobTenure" placeholder=" " autoComplete="off" value={jobTenure} onClick={() => setJobTenureDD((jobTenureDD) => !jobTenureDD)} />
                            <Card.Label htmlFor="jobTenure" mandatory>Job Tenure</Card.Label>
                            <Dropdown width={"100%"} dropdown={jobTenureDD} flexDirection="column">
                                {jobTenureList.map((item) => {
                                    return <Dropdown.Option selected={(jobTenure === item.tenure) ? "selected" : undefined} key={item.id} onClick={() => changeJobTenure(item.tenure)}>{item.tenure}</Dropdown.Option>
                                })}
                            </Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(jobTenureDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                        <Card.InputContainer refPointer={jobTypeRef}>
                            <Card.Input readOnly type="text" id="jobType" placeholder=" " autoComplete="off" value={jobType} onClick={() => setJobTypeDD((jobTypeDD) => !jobTypeDD)} />
                            <Card.Label htmlFor="jobType" mandatory>Job Type</Card.Label>
                            <Dropdown width={"100%"} dropdown={jobTypeDD} flexDirection="column">
                                {jobTypeList.map((item) => {
                                    return <Dropdown.Option selected={(jobType === item.type) ? "selected" : undefined} key={item.id} onClick={() => changeJobType(item.type)}>{item.type}</Dropdown.Option>
                                })}
                            </Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(jobTypeDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                        <Card.InputContainer refPointer={jobModeRef}>
                            <Card.Input readOnly type="text" id="jobMode" placeholder=" " autoComplete="off" value={jobMode} onClick={() => setJobModeDD((jobModeDD) => !jobModeDD)} />
                            <Card.Label htmlFor="jobMode" mandatory>Job Mode</Card.Label>
                            <Dropdown width={"100%"} dropdown={jobModeDD} flexDirection="column">
                                {jobModeList.map((item) => {
                                    return <Dropdown.Option selected={(jobMode === item.mode) ? "selected" : undefined} key={item.id} onClick={() => changeJobMode(item.mode)}>{item.mode}</Dropdown.Option>
                                })}
                            </Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(jobModeDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input file={fileAttach?.name} type="file" accept=".pdf,.docx,.doc,.xlsx" id="fileAttach" placeholder=" " autoComplete="off" onChange={({ target }) => fileAttachHandler(target.files)} />
                            <Card.Label htmlFor="fileAttach" mandatory>File Attachment</Card.Label>
                            <Card.Placeholder visible={fileAttach.length === 0 ? true : false}>
                                Max size 1MB
                            </Card.Placeholder>
                            <Card.Tooltip>
                                File size should be less than 1MB. File types can be .pdf, .docx, .xlsx
                            </Card.Tooltip>
                        </Card.InputContainer>
                        {fileAttach.map((doc) => {
                            return (
                            <Card.InputContainer key={doc.name}>
                                <Card.FilePreview>
                                    <Card.FileProp>Name: {doc.name}</Card.FileProp>
                                    <Card.FileProp>Size: {((doc.size)/1000000).toFixed(2)}MB</Card.FileProp>
                                    <Card.FileIcon onClick={() => removeFileAttach(doc.name)}><AiFillDelete /></Card.FileIcon>
                                </Card.FilePreview>
                            </Card.InputContainer>
                            );
                        })}
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Textarea type="text" id="otherDetails" placeholder=" " autoComplete="off" value={otherDetails} onChange={({target}) => setOtherDetails(target.value)} />
                            <Card.Label htmlFor="otherDetails">Other Details</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Textarea type="text" id="detailsReq" placeholder=" " autoComplete="off" value={detailsReq} onChange={({target}) => setDetailsReq(target.value)} />
                            <Card.Label htmlFor="detailsReq">Details Required from Candidate</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                </>
            }
            {assignmentTab && 
                <>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Textarea type="text" id="assignment" placeholder=" " autoComplete="off" value={assignment} onChange={({target}) => setAssignment(target.value)} />
                            <Card.Label htmlFor="assignment">Assignment</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    {assignment !== "" &&
                        <>
                            <Card.InputColumn>
                                <Card.InputContainer>
                                    <Card.Input file={assignmentAttach?.name} type="file" accept=".pdf,.docx,.doc,.xlsx" id="assignmentAttach" placeholder=" " autoComplete="off" onChange={({ target }) => assignmentAttachHandler(target.files)} />
                                    <Card.Label htmlFor="assignmentAttach">Assignment Attachment</Card.Label>
                                    <Card.Placeholder visible={assignmentAttach.length === 0 ? true : false}>
                                        Max size 1MB
                                    </Card.Placeholder>
                                    <Card.Tooltip>
                                        File size should be less than 1MB. File types can be .pdf, .docx, .xlsx
                                    </Card.Tooltip>
                                </Card.InputContainer>
                                {assignmentAttach.map((doc) => {
                                    return (
                                        <Card.InputContainer key={doc.name}>
                                        <Card.FilePreview>
                                            <Card.FileProp>Name: {doc.name}</Card.FileProp>
                                            <Card.FileProp>Size: {((doc.size)/1000000).toFixed(2)}MB</Card.FileProp>
                                            <Card.FileIcon onClick={() => removeAssignmentAttach(doc.name)}><AiFillDelete /></Card.FileIcon>
                                        </Card.FilePreview>
                                    </Card.InputContainer>
                                    );
                                })}
                            </Card.InputColumn>
                            <Card.InputColumn>
                                <Card.InputContainer>
                                    <Card.Input type="text" id="assignmentLink" placeholder=" " autoComplete="off" value={assignmentLink} onChange={({target}) => setAssignmentLink(target.value)} />
                                    <Card.Label htmlFor="assignmentLink">Link</Card.Label>
                                </Card.InputContainer>
                            </Card.InputColumn>
                        </>
                    }
                </>
            }
            <Card.ButtonGroup marginTop>
                {generalTab && <Button nofill onClick={() => resetGeneralInputFields()}>Reset</Button>}
                {assignmentTab && <Button nofill onClick={() => resetAssignmentInputFields()}>Reset</Button>}
                <Button disabled={isInvalid} onClick={() => handleUpdateJob()}>Update job</Button>
            </Card.ButtonGroup>
        </Card>
        {(jobFunctionModal) ?
            <Modal>
                <Modal.Container>
                    <Modal.Title>Add new Job Function</Modal.Title>
                    <Modal.Line />
                    <Modal.InputContainer>
                        <Modal.Input type="text" id="newJobFunction" placeholder=" " autoComplete="off" value={newJobFunction} onChange={({target}) => setNewJobFunction(target.value)} />
                        <Modal.Label htmlFor="newJobFunction">New Job Function</Modal.Label>
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setJobFunctionModal(false);
                            setNewJobFunction("");
                        }}>Cancel</Button>
                        <Button onClick={() => handleAddNewJobFunction()}>Confirm</Button>
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
        : null}
        {(skillModal) ?
            <Modal>
                <Modal.Container>
                    <Modal.Title>Add new Skill</Modal.Title>
                    <Modal.Line />
                    <Modal.InputContainer>
                        <Modal.Input type="text" id="newSkill" placeholder=" " autoComplete="off" value={newSkill} onChange={({target}) => setNewSkill(target.value)} />
                        <Modal.Label htmlFor="newSkill">New Skill</Modal.Label>
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setSkillModal(false);
                            setNewSkill("");
                        }}>Cancel</Button>
                        <Button onClick={() => handleAddNewSkill()}>Confirm</Button>
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
        : null}
        {(qualificationModal) ?
            <Modal>
                <Modal.Container>
                    <Modal.Title>Add new Qualification</Modal.Title>
                    <Modal.Line />
                    <Modal.InputContainer>
                        <Modal.Input type="text" id="newQualification" placeholder=" " autoComplete="off" value={newQualification} onChange={({target}) => setNewQualification(target.value)} />
                        <Modal.Label htmlFor="newQualification">New Qualification</Modal.Label>
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setQualificationModal(false);
                            setNewQualification("");
                        }}>Cancel</Button>
                        <Button onClick={() => handleAddNewQualification()}>Confirm</Button>
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
        : null}
        </>
    );
}