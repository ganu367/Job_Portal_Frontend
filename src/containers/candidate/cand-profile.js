import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useBase64ToFile, useGetFile, useGoToLink, useSecondIndex } from "../../hooks";
import { BiDownload, BiLinkExternal } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { defaultAvatar } from "../../constants";

export default function CandProfile() {
    const getSecondIndex = useSecondIndex();
    const location = useLocation();
    const goToLink = useGoToLink();
    const dataURLtoFile = useBase64ToFile();
    const getFile = useGetFile();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [resume, setResume] = useState({});
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

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/profile/view-profile")
        .then(function (response) {
            // console.log(response?.data);
            const candidate = response?.data;
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
            setExpYears(candidate?.total_no_of_years_exp ? candidate.total_no_of_years_exp : 0);
            setExpMonths(candidate?.total_no_of_month_exp ? candidate.total_no_of_month_exp : 0);
            setPrefJobLoc(candidate?.prefered_job_location ? candidate.prefered_job_location : "");
            setPrefJobTenure(candidate?.prefered_job_tenuer ? candidate.prefered_job_tenuer : "");
            setPrefJobType(candidate?.prefered_job_type ? candidate.prefered_job_type : "");
            setPrefJobMode(candidate?.prefered_job_mode ? candidate.prefered_job_mode : "");
            setCurrCTC(candidate?.current_ctc ? candidate.current_ctc : 0);
            setMinExpCTC(candidate?.excepted_ctc_min ? candidate.excepted_ctc_min : 0);
            setMaxExpCTC(candidate?.excepted_ctc_max ? candidate.excepted_ctc_max : "-");
            setQualification(candidate?.qualification ? candidate.qualification : "");
            setSkills(candidate?.skill ? candidate.skill : "");
            if(candidate.photo !== null) {
                viewFile(candidate.photo,"photoPreview");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard", {state: { from: location }});
        });
    },[]);

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>My Profile</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button small onClick={() => navigate("/candidate/update-profile", {state: { from: location }})}>Update Profile</Button>
                    <Button small iconPadding danger onClick={() => navigate("/candidate/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewTitle id="name">{name}</Card.ViewTitle>
                        <Card.ViewSubtitle id="username">{username}</Card.ViewSubtitle>
                        <Card.ViewSubtitle id="mobile">{country}{mobile}</Card.ViewSubtitle>
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
                    </Card.ViewRow>
                </Card.InputContainer>
                <Card.InputContainer flexEnd>
                    <Card.ImagePreview alone id="photoPreview" src={photoPreview} />
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.Line />
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
                            {/* <Card.ViewDash symbol>&</Card.ViewDash> */}
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
        </Card>
    );
}