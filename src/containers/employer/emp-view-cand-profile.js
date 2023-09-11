import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useGetFile, useBase64ToFile, useGoToLink, useSecondIndex } from "../../hooks";
import { BiDownload, BiLinkExternal } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { defaultAvatar } from "../../constants";

export default function EmpViewCandProfile() {
    const getSecondIndex = useSecondIndex();
    const location = useLocation();
    const dataURLtoFile = useBase64ToFile();
    const getFile = useGetFile();
    const goToLink = useGoToLink();
    const {state} = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [resume, setResume] = useState({});
    const [resumePreview, setResumePreview] = useState("");
    const [videoProfileLink, setVideoProfileLink] = useState("");
    const [photo, setPhoto] = useState({});
    const [photoPreview, setPhotoPreview] = useState(defaultAvatar);
    const [profile, setProfile] = useState(""); 
    const [address, setAddress] = useState(""); 
    
    const [currLoc, setCurrLoc] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [expYears, setExpYears] = useState("");
    const [expMonths, setExpMonths] = useState("");
    
    const [prefJobLoc, setPrefJobLoc] = useState("");
    const [prefJobTenure, setPrefJobTenure] = useState("");
    const [prefJobType, setPrefJobType] = useState("");
    const [prefJobMode, setPrefJobMode] = useState("");

    const [currCTC, setCurrCTC] = useState("");
    const [minExpCTC, setMinExpCTC] = useState("");
    const [maxExpCTC, setMaxExpCTC] = useState("");
    
    const [qualification, setQualification] = useState("");
    const [skills, setSkills] = useState("");

    const [ansToDetailsReq, setAnsToDetailsReq] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [assignmentReply, setAssignmentReply] = useState("");
    const [assignmentAttach, setAssignmentAttach] = useState([]);

    const [evalScore, setEvalScore] = useState("");
    const [evalRemarks, setEvalRemarks] = useState("");
    const [evalAttach, setEvalAttach] = useState([]);

    const [totalIntScore, setTotalIntScore] = useState("");
    const [totalInt, setTotalInt] = useState("");

    const [profileTab, setProfileTab] = useState(true);
    const [assignmentTab,setAssignmentTab] = useState(false);
    const [evalTab,setEvalTab] = useState(false);

    const [status, setStatus] = useState( state?.status ? state?.status : "notApplied");

    const toggleProfileTab = () => {
        setProfileTab(true);
        setAssignmentTab(false);
        setEvalTab(false);
    }
    const toggleAssignmentTab = () => {
        setProfileTab(false);
        setAssignmentTab(true);
        setEvalTab(false);
    }
    const toggleEvalTab = () => {
        setProfileTab(false);
        setAssignmentTab(false);
        setEvalTab(true);
    }

    useEffect(() => {
        axiosPrivate
        .get("/api/employer/job/get-selected-candidates/"+status+"/"+params.jobID+"/"+params.candID)
        .then(function (response) {
            // console.log(response?.data);
            const candidate = response?.data?.Candidate;
            setName(candidate?.name);
            setUsername(candidate?.username);
            setCountry(candidate?.country_code);
            setMobile(candidate?.mobile_number);
            setResume(candidate?.resume ? candidate.resume : "");
            setVideoProfileLink(candidate?.video_profile ? candidate.video_profile : "");
            setPhoto(candidate?.photo ? candidate.photo : "");
            setProfile(candidate?.profile_summery ? candidate?.profile_summery : "");
            setAddress(candidate?.address ? candidate?.address : "");
            setCurrLoc(candidate?.current_location ? candidate.current_location : "");
            setNoticePeriod(candidate?.notice_period ? candidate.notice_period : "");
            setExpYears(candidate?.total_no_of_years_exp ? candidate.total_no_of_years_exp : "0");
            setExpMonths(candidate?.total_no_of_month_exp ? candidate.total_no_of_month_exp : "0");
            setPrefJobLoc(candidate?.prefered_job_location ? candidate.prefered_job_location : "");
            setPrefJobTenure(candidate?.prefered_job_tenuer ? candidate.prefered_job_tenuer : "");
            setPrefJobType(candidate?.prefered_job_type ? candidate.prefered_job_type : "");
            setPrefJobMode(candidate?.prefered_job_mode ? candidate.prefered_job_mode : "");
            setCurrCTC(candidate?.current_ctc ? candidate.current_ctc : "0");
            setMinExpCTC(candidate?.excepted_ctc_min ? candidate.excepted_ctc_min : "0");
            setMaxExpCTC(candidate?.excepted_ctc_max ? candidate.excepted_ctc_max : "-");
            setQualification(candidate?.qualification ? candidate.qualification : "");
            setSkills(candidate?.skill ? candidate.skill : "");
            
            if (status === "applied") {
                const assignment = response?.data?.JobCandidate?.JobCandidate;
                setAnsToDetailsReq(assignment?.ans_to_required_deatail ? assignment.ans_to_required_deatail : "-");
                setCoverLetter(assignment?.cover_letter ? assignment.cover_letter : "-");
                setAssignmentReply(assignment?.assignment_reply ? assignment.assignment_reply : "-");
                setAssignmentAttach(assignment?.assignment_submission_file ? assignment.assignment_submission_file : "");
    
                setEvalScore(assignment?.evaluation_score ? assignment.evaluation_score : 0);
                setEvalRemarks(assignment?.evaluation_mark ? assignment.evaluation_mark : "None");
                setEvalAttach(assignment?.evaluation_document ? assignment.evaluation_document : "");

                const interview = response?.data?.JobCandidate;
                setTotalIntScore(interview?.total_interview_score ? interview.total_interview_score : "");
                setTotalInt(interview?.total_interviews ? (interview.total_interviews * 10) : "");
            }
            if(candidate.photo !== null) {
                viewFile(candidate.photo,"photoPreview");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard", {state: { from: location }});
        });
    },[]);

    const viewFile = async (path, filePath) => {
        try {
            const response = await axiosPrivate.get("/api/utility/send-file", {params: {file_path: path}}, {responseType: "arraybuffer"});
            if(response?.data) {
                const previewURL = "data:image/jpeg;base64," + response?.data;
                var subPath = path.substring(path.lastIndexOf('/'));
                const docFile = dataURLtoFile(previewURL, subPath.substring(getSecondIndex(subPath,'_')), {type: "image/jpeg"});
                // const docFile = dataURLtoFile(previewURL, path.substring(path.lastIndexOf('/')+9), {type: "image/jpeg"});
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
    const fileHandler = (file,filePath) => {
        if(filePath === "photoPreview") {
            if(file !== undefined) {
                setPhoto(file);
                setPhotoPreview(URL.createObjectURL(file));
            }
            else {
                setPhoto({});
                setPhotoPreview(defaultAvatar);
            }
        }
    }

    return (
        <>
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>{profileTab ? "Candidate Profile" : assignmentTab ? "Assignment Submission" : "Evaluation"}</Card.Title>
                <Card.ButtonGroup flexEnd>
                    {evalTab &&
                        <Button small onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/evaluation`, {state: { from: location }})}>Update Evaluation</Button>
                    }
                    <Button iconPadding small danger onClick={() => navigate(-1, {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            {status === "applied" &&
                <Card.ButtonGroup flexStart marginLeft marginBottom>
                    <Button small nofill={!profileTab} onClick={() => toggleProfileTab()}>Candidate Profile</Button>
                    <Button small nofill={!assignmentTab} onClick={() => toggleAssignmentTab()}>Assignment submission</Button>
                    <Button small nofill={!evalTab} onClick={() => toggleEvalTab()}>Evaluation</Button>
                </Card.ButtonGroup>
            }
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewTitle id="name">{name}</Card.ViewTitle>
                        <Card.ViewSubtitle id="username">{username}</Card.ViewSubtitle>
                        <Card.ViewSubtitle id="mobile">{country}{mobile}</Card.ViewSubtitle>
                        {profileTab &&
                            <>
                                <Card.InputContainer notAlone width="fit-content">
                                    <Card.ViewText id="resumePreview">Resume</Card.ViewText>
                                    <Button small onClick={() => getFile(resume)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                                </Card.InputContainer>
                                {videoProfileLink &&
                                    <Card.InputContainer notAlone noMarginTop width="fit-content">
                                        <Card.ViewText id="videoProfileLink">Video profile</Card.ViewText>
                                        <Button small onClick={() => goToLink(videoProfileLink)}><Button.Icon alone><BiLinkExternal /></Button.Icon></Button>
                                    </Card.InputContainer>
                                }
                            </>
                        }
                        {assignmentTab && assignmentAttach &&
                            <Card.InputContainer notAlone width="fit-content">
                                <Card.ViewText id="assignmentAttach">Submission File</Card.ViewText>
                                <Button small onClick={() => getFile(assignmentAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                            </Card.InputContainer>
                        }
                        {evalTab && evalAttach &&
                            <Card.InputContainer notAlone width="fit-content">
                                <Card.ViewText id="assignmentAttach">Evaluation File</Card.ViewText>
                                <Button small onClick={() => getFile(evalAttach)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                            </Card.InputContainer>
                        }
                    </Card.ViewRow>
                </Card.InputContainer>
                <Card.InputContainer flexEnd>
                    <Card.ImagePreview alone id="photoPreview" src={photoPreview} />
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.Line />
            {profileTab &&
                <>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>PROFILE: </Card.ViewLabel>
                                <Card.ViewText id="profile">{profile}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>ADDRESS: </Card.ViewLabel>
                                <Card.ViewText id="address">{address}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn alignEnd>
                        <Card.InputColumn alignEnd>
                            <Card.InputContainer>
                                <Card.ViewRow>
                                    <Card.ViewLabel>CURRENT LOCATION: </Card.ViewLabel>
                                    <Card.ViewText id="currLoc">{currLoc}</Card.ViewText>
                                </Card.ViewRow>
                            </Card.InputContainer>
                            <Card.InputContainer>
                                <Card.ViewRow>
                                    <Card.ViewLabel>NOTICE PERIOD: </Card.ViewLabel>
                                    <Card.ViewText id="noticePeriod">{noticePeriod}</Card.ViewText>
                                </Card.ViewRow>
                            </Card.InputContainer>
                        </Card.InputColumn>
                        <Card.InputColumn>
                            <Card.InputContainer>
                                <Card.ViewRow>
                                    <Card.ViewLabel>EXPERIENCE: </Card.ViewLabel>
                                    <Card.ViewColumn notResponsive>
                                        <Card.ViewText id="expYears">{expYears} years</Card.ViewText>
                                        <Card.ViewDash>&</Card.ViewDash>
                                        <Card.ViewText id="expMonths">{expMonths} months</Card.ViewText>
                                    </Card.ViewColumn>
                                </Card.ViewRow>
                            </Card.InputContainer>
                        </Card.InputColumn>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>PREFERRED JOB LOCATION: </Card.ViewLabel>
                                <Card.ViewText id="prefJobLoc">{prefJobLoc}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>PREFERRED JOB TENURE: </Card.ViewLabel>
                                <Card.ViewText id="prefJobTenure">{prefJobTenure}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>PREFERRED JOB TYPE: </Card.ViewLabel>
                                <Card.ViewText id="prefJobType">{prefJobType}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>PREFERRED JOB MODE: </Card.ViewLabel>
                                <Card.ViewText id="prefJobMode">{prefJobMode}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>CURRENT CTC: </Card.ViewLabel>
                                <Card.ViewText id="currCTC">{currCTC}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>EXPECTED CTC: </Card.ViewLabel>
                                <Card.ViewColumn notResponsive>
                                    <Card.ViewDash>MIN:</Card.ViewDash>
                                    <Card.ViewText id="minExpCTC">{minExpCTC}</Card.ViewText>
                                    <Card.ViewDash>MAX:</Card.ViewDash>
                                    <Card.ViewText id="maxExpCTC">{maxExpCTC}</Card.ViewText>
                                </Card.ViewColumn>
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
                </>
            }
            {assignmentTab &&
                <>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>ANSWER TO DETAILS REQUIRED: </Card.ViewLabel>
                                <Card.ViewText id="ansToDetailsReq">{ansToDetailsReq}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>COVER LETTER: </Card.ViewLabel>
                                <Card.ViewText id="coverLetter">{coverLetter}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>ASSIGNMENT REPLY: </Card.ViewLabel>
                                <Card.ViewText id="assignmentReply">{assignmentReply}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                </>
            }
            {evalTab &&
                <>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>TOTAL EVALUATION SCORE: </Card.ViewLabel>
                                <Card.ViewText id="evalScore">{evalScore} / 10</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>TOTAL INTERVIEW SCORE: </Card.ViewLabel>
                                <Card.ViewText id="evalRemarks">{totalIntScore ? `${totalIntScore} / ${totalInt}` : "-"}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.ViewRow>
                                <Card.ViewLabel>REMARKS: </Card.ViewLabel>
                                <Card.ViewText id="evalRemarks">{evalRemarks}</Card.ViewText>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                </>
            }
        </Card>
        </>
    );
}