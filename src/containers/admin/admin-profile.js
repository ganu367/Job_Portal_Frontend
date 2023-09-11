import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useGoToLink, useBase64ToFile, useSecondIndex } from "../../hooks";
import { BiLinkExternal } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

export default function AdminProfile() {
    const getSecondIndex = useSecondIndex();
    const location = useLocation();
    const goToLink = useGoToLink();
    const dataURLtoFile = useBase64ToFile();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [logo, setLogo] = useState({});
    const [logoPreview, setLogoPreview] = useState();

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
                setLogo(file);
                setLogoPreview(URL.createObjectURL(file));
            }
            else {
                setLogo({});
                setLogoPreview();
            }
        }
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
            navigate("/admin/dashboard", {state: { from: location }});
        });
    },[]);

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>My Profile</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button small onClick={() => navigate("/admin/update-profile", {state: { from: location }})}>Update Profile</Button>
                    <Button iconPadding small danger onClick={() => navigate("/admin/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn center>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewTitle textAlign=" " id="name" fontSize="1.5rem">{name}</Card.ViewTitle>
                        <Card.ViewColumn marginTop>
                            <Card.ViewLabel width="fit-content" paddingRight noPaddingBottom>USERNAME: </Card.ViewLabel>
                            <Card.ViewText width="fit-content" id="username">{username}</Card.ViewText>
                        </Card.ViewColumn>
                    </Card.ViewRow>
                </Card.InputContainer>
                <Card.InputContainer flexEnd width="fit-content">
                    <Card.ImagePreview alone id="logoPreview" src={logoPreview} />
                </Card.InputContainer>
            </Card.InputColumn>
        </Card>
    );
}