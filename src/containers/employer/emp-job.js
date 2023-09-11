import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "../../components";
import { DeleteModalContainer } from "../";
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

export default function EmpJob() {
    const location = useLocation();
    const getFile = useGetFile();
    const goToLink = useGoToLink();
    const params = useParams();
    const {dateConverter} = useDateFormat();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState("");
    const [shareLink, setShareLink] = useState("");
    const [hiringFor, setHiringFor] = useState("");
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
    
    const [status, setStatus] = useState("");

    const [deleteJobModal,setDeleteJobModal] = useState(false);

    useEffect(() => {
        axiosPrivate
        .get("/api/employer/job/get-jobs/"+params.id)
        .then(function (response) {
            // console.log(response?.data);
            const job = response?.data;
            setJobTitle(job?.job_title ? job?.job_title : "");
            setShareLink(job?.share_link ? job?.share_link : "");
            setHiringFor(job?.hiring_for ? job?.hiring_for : "");
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
            setDetailsReq(job?.required_details ? job?.required_details : "-");
            setAssignment(job?.assignment ? job?.assignment : "-");
            setAssignmentAttach(job?.assignment_file ? job?.assignment_file : "");
            setAssignmentLink(job?.assignment_link ? job?.assignment_link : "");
            setStatus(job?.status ? job?.status : "");
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/employer/dashboard", {state: { from: location }});
        });
    },[]);

    const handleDeleteJob = () => {
        axiosPrivate
        .put("/api/employer/job/closed-job/"+params.id)
        .then(function (response) {
            setAlert({msg: `Success: ${response?.data[0]}`, type: "success"});
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    return (
        <>
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title colored>{jobTitle}</Card.Title>
                <Card.ButtonGroup flexEnd>
                    {shareLink && <CopyIcon params={shareLink} /> }
                    {status === "Open" &&
                        <>
                            <Button small onClick={() => navigate(`/employer/update-job/${params.id}`, {state: { from: location }})}>Update Job</Button>
                            <Button small danger onClick={() => setDeleteJobModal(true)}>Close Job</Button>
                        </>
                    }
                    <Button iconPadding small danger onClick={() => navigate(-1)}><Button.Icon alone><FaTimes /></Button.Icon></Button> {/* "/employer/dashboard", {state: { from: location }} */}
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.ViewRow>
                        {/* <Card.ViewTitle id="jobTitle">{jobTitle}</Card.ViewTitle> */}
                        {/* <Card.ViewSubtitle colored bold id="contactPerson">{contactPerson}</Card.ViewSubtitle> */}
                        {/* <Card.ViewSubtitle id="mobile">{country}{mobile}</Card.ViewSubtitle> */}
                        {startDate !== "" &&
                            <Card.InputContainer notAlone width="fit-content" noMarginTop>
                                <Card.InputColumn center>
                                    <Card.ViewSubtitleLabel>START DATE:</Card.ViewSubtitleLabel>
                                    <Card.ViewText id="startDate">{startDate}</Card.ViewText>
                                </Card.InputColumn>
                            </Card.InputContainer>
                        }
                        <Card.InputContainerTop notAlone width="fit-content" noMarginTop noMarginBottom={assignmentAttach !== "" || assignmentLink === ""}>
                            <Card.ViewText id="fileAttach">Attachment</Card.ViewText>
                            <Button small onClick={() => getFile(fileAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                        </Card.InputContainerTop>
                        {assignmentAttach !== "" &&
                            <Card.InputContainerTop notAlone width="fit-content" noMarginTop={fileAttach === ""} noMarginBottom={assignmentLink === ""}>
                                <Card.ViewText id="assignmentAttach">Assignment Attachment</Card.ViewText>
                                <Button small onClick={() => getFile(assignmentAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                            </Card.InputContainerTop>
                        }
                        {assignmentLink !== "" &&
                            <Card.InputContainerTop notAlone width="fit-content" noMarginTop={(assignmentAttach !== "" || fileAttach === "") || assignmentAttach === ""}>
                                <Card.ViewText id="assignmentLink">Assignment Link</Card.ViewText>
                                <Button small onClick={() => goToLink(assignmentLink)}><Button.Icon alone><BiLinkExternal /></Button.Icon></Button>
                            </Card.InputContainerTop>
                        }
                    </Card.ViewRow>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.Line />
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
            <Card.InputColumn>
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
            </Card.InputColumn>
            {/* <Card.InputColumn>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewLabel>WEBSITE: </Card.ViewLabel>
                        <Card.ViewText id="website">{website}</Card.ViewText>
                    </Card.ViewRow>
                </Card.InputContainer>
            </Card.InputColumn> */}
        </Card>
        {(deleteJobModal) ? 
            <DeleteModalContainer deleteFunction={handleDeleteJob} setDeleteModal={setDeleteJobModal} destination={"/employer/dashboard"}>Are you sure you want to close this job?</DeleteModalContainer>
        : null}
        </>
    );
}