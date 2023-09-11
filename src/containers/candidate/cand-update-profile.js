import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Dropdown, Modal, Checkbox } from "../../components";
import { useAuth, useAxiosPrivate, useAlert, useBase64ToFile, useFileSizeCheck, useValidFileExtension, useLoading, useSecondIndex } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import { countryCodes, jobTenureList, jobTypeList, jobModeList, defaultAvatar, RTEditorStyles } from "../../constants";
// import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';

export default function CandUpdateProfile() {
    const getSecondIndex = useSecondIndex();
    const {loading, setLoading} = useLoading();
    const {JWT, setAuth} = useAuth();
    const location = useLocation();
    const qualificationRef = useRef();
    const skillRef = useRef();
    const dataURLtoFile = useBase64ToFile();
    const isFileSizeValid = useFileSizeCheck();
    const isValidFileExtension = useValidFileExtension();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    // const RTEref = useRef(null);
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [resume, setResume] = useState([]);
    const [videoProfileLink, setVideoProfileLink] = useState("");
    const [photo, setPhoto] = useState([]);
    const [photoPreview, setPhotoPreview] = useState(defaultAvatar);
    const [profile, setProfile] = useState(""); 
    const [address, setAddress] = useState(""); 
    
    const [currLoc, setCurrLoc] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [expYears, setExpYears] = useState("");
    const [expMonths, setExpMonths] = useState(0);
    
    const [prefJobLoc, setPrefJobLoc] = useState("");
    const [prefJobTenure, setPrefJobTenure] = useState("");
    const [prefJobType, setPrefJobType] = useState("");
    const [prefJobMode, setPrefJobMode] = useState("");
    
    const [currCTC, setCurrCTC] = useState("");
    const [minExpCTC, setMinExpCTC] = useState("");
    const [maxExpCTC, setMaxExpCTC] = useState("");
    
    const [qualification, setQualification] = useState("");
    const [skill, setSkill] = useState("");
    
    const [search, setSearch] = useState("");
    const countryRef = useRef();
    const [countryDD, setCountryDD] = useState(false);
    const isInvalid = name === "" || country === "" || mobile === "" || address === "" || profile === "" || resume.length === 0 || expYears === "" || expMonths === "" || prefJobLoc === "" || prefJobTenure === "" || prefJobType === "" || prefJobMode === "" || currCTC === "" || minExpCTC === "" || currLoc === "" || qualification.length === 0 || skill.length === 0 || noticePeriod === "";
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const prefJobTenureRef = useRef();
    const [prefJobTenureDD, setPrefJobTenureDD] = useState(false);
    const prefJobTypeRef = useRef();
    const [prefJobTypeDD, setPrefJobTypeDD] = useState(false);
    const prefJobModeRef = useRef();
    const [prefJobModeDD, setPrefJobModeDD] = useState(false);

    const [qualificationDD, setQualificationDD] = useState(false);
    const [qualificationList, setQualificationList] = useState([]);
    const [qualificationModal, setQualificationModal] = useState(false);
    const [newQualification, setNewQualification] = useState("");

    const [skillDD, setSkillDD] = useState(false);
    const [skillList, setSkillList] = useState([]);
    const [skillModal, setSkillModal] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    
    // const onEditorStateChange = (editorState) => {
    //     setProfile(editorState);
    // }

    const isValidURL = (url) => {
        return /((https?:\/\/)?(www\.)?([a-z0-9]+\.)?[^\s]+)/gi.test(url);
        // return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(url);
        // return /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(url);
    }

    const resetInputFields = () => {
        setName("");
        setCountry("");
        setMobile("");
        setResume([]);
        setVideoProfileLink("");
        setPhoto([]);
        setProfile("");
        setAddress("");
        setCurrLoc("");
        setNoticePeriod("");
        setExpYears("");
        setExpMonths("");
        setPrefJobLoc("");
        setPrefJobTenure("");
        setPrefJobType("");
        setPrefJobMode("");
        setCurrCTC("");
        setMinExpCTC("");
        setMaxExpCTC("");
        setQualification("");
        setSkill("");
        setPhotoPreview(defaultAvatar);
    }

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
                setPhoto([file]);
                setPhotoPreview(URL.createObjectURL(file));
            }
            else {
                setPhoto({});
                setPhotoPreview(defaultAvatar);
            }
        }
        else {
            if(file !== undefined) {
                setResume([file]);
            }
            else {
                setResume([]);
            }
        }
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(countryDD && !countryRef?.current?.contains(e.target)) {
                setCountryDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [countryDD, countryRef]);

    const changeCountry = (code) => {
        setCountry(code);
        setSearch("");
        setCountryDD(false);
    }
    const searchFor = (term) => {
        return function(x) {
            return x.name.toLowerCase().includes(term.toLowerCase()) || !term ;
        }
    }
    const handleMobile = (mob) => {
        if(mob.length < 11) {
            setMobile(mob);
        }
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(prefJobTenureDD && !prefJobTenureRef?.current?.contains(e.target)) {
                setPrefJobTenureDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [prefJobTenureDD, prefJobTenureRef]);
    const changePrefJobTenure = (item) => {
        setPrefJobTenure(item);
        setSearch("");
        setPrefJobTenureDD(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(prefJobTypeDD && !prefJobTypeRef?.current?.contains(e.target)) {
                setPrefJobTypeDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [prefJobTypeDD, prefJobTypeRef]);
    const changePrefJobType = (item) => {
        setPrefJobType(item);
        setSearch("");
        setPrefJobTypeDD(false);
    }
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(prefJobModeDD && !prefJobModeRef?.current?.contains(e.target)) {
                setPrefJobModeDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [prefJobModeDD, prefJobModeRef]);
    const changePrefJobMode = (item) => {
        setPrefJobMode(item);
        setSearch("");
        setPrefJobModeDD(false);
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

    const resumeHandler = (docs) => {
        const fileList = []
        for(let i = 0; i < docs.length; i++) {
            fileList.push(docs[i]);
        }
        setResume(fileList);
    }

    const imageHandler = (img) => {
        // console.log("img: ",img);
        if(img[0] !== undefined) {
            const imageList = []
            for(let i = 0; i < img.length; i++) {
                imageList.push(img[i]);
            }
            setPhoto(imageList);
            setPhotoPreview(URL.createObjectURL(imageList[0]));
        }
        else {
            setPhoto([]);
            setPhotoPreview(defaultAvatar);
        }
    }

    const removeResume = (filename) => {
        setResume(resume.filter((file) => file.name !== filename));
    }
    const removePhoto = (filename) => {
        setPhoto(photo.filter((file) => file.name !== filename));
        setPhotoPreview(defaultAvatar);
    }

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/profile/view-profile")
        .then(function (response) {
            // console.log(response?.data);
            const candidate = response?.data;
            setName(candidate?.name);
            setCountry(candidate?.country_code);
            setMobile(candidate?.mobile_number);
            setVideoProfileLink(candidate?.video_profile ? candidate.video_profile : "");
            // setPhoto(candidate?.photo ? candidate.photo : "");
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
            setMaxExpCTC(candidate?.excepted_ctc_max ? candidate.excepted_ctc_max : "");
            setQualification(candidate?.qualification ? candidate.qualification.split(",") : "");
            setSkill(candidate?.skill ? candidate.skill.split(",") : "");
            if(candidate.photo !== null) {
                viewFile(candidate.photo,"photoPreview");
            }
            if(candidate.resume !== null) {
                viewFile(candidate.resume,"resume");
            }
            // let editorState = EditorState.createWithContent(
            //     ContentState.createFromBlockArray(
            //         convertFromHTML(candidate?.profile)
            // ));
            // setProfile(editorState);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard", {state: { from: location }});
        });
    },[]);

    const handleUpdateProfile = () => {
        if(mobile.length !== 10) {
            setAlert({msg: "Error: Mobile number does not have 10 digits!", type: "error"});
            return;
        }
        if(maxExpCTC !== "" && parseInt(maxExpCTC) <= parseInt(minExpCTC)) {
            setAlert({msg: `Error: Max expected CTC cannot be less than Min expected CTC!`, type: "error"});
            return;
        }
        if (videoProfileLink !== "") {
            if(!isValidURL(videoProfileLink)) {
                setAlert({msg: `Error: Video profile link is invalid!`, type: "error"});
                return;
            }
        }
        if (photo.length !== 0) {
            if (!isValidFileExtension(photo[0].name,["png","jpeg","jpg"])) {
                setAlert({msg: "Type of photo invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(photo[0].size)) {
                setAlert({msg: "Photo size limit is 1MB", type: "error"});
                return;
            }
        }
        if (resume.length !== 0) {
            if (!isValidFileExtension(resume[0].name,["pdf","docx","xlsx"])) {
                setAlert({msg: "Type of resume invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(resume[0].size)) {
                setAlert({msg: "Resume size limit is 1MB", type: "error"});
                return;
            }
        }
        setLoading(true);
        axiosPrivate
        .put("/api/candidate/profile/update-profile", {photo_files: photo[0], resume_files: resume[0], country_code: country, address: address, mobile_number: mobile, profile_summery: profile, video_profile: videoProfileLink, total_no_of_years_exp: expYears, total_no_of_month_exp: expMonths, prefered_job_location: prefJobLoc, prefered_job_type: prefJobType, prefered_job_tenuer: prefJobTenure, prefered_job_mode: prefJobMode, current_ctc: currCTC, excepted_ctc_min: minExpCTC, excepted_ctc_max: maxExpCTC, qualification: qualification.toString(), skill: skill.toString(), current_location: currLoc, notice_period: noticePeriod },
        {headers: {
            "Content-Type": "multipart/form-data"
        }})
        .then(function (response) {
            setLoading(false);
            // console.log(response?.data)
            setAlert({msg: `Success: ${response?.data?.msg}`, type: "success"});
            const accessToken = response?.data?.access_token;
            setAuth({accessToken});
            if (JWT?.user?.isProfileCompleted) {
                navigate("/candidate/dashboard");
            }
        })
        .catch(function (error) {
            setLoading(false);
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    // useEffect(() => {
    //     console.log(photo);
    //     console.log(photoPreview);
    // }, [photo,photoPreview]);

    const handleExpYears = (num) => {
        if ((num >= 1) || num == "") {
            setExpYears(num.replace(/^0+/, ''));
        }
        if (num == 0) {
            setExpYears(num.replace(/^0+/, 0))
        }
    }
    const handleExpMonths = (num) => {
        if ((num >= 1 && num <= 11) || num == "") {
            setExpMonths(num.replace(/^0+/, ''));
        }
        if (num == 0) {
            setExpMonths(num.replace(/^0+/, 0))
        }
    }
    const minExpCTCHandler = (num) => {
        if ((num >= 1) || num == "") {
            setMinExpCTC(num.replace(/^0+/, ''));
        }
        if (num == 0) {
            setMinExpCTC(num.replace(/^0+/, 0))
        }
    }
    const maxExpCTCHandler = (num) => {
        if ((num >= 1) || num == "") {
            setMaxExpCTC(num.replace(/^0+/, ''));
        }
        // if (num == 0) {
        //     setMaxExpCTC(num.replace(/^0+/, 0))
        // }
    }
    const currCTCHandler = (num) => {
        if ((num >= 1) || num == "") {
            setCurrCTC(num.replace(/^0+/, ''));
        }
        if (num == 0) {
            setCurrCTC(num.replace(/^0+/, 0))
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
            // navigate("/candidate/dashboard");
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
            // navigate("/candidate/dashboard");
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
                <Card.Title>My Profile</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button small iconPadding danger onClick={() => navigate("/candidate/profile", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            {!(JWT?.user?.isProfileCompleted) && 
                <Card.InputColumn>
                    <Card.InputContainer>
                        <Card.Note><Card.NoteIcon><AiOutlineInfoCircle /></Card.NoteIcon>Please fill the details to proceed further!</Card.Note>
                    </Card.InputContainer>
                </Card.InputColumn>
            }
            <Card.InputColumn center>
                <Card.InputRow>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="name" placeholder=" " autoComplete="off" value={name} onChange={({target}) => setName(target.value)} />
                            <Card.Label htmlFor="name" mandatory>Name</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn notResponsive>
                        <Card.InputContainer refPointer={countryRef} width={"30%"} exceptLeft>
                            <Card.Input readOnly type="text" id="country" placeholder=" " autoComplete="off" value={country} onClick={() => setCountryDD((countryDD) => !countryDD)} />
                            <Card.Label htmlFor="country" mandatory>Code</Card.Label>
                            <Dropdown dropdown={countryDD} flexDirection="column">
                                <Dropdown.SearchContainer>
                                    <Dropdown.Search type="text" id="search" placeholder="Search country..." autoComplete="off" value={search} onChange={({target}) => setSearch(target.value)} />
                                    <Dropdown.Icon><BiSearch /></Dropdown.Icon>
                                </Dropdown.SearchContainer>
                                {countryCodes.filter(searchFor(search)).map((item) => {
                                    return <Dropdown.Option selected={(country === item.dial_code) ? "selected" : undefined} key={item.code} onClick={({target}) => changeCountry(item.dial_code)}>{item.name}, {item.dial_code}</Dropdown.Option>
                                })}
                            </Dropdown>
                            <Card.Icon style={{pointerEvents: "none"}}>
                                {(countryDD) ? <FiChevronUp /> : <FiChevronDown />}
                            </Card.Icon>
                        </Card.InputContainer>
                        <Card.InputContainer notAlone exceptRight>
                            <Card.Input type="number" id="mobile" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" onKeyDown={blockInvalidNumber} value={mobile} onChange={({target}) => handleMobile(target.value)} />
                            <Card.Label htmlFor="mobile" mandatory>Mobile</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                </Card.InputRow>
                <Card.InputRow center width={"fit-content"}>
                    <Card.InputColumn>
                        <Card.InputContainer width="100%" noMarginBottom>
                            <Card.Input file={photo?.name} type="file" id="photo" onChange={({target}) => imageHandler(target.files)} accept=".png,.jpeg,.jpg" /> 
                            <Card.Label htmlFor="photo">Photo</Card.Label>
                            <Card.Placeholder visible={photo.length === 0 ? true : false}>
                                Max size 1MB
                            </Card.Placeholder>
                            <Card.Tooltip>
                                File size should be less than 1MB. File types can be .jpeg, .jpg, .png
                            </Card.Tooltip>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        {photo.map((doc) => {
                            return (
                            <Card.InputContainer width="fit-content" key={doc.name}>
                                <Card.ImagePreview alone id="photoPreview" src={URL.createObjectURL(doc)} />
                                <Card.ImageRemoveIcon onClick={() => removePhoto(doc.name)} />
                            </Card.InputContainer>
                            );
                        })}
                    </Card.InputColumn>
                    {/* <Card.ImagePreview alone id="photoPreview" src={photoPreview} />
                    <Card.ImageEditIcon /> */}
                </Card.InputRow>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Textarea type="text" id="profile" placeholder=" " autoComplete="off" value={profile} onChange={({target}) => setProfile(target.value)} />
                    {/* <Card.RTEditor
                        profile={profile}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        wrapperStyle={RTEditorStyles}
                        onEditorStateChange={onEditorStateChange}
                    /> */}
                    {/* <Card.ViewMarkupText id="profile" content={profile} /> */}
                    <Card.Label htmlFor="profile" mandatory>Profile</Card.Label>
                </Card.InputContainer>
                </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Textarea type="text" id="address" placeholder=" " autoComplete="off" value={address} onChange={({target}) => setAddress(target.value)} />
                    <Card.Label htmlFor="address" mandatory>Address</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="text" id="currLoc" placeholder=" " autoComplete="off" value={currLoc} onChange={({target}) => setCurrLoc(target.value)} />
                    <Card.Label htmlFor="currLoc" mandatory>Current Location</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="noticePeriod" placeholder=" " autoComplete="off" value={noticePeriod} onChange={({target}) => setNoticePeriod(target.value)} />
                    <Card.Label htmlFor="noticePeriod" mandatory>Notice Period</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer suffix={"years"}>
                    <Card.Input type="number" id="expYears" onWheel={(e) => e.target.blur()} placeholder=" " onKeyDown={blockInvalidNumber} autoComplete="off" value={expYears} onChange={({target}) => handleExpYears(target.value)} />
                    <Card.Label htmlFor="expYears" mandatory>Experience</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer suffix={"months"}>
                    <Card.Input type="number" id="expMonths" onWheel={(e) => e.target.blur()} placeholder=" " onKeyDown={blockInvalidNumber} autoComplete="off" value={expMonths} onChange={({target}) => handleExpMonths(target.value)} />
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="text" id="prefJobLoc" placeholder=" " autoComplete="off" value={prefJobLoc} onChange={({target}) => setPrefJobLoc(target.value)} />
                    <Card.Label htmlFor="prefJobLoc" mandatory>Pref Job Location</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer refPointer={prefJobTenureRef}>
                    <Card.Input readOnly type="text" id="prefJobTenure" placeholder=" " autoComplete="off" value={prefJobTenure} onClick={() => setPrefJobTenureDD((prefJobTenureDD) => !prefJobTenureDD)} />
                    <Card.Label htmlFor="prefJobTenure" mandatory>Pref Job Tenure</Card.Label>
                    <Dropdown width={"100%"} dropdown={prefJobTenureDD} flexDirection="column">
                        {jobTenureList.map((item) => {
                            return <Dropdown.Option selected={(prefJobTenure === item.tenure) ? "selected" : undefined} key={item.id} onClick={() => changePrefJobTenure(item.tenure)}>{item.tenure}</Dropdown.Option>
                        })}
                    </Dropdown>
                    <Card.Icon style={{pointerEvents: "none"}}>
                        {(prefJobTenureDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Card.Icon>
                </Card.InputContainer>
                <Card.InputContainer refPointer={prefJobTypeRef}>
                    <Card.Input readOnly type="text" id="prefJobType" placeholder=" " autoComplete="off" value={prefJobType} onClick={() => setPrefJobTypeDD((prefJobTypeDD) => !prefJobTypeDD)} />
                    <Card.Label htmlFor="prefJobType" mandatory>Pref Job Type</Card.Label>
                    <Dropdown width={"100%"} dropdown={prefJobTypeDD} flexDirection="column">
                        {jobTypeList.map((item) => {
                            return <Dropdown.Option selected={(prefJobType === item.type) ? "selected" : undefined} key={item.id} onClick={() => changePrefJobType(item.type)}>{item.type}</Dropdown.Option>
                        })}
                    </Dropdown>
                    <Card.Icon style={{pointerEvents: "none"}}>
                        {(prefJobTypeDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Card.Icon>
                </Card.InputContainer>
                <Card.InputContainer refPointer={prefJobModeRef}>
                    <Card.Input readOnly type="text" id="prefJobMode" placeholder=" " autoComplete="off" value={prefJobMode} onClick={() => setPrefJobModeDD((prefJobModeDD) => !prefJobModeDD)} />
                    <Card.Label htmlFor="prefJobMode" mandatory>Pref Job Mode</Card.Label>
                    <Dropdown width={"100%"} dropdown={prefJobModeDD} flexDirection="column">
                        {jobModeList.map((item) => {
                            return <Dropdown.Option selected={(prefJobMode === item.mode) ? "selected" : undefined} key={item.id} onClick={() => changePrefJobMode(item.mode)}>{item.mode}</Dropdown.Option>
                        })}
                    </Dropdown>
                    <Card.Icon style={{pointerEvents: "none"}}>
                        {(prefJobModeDD) ? <FiChevronUp /> : <FiChevronDown />}
                    </Card.Icon>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="number" id="currCTC" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" onKeyDown={blockInvalidNumber} value={currCTC} onChange={({target}) => currCTCHandler(target.value)} />
                    <Card.Label htmlFor="currCTC" mandatory>Current CTC</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="videoProfileLink" placeholder=" " autoComplete="off" value={videoProfileLink} onChange={({target}) => setVideoProfileLink(target.value)} />
                    <Card.Label htmlFor="videoProfileLink">Video Profile Link</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer prefixx={"Min: "}>
                    <Card.Input type="number" id="minExpCTC" onWheel={(e) => e.target.blur()} placeholder=" " onKeyDown={blockInvalidNumber} autoComplete="off" value={minExpCTC} onChange={({target}) => minExpCTCHandler(target.value)} />
                    <Card.Label htmlFor="minExpCTC" mandatory prefixx>Expected CTC</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer prefixx={"Max: "}>
                    <Card.Input type="number" id="maxExpCTC" onWheel={(e) => e.target.blur()} placeholder=" " onKeyDown={blockInvalidNumber} autoComplete="off" value={maxExpCTC} onChange={({target}) => maxExpCTCHandler(target.value)} />
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                {/* <Card.InputContainer>
                    <Card.Input type="text" id="qualification" placeholder=" " autoComplete="off" value={qualification} onChange={({target}) => setQualification(target.value)} />
                    <Card.Label htmlFor="qualification" mandatory>Qualification</Card.Label>
                </Card.InputContainer> */}
                <Card.InputContainer refPointer={qualificationRef}>
                    <Card.Input readOnly type="text" id="qualification" placeholder=" " autoComplete="off" value={qualification} onClick={() => setQualificationDD((qualificationDD) => !qualificationDD)} />
                    <Card.Label htmlFor="qualification" mandatory>Qualification</Card.Label>
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
                    <Card.Label htmlFor="skills" mandatory>Skills</Card.Label>
                </Card.InputContainer> */}
                <Card.InputContainer refPointer={skillRef}>
                    <Card.Input readOnly type="text" id="skill" placeholder=" " autoComplete="off" value={skill} onClick={() => setSkillDD((skillDD) => !skillDD)} />
                    <Card.Label htmlFor="skill" mandatory>Skills</Card.Label>
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
                <Card.InputContainer>
                    <Card.Input file={resume?.name} type="file" accept=".pdf,.docx,.doc,.xlsx" id="resume" placeholder=" " autoComplete="off" onChange={({ target }) => resumeHandler(target.files)} />
                    <Card.Label htmlFor="resume" mandatory>Resume</Card.Label>
                    <Card.Placeholder visible={resume.length === 0 ? true : false}>
                        Max size 1MB
                    </Card.Placeholder>
                    <Card.Tooltip>
                        File size should be less than 1MB. File types can be .pdf, .docx, .xlsx
                    </Card.Tooltip>
                </Card.InputContainer>
                {resume.map((doc) => {
                    return (
                    <Card.InputContainer key={doc.name}>
                        <Card.FilePreview>
                            <Card.FileProp>Name: {doc.name}</Card.FileProp>
                            <Card.FileProp>Size: {((doc.size)/1000000).toFixed(2)}MB</Card.FileProp>
                            <Card.FileIcon onClick={() => removeResume(doc.name)}><AiFillDelete /></Card.FileIcon>
                        </Card.FilePreview>
                    </Card.InputContainer>
                    );
                })}
            </Card.InputColumn>
            <Card.ButtonGroup marginTop>
                <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                <Button disabled={isInvalid} onClick={() => handleUpdateProfile()}>{JWT?.user?.isProfileCompleted ? "Update" : "Create"} profile</Button>
            </Card.ButtonGroup>
        </Card>
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