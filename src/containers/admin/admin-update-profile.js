import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Dropdown } from "../../components";
import { useAuth, useAxiosPrivate, useAlert, useBase64ToFile, useFileSizeCheck, useValidFileExtension, useLoading, useSecondIndex } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import { countryCodes, jobTenureList, jobTypeList, jobModeList, defaultAvatar } from "../../constants";

export default function AdminUpdateProfile() {
    const getSecondIndex = useSecondIndex();
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const {setAuth} = useAuth();
    const dataURLtoFile = useBase64ToFile();
    const isFileSizeValid = useFileSizeCheck();
    const isValidFileExtension = useValidFileExtension();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [logo, setLogo] = useState([]);
    const [logoPreview, setLogoPreview] = useState();
    
    const isInvalid = name === "" || username === "" || logo.length === 0;
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const resetInputFields = () => {
        setName("");
        setUsername("");
        setLogo([]);
        setLogoPreview();
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
        if(filePath === "logoPreview") {
            if(file !== undefined) {
                setLogo([file]);
                setLogoPreview(URL.createObjectURL(file));
            }
            else {
                setLogo([]);
                setLogoPreview();
            }
        }
    }

    const imageHandler = (img) => {
        // console.log("img: ",img);
        if(img[0] !== undefined) {
            const imageList = []
            for(let i = 0; i < img.length; i++) {
                imageList.push(img[i]);
            }
            setLogo(imageList);
            setLogoPreview(URL.createObjectURL(imageList[0]));
        }
        else {
            setLogo([]);
            setLogoPreview(defaultAvatar);
        }
    }

    const removeLogo = (filename) => {
        setLogo(logo.filter((file) => file.name !== filename));
        setLogoPreview();
    }

    useEffect(() => {
        axiosPrivate
        .get("/api/admin/profile/view-profile")
        .then(function (response) {
            // console.log(response?.data);
            const admin = response?.data;
            setName(admin?.organisation_name);
            setUsername(admin?.username);
            if(admin.logo !== null) {
                viewFile(admin.logo,"logoPreview");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/admin/dashboard");
        });
    },[]);

    const handleUpdateProfile = () => {
        if (logo.length !== 0) {
            if (!isValidFileExtension(logo[0].name,["png","jpeg","jpg"])) {
                setAlert({msg: "Type of logo invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(logo[0].size)) {
                setAlert({msg: "Logo size limit is 1MB", type: "error"});
                return;
            }
        }
        setLoading(true);
        axiosPrivate
        .put("/api/admin/profile/update-profile", {logo: logo[0], organisation_name: name, username: username},
        {headers: {
            "Content-Type": "multipart/form-data"
        }})
        .then(function (response) {
            setLoading(false);
            // console.log(response?.data)
            setAlert({msg: `Success: ${response?.data?.msg}`, type: "success"});
            const accessToken = response?.data?.access_token;
            setAuth({accessToken});
            navigate("/admin/dashboard", {state: { from: location }});
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
    
    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>My Profile</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button small iconPadding danger onClick={() => navigate("/admin/profile", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn center>
                <Card.InputRow>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="name" placeholder=" " autoComplete="off" value={name} onChange={({target}) => setName(target.value)} />
                            <Card.Label htmlFor="name" mandatory>Name</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input type="text" id="username" placeholder=" " autoComplete="off" value={username} onChange={({target}) => setUsername(target.value)} />
                            <Card.Label htmlFor="username" mandatory>Username</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                </Card.InputRow>
                <Card.InputRow center width={"fit-content"}>
                    <Card.InputColumn>
                        <Card.InputContainer width="100%" noMarginBottom>
                            <Card.Input file={logo[0]?.name} type="file" id="logo" onChange={({target}) => imageHandler(target.files)} accept=".png,.jpeg,.jpg" /> 
                            <Card.Label htmlFor="logo">Logo</Card.Label>
                            <Card.Placeholder visible={logo.length === 0 ? true : false}>
                                Max size 1MB
                            </Card.Placeholder>
                            <Card.Tooltip>
                                File size should be less than 1MB. File types can be .jpeg, .jpg, .png
                            </Card.Tooltip>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        {logo.map((doc) => {
                            return (
                            <Card.InputContainer width="fit-content" key={doc.name}>
                                <Card.ImagePreview alone id="logoPreview" src={URL.createObjectURL(doc)} />
                                <Card.ImageRemoveIcon onClick={() => removeLogo(doc.name)} />
                            </Card.InputContainer>
                            );
                        })}
                    </Card.InputColumn>
                </Card.InputRow>
            </Card.InputColumn>
            <Card.ButtonGroup marginTop>
                <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                <Button disabled={isInvalid} onClick={() => handleUpdateProfile()}>Update profile</Button>
            </Card.ButtonGroup>
        </Card>
    );
}