import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useGetFile, useGoToLink, useDateFormat } from "../../hooks";
import { BiLinkExternal, BiDownload } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
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

export default function CandViewJob() {
    const location = useLocation();
    const getFile = useGetFile();
    const {state} = useLocation();
    const {dateConverter} = useDateFormat();
    const goToLink = useGoToLink();
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [jobID, setJobID] = useState("");
    const [shareLink, setShareLink] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [hiringFor, setHiringFor] = useState("");
    const [jobCompany, setJobCompany] = useState("");
    const [jobDescription, setJobDescription] = useState(""); 
    const [qualification, setQualification] = useState("");
    const [skills, setSkills] = useState("");
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

    const [ansToDetailsReq, setAnsToDetailsReq] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [assignmentReply, setAssignmentReply] = useState("");
    const [assignmentSubAttach, setAssignmentSubAttach] = useState([]);

    const [jobTab, setJobTab] = useState(true);
    const [assignmentTab,setAssignmentTab] = useState(false);

    const [status, setStatus] = useState( state?.status ? state?.status : "notApplied");
    const [linkStatus, setLinkStatus] = useState("notApplied");

    const toggleJobTab = () => {
        setJobTab(true);
        setAssignmentTab(false);
    }
    const toggleAssignmentTab = () => {
        setJobTab(false);
        setAssignmentTab(true);
    }

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/has-applied/"+params.id)
        .then(function (response) {
            // console.log(response?.data);
            if (response?.data === "applied"){
                setLinkStatus("applied");
            }
            else {
                setLinkStatus("notApplied");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }, []);

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/job/view-job-details/"+status+"/"+params.id)
        .then(function (response) {
            // console.log(response?.data);
            const job = response?.data?.JobPost;
            const employer = response?.data?.JobEmployer;
            setJobID(job?.id ? job?.id : "");
            setJobTitle(job?.job_title ? job?.job_title : "");
            setShareLink(job?.share_link ? job?.share_link : "");
            setHiringFor(job?.hiring_for ? job?.hiring_for : "");
            setJobCompany(employer?.company_name ? employer?.company_name : "");
            setJobDescription(job?.job_desc ? job?.job_desc : "");
            setQualification(job?.qualification ? job?.qualification : "");
            setSkills(job?.skill ? job?.skill : "");
            setExpMin(job?.experience_min ? job?.experience_min : "0");
            setExpMax(job?.experience_max ? job?.experience_max : "-");
            setSalaryMin(job?.salary_min ? job?.salary_min : "0");
            setSalaryMax(job?.salary_max ? job?.salary_max : "-");
            setPerks(job?.perks ? job?.perks : "-");
            setStartDate(job?.started_date ? (dateConverter(job?.started_date)) : "");
            setJobLoc(job?.job_location ? job?.job_location : "");
            setJobTenure(job?.job_tenuer ? job?.job_tenuer : "");
            setJobType(job?.job_type ? job?.job_type : "");
            setJobMode(job?.job_mode ? job?.job_mode : "");
            setOpenings(job?.no_of_openings ? job?.no_of_openings : "");
            setJobFunction(job?.job_function ? job?.job_function : "-");
            setFileAttach(job?.job_file ? job?.job_file : "");
            setOtherDetails(job?.other_details ? job?.other_details : "-");
            setDetailsReq(job?.required_details ? job?.required_details : "");
            setAssignment(job?.assignment ? job?.assignment : "");
            setAssignmentAttach(job?.assignment_file ? job?.assignment_file : "");
            setAssignmentLink(job?.assignment_link ? job?.assignment_link : "");
            
            if (status === "applied") {
                const assignment = response?.data?.JobCandidate;
                setAnsToDetailsReq(assignment?.ans_to_required_deatail ? assignment.ans_to_required_deatail : "-");
                setCoverLetter(assignment?.cover_letter ? assignment.cover_letter : "-");
                setAssignmentReply(assignment?.assignment_reply ? assignment.assignment_reply : "-");
                setAssignmentSubAttach(assignment?.assignment_submission_file ? assignment.assignment_submission_file : "");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    },[]);

    const handleApplyToJob = (jobID) => {
        navigate(`/candidate/job/${jobID}/assignment`, {state: {from: location, type: "create"}});
    }

    return (
        <>
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>{jobTab ? "Job Details" : "Assignment Submission"}</Card.Title>
                <Card.ButtonGroup flexEnd>
                    {shareLink && <CopyIcon params={shareLink} /> }
                    {assignmentTab &&
                        <Button small onClick={() => navigate(`/candidate/job/${jobID}/assignment`, {state: {from: location, type: "update"}})}>Update Submission</Button>
                    }
                    {status === "notApplied" && linkStatus === "notApplied" &&
                        <Button small onClick={() => handleApplyToJob(jobID)}>Apply</Button>
                    }
                    <Button iconPadding small danger onClick={() => {
                        if (location?.state?.from?.pathname === "/candidate/signin") {
                            navigate("/candidate/dashboard", {state: { from: location }});
                        }
                        else {
                            navigate(-1, {state: { from: location }});
                        }
                    }}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            {status === "applied" &&
                <Card.ButtonGroup flexStart marginLeft marginBottom>
                    <Button small nofill={!jobTab} onClick={() => toggleJobTab()}>Job Details</Button>
                    <Button small nofill={!assignmentTab} onClick={() => toggleAssignmentTab()}>Assignment submission</Button>
                </Card.ButtonGroup>
            }
            <Card.InputColumn>
                <Card.InputContainer noMarginTop noMarginBottom={assignmentSubAttach === ""}>
                    <Card.ViewRow>
                        <Card.ViewTitle colored bold id="jobTitle">{jobTitle}</Card.ViewTitle>
                        <Card.ViewSubtitle colored bold id="jobCompany">{jobCompany}</Card.ViewSubtitle>
                        {/* <Card.ViewSubtitle id="mobile">{country}{mobile}</Card.ViewSubtitle> */}
                        {startDate !== "" &&
                            <Card.InputContainer notAlone width="fit-content">
                                <Card.InputColumn center>
                                    <Card.ViewSubtitleLabel>START DATE:</Card.ViewSubtitleLabel>
                                    <Card.ViewText id="startDate">{startDate}</Card.ViewText>
                                </Card.InputColumn>
                            </Card.InputContainer>
                        }
                        {jobTab &&
                            <>
                                <Card.InputContainerTop notAlone width="fit-content" noMarginTop={startDate !== ""} noMarginBottom={assignmentAttach !== "" || assignmentLink !== ""}>
                                    <Card.ViewText id="fileAttach">Attachment</Card.ViewText>
                                    <Button small onClick={() => getFile(fileAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                                </Card.InputContainerTop>
                            </>
                        }
                        {assignmentTab &&
                            <>
                                {assignmentAttach !== "" &&
                                    <Card.InputContainerTop notAlone width="fit-content">
                                        <Card.ViewText id="assignmentAttach">Assignment Attachment</Card.ViewText>
                                        <Button small onClick={() => getFile(assignmentAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                                    </Card.InputContainerTop>
                                }
                                {assignmentLink !== "" &&
                                    <Card.InputContainerTop notAlone width="fit-content" noMarginTop={assignmentAttach !== ""} noMarginBottom={assignmentSubAttach !== ""}>
                                        <Card.ViewText id="assignmentLink">Assignment Link</Card.ViewText>
                                        <Button small onClick={() => goToLink(assignmentLink)}><Button.Icon alone><BiLinkExternal /></Button.Icon></Button>
                                    </Card.InputContainerTop>
                                }
                                {assignmentSubAttach !== "" &&
                                    <Card.InputContainerTop notAlone width="fit-content" noMarginBottom noMarginTop={startDate !== ""}>
                                        <Card.ViewText id="assignmentSubAttach">Assignment Submission</Card.ViewText>
                                        <Button small onClick={() => getFile(assignmentSubAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                                    </Card.InputContainerTop>
                                }
                            </>
                        }
                    </Card.ViewRow>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.Line />
            {jobTab &&
                <>  
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>JOB FUNCTION: </Card.ViewLabel>
                                <Card.ViewText id="jobFunction">{jobFunction}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>HIRING FOR: </Card.ViewLabel>
                                <Card.ViewText id="hiringFor">{hiringFor}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>DESCRIPTION: </Card.ViewLabel>
                                <Card.ViewText id="jobDescription">{jobDescription}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>QUALIFICATION: </Card.ViewLabel>
                                <Card.ViewText id="qualification">{qualification}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>SKILLS: </Card.ViewLabel>
                                <Card.ViewText id="skills">{skills}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>EXPERIENCE: </Card.ViewLabel>
                                <Card.ViewColumn notResponsive>
                                    <Card.ViewDash>MIN:</Card.ViewDash>
                                    <Card.ViewText id="expMin">{expMin}</Card.ViewText>
                                    {/* <Card.ViewDash symbol>&</Card.ViewDash> */}
                                    <Card.ViewDash>MAX:</Card.ViewDash>
                                    <Card.ViewText id="expMax">{expMax}</Card.ViewText>
                                </Card.ViewColumn>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>SALARY: </Card.ViewLabel>
                                <Card.ViewColumn notResponsive>
                                    <Card.ViewDash>MIN:</Card.ViewDash>
                                    <Card.ViewText id="salaryMin">{salaryMin}</Card.ViewText>
                                    {/* <Card.ViewDash symbol>&</Card.ViewDash> */}
                                    <Card.ViewDash>MAX:</Card.ViewDash>
                                    <Card.ViewText id="salaryMax">{salaryMax}</Card.ViewText>
                                </Card.ViewColumn>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>JOB LOCATION: </Card.ViewLabel>
                                <Card.ViewText id="jobLoc">{jobLoc}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>JOB TENURE: </Card.ViewLabel>
                                <Card.ViewText id="jobTenure">{jobTenure}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>JOB TYPE: </Card.ViewLabel>
                                <Card.ViewText id="jobType">{jobType}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>JOB MODE: </Card.ViewLabel>
                                <Card.ViewText id="jobMode">{jobMode}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>PERKS: </Card.ViewLabel>
                                <Card.ViewText id="perks">{perks}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>OPENINGS: </Card.ViewLabel>
                                <Card.ViewText id="openings">{openings}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>OTHER DETAILS: </Card.ViewLabel>
                                <Card.ViewText id="otherDetails">{otherDetails}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    {/* <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>DETAILS REQUIRED FROM CANDIDATE: </Card.ViewLabel>
                                <Card.ViewText id="detailsReq">{detailsReq}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>ASSIGNMENT: </Card.ViewLabel>
                                <Card.ViewText id="assignment">{assignment}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn> */}
                    {status === "notApplied" && linkStatus === "notApplied" &&
                        <Card.ButtonGroup marginTop>
                            <Button onClick={() => handleApplyToJob(jobID)}>Apply</Button>
                        </Card.ButtonGroup>
                    }
                </>
            }
            {assignmentTab &&
                <>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>COVER LETTER: </Card.ViewLabel>
                                <Card.ViewText id="coverLetter">{coverLetter}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    {detailsReq &&
                        <Card.InputColumn>
                            <Card.InputContainer>
                                <Card.ViewRow>
                                    <Card.ViewLabel paddingBottom="0.5rem">DETAILS REQUIRED FROM CANDIDATE:-</Card.ViewLabel>
                                    <Card.Question paddingBottom id="detailsReq">{detailsReq}</Card.Question>
                                    <Card.ViewLabel>ANSWER TO DETAILS REQUIRED: </Card.ViewLabel>
                                    <Card.ViewText id="ansToDetailsReq">{ansToDetailsReq}</Card.ViewText>
                                </Card.ViewRow>
                            </Card.InputContainer>
                        </Card.InputColumn>
                    }
                    {assignment &&
                        <Card.InputColumn>
                            <Card.InputContainer>
                                <Card.ViewRow>
                                    <Card.ViewLabel paddingBottom="0.5rem">ASSIGNMENT:-</Card.ViewLabel>
                                    <Card.Question paddingBottom id="assignment">{assignment}</Card.Question>
                                    <Card.ViewLabel>ASSIGNMENT REPLY: </Card.ViewLabel>
                                    <Card.ViewText id="assignmentReply">{assignmentReply}</Card.ViewText>
                                </Card.ViewRow>
                            </Card.InputContainer>
                        </Card.InputColumn>
                    }
                </>
            }
        </Card>
        </>
    );
}