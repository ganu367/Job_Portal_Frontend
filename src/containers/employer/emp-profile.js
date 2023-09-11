import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useGoToLink } from "../../hooks";
import { BiLinkExternal } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

export default function EmpProfile() {
    const location = useLocation();
    const goToLink = useGoToLink();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState(""); 
    const [contactPerson, setContactPerson] = useState("");
    const [GST, setGST] = useState("");
    const [PAN, setPAN] = useState("");
    const [profile, setProfile] = useState(""); 
    const [website, setWebsite] = useState("");

    useEffect(() => {
        axiosPrivate
        .get("/api/employer/profile/view-profile")
        .then(function (response) {
            // console.log(response?.data);
            const employer = response?.data;
            setName(employer?.company_name);
            setUsername(employer?.username);
            setCountry(employer?.country_code);
            setMobile(employer?.mobile_number);
            setAddress(employer?.address ? employer?.address : "");
            setContactPerson(employer?.employer_name ? employer?.employer_name : "");
            setGST(employer?.gst_number ? employer?.gst_number : "-");
            setPAN(employer?.pan_number ? employer?.pan_number : "");
            setProfile(employer?.profile ? employer?.profile : "");
            setWebsite(employer?.web_url ? employer?.web_url : "");
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/employer/dashboard", {state: { from: location }});
        });
    },[]);

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>My Profile</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button small onClick={() => navigate("/employer/update-profile", {state: { from: location }})}>Update Profile</Button>
                    <Button iconPadding small danger onClick={() => navigate("/employer/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer noMarginTop noMarginBottom={website !== ""}>
                    <Card.ViewRow>
                        <Card.ViewTitle id="name">{name}</Card.ViewTitle>
                        <Card.ViewSubtitle colored bold id="contactPerson">{contactPerson}</Card.ViewSubtitle>
                        <Card.ViewSubtitle id="username">{username}</Card.ViewSubtitle>
                        <Card.ViewSubtitle id="mobile">{country}{mobile}</Card.ViewSubtitle>
                        {website !== "" &&
                            <Card.InputContainer notAlone width="fit-content">
                                <Card.ViewText id="website">{website}</Card.ViewText>
                                <Button small onClick={() => goToLink(website)}><Button.Icon alone><BiLinkExternal /></Button.Icon></Button>
                            </Card.InputContainer>
                        }
                    </Card.ViewRow>
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
            {/* <Card.InputColumn>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewLabel>WEBSITE: </Card.ViewLabel>
                        <Card.ViewText id="website">{website}</Card.ViewText>
                    </Card.ViewRow>
                </Card.InputContainer>
            </Card.InputColumn> */}
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewLabel>GST NUMBER: </Card.ViewLabel>
                        <Card.ViewText id="GST">{GST}</Card.ViewText>
                    </Card.ViewRow>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.ViewRow>
                        <Card.ViewLabel>PAN NUMBER: </Card.ViewLabel>
                        <Card.ViewText id="PAN">{PAN}</Card.ViewText>
                    </Card.ViewRow>
                </Card.InputContainer>
            </Card.InputColumn>
        </Card>
    );
}