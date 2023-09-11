import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Dropdown } from "../../components";
import { useAxiosPrivate, useAlert, useAuth, useLoading } from "../../hooks";
import { ThemeContext } from "styled-components";
import { FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { countryCodes } from "../../constants";

export default function EmpUpdateProfile() {
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const themeContext = useContext(ThemeContext);
    const {JWT,auth,setAuth} = useAuth();
    const RTEref = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState(""); 
    const [contactPerson, setContactPerson] = useState("");
    const [GST, setGST] = useState("");
    const [PAN, setPAN] = useState("");
    const [profile, setProfile] = useState(""); 
    const [website, setWebsite] = useState("");
    const [search, setSearch] = useState("");
    const countryRef = useRef();
    const [countryDD, setCountryDD] = useState(false);
    const isInvalid = name === "" || country === ""  || mobile === "" || address === "" || contactPerson === "" || PAN === "" || profile === "";
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const isValidURL = (url) => {
        return /((https?:\/\/)?(www\.)?([a-z0-9]+\.)?[^\s]+)/gi.test(url);
        // return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(url);
        // return /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(url);
    }

    const resetInputFields = () => {
        setAddress("");
        setContactPerson("");
        setGST("");
        setPAN("");
        setProfile("");
        setWebsite("");
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
        axiosPrivate
        .get("/api/employer/profile/view-profile")
        .then(function (response) {
            // console.log(response?.data);
            const employer = response?.data;
            setName(employer?.company_name);
            setCountry(employer?.country_code);
            setMobile(employer?.mobile_number);
            setAddress(employer?.address ? employer?.address : "");
            setContactPerson(employer?.employer_name ? employer?.employer_name : "");
            setGST(employer?.gst_number ? employer?.gst_number : "");
            setPAN(employer?.pan_number ? employer?.pan_number : "");
            setProfile(employer?.profile ? employer?.profile : "");
            setWebsite(employer?.web_url ? employer?.web_url : "");
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/employer/dashboard", {state: { from: location }});
        });
    },[]);

    const handleUpdateProfile = () => {
        if(mobile.length !== 10) {
            setAlert({msg: "Error: Mobile number does not have 10 digits!", type: "error"});
            return;
        }
        if(PAN.length !== 10) {
            setAlert({msg: "Error: PAN number does not have 10 digits!", type: "error"});
            return;
        }
        if (website !== "") {
            if(!isValidURL(website)) {
                setAlert({msg: `Error: Website is invalid!`, type: "error"});
                return;
            }
        }
        setLoading(true);
        axiosPrivate
        .put("/api/employer/profile/update-profile", {company_name: name, country_code: country, mobile_number: mobile, profile: profile, address: address, employer_name: contactPerson, gst_number: GST, pan_number: PAN, web_url: website},
        {headers: {
            "Content-Type": "application/json"
        }})
        .then(function (response) {
            // console.log(response?.data)
            setLoading(false);
            setAlert({msg: `Success: ${response?.data?.msg}`, type: "success"});
            const accessToken = response?.data?.access_token;
            setAuth({accessToken});
            if (JWT?.user?.isProfileCompleted) {
                navigate("/employer/dashboard");
            }
        })
        .catch(function (error) {
            setLoading(false);
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    const RTEconfig = {
        width: "100%",
        readOnly: false,
        style: {
            background: themeContext.backgroundColor1,
            color: themeContext.textColor1,
        },
        theme : (themeContext.type === "dark") ? "dark" : "light",
        placeholder: "Profile"
    }

    // useEffect(() => {
    //     console.log(profile);
    // }, [profile])

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>My Profile</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => navigate("/employer/profile", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
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
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="text" id="name" placeholder=" " autoComplete="off" value={name} onChange={({target}) => setName(target.value)} />
                    <Card.Label htmlFor="name" mandatory>Name</Card.Label>
                </Card.InputContainer>
                <Card.InputColumn notResponsive>
                    <Card.InputContainer notAlone refPointer={countryRef} width={"30%"}>
                        <Card.Input readOnly type="text" id="country" placeholder=" " autoComplete="off" value={country} onClick={() => setCountryDD((countryDD) => !countryDD)} />
                        <Card.Label htmlFor="country" mandatory>Code</Card.Label>
                        <Dropdown width={"420%"} dropdown={countryDD} flexDirection="column">
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
                    <Card.InputContainer notAlone>
                        <Card.Input type="number" id="mobile" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" onKeyDown={blockInvalidNumber} value={mobile} onChange={({target}) => handleMobile(target.value)} />
                        <Card.Label htmlFor="mobile" mandatory>Mobile</Card.Label>
                    </Card.InputContainer>
                </Card.InputColumn>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    {/* <Card.RTEditor 
                        id="profile"
                        ref={RTEref}
                        value={profile}
                        config={RTEconfig}
                        onChange={(newProfile) => setProfile(newProfile)}
                    /> */}
                    <Card.Textarea type="text" id="profile" placeholder=" " autoComplete="off" value={profile} onChange={({target}) => setProfile(target.value)} />
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
                    <Card.Input type="text" id="contactPerson" placeholder=" " autoComplete="off" value={contactPerson} onChange={({target}) => setContactPerson(target.value)} />
                    <Card.Label htmlFor="contactPerson" mandatory>Contact Person</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="website" placeholder=" " autoComplete="off" value={website} onChange={({target}) => setWebsite(target.value)} />
                    <Card.Label htmlFor="website">Website</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input type="text" id="GST" maxLength={15} placeholder=" " autoComplete="off" value={GST} onChange={({target}) => setGST(target.value)} />
                    <Card.Label htmlFor="GST">GST Number</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="PAN" maxLength={10} placeholder=" " autoComplete="off" value={PAN} onChange={({target}) => setPAN(target.value)} />
                    <Card.Label htmlFor="PAN" mandatory>PAN Number</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.ButtonGroup marginTop>
                <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                <Button disabled={isInvalid} onClick={() => handleUpdateProfile()}>{JWT?.user?.isProfileCompleted ? "Update" : "Create"} profile</Button>
            </Card.ButtonGroup>
        </Card>
    );
}