import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "../../components";
import axios from "../../api/axios";
import { useAuth, useLoading } from "../../hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { countryCodes } from "../../constants";

function CandSignup() {
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/company";
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [alert, setAlert] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const countryRef = useRef();
    const [countryDD, setCountryDD] = useState(false);
    const isInvalid = password === "" || username === "" || mobile === "" || name === "" || country === "";
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const resetInputFields = () => {
        setName("");
        setCountry("");
        setMobile("");
        setUsername("");
        setPassword("");
    }

    useEffect(() => {
        setError("");
    }, [username,password,mobile,name]);
    
    useEffect(() => {
        if(alert !== "") {
            const timeout = setTimeout(() => {
                setAlert("");
            }, 10000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [alert]);
    
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
    const isValidEmail = (username) => {
        return /\S+@\S+\.\S+/.test(username);
    }
    
    const handleSignup = async (event) => {
        event.preventDefault();
        if(!isValidEmail(event.target.username.value)) {
            setError("Username is invalid! Enter a valid email! Example: abc@gmail.com");
            return;
        }
        if(mobile.length !== 10) {
            setError("Mobile number does not have 10 digits!");
            return;
        }
        const data = {
            username: username,
            password: password,
            name: name,
            country_code: country,
            mobile_number: mobile
        };
        try {
            setLoading(true);
            const response = await axios.post("/auth/register/new-candidate",
            data,
            {
                headers: { "Content-Type": "application/json"},
                withCredentials: true
            }
            );
            console.log(response?.data);
            if (response?.data) {
                setLoading(false);
                setAlert(response?.data[0]);
            }
            // const accessToken = response?.data;
            // setAuth({accessToken});
            resetInputFields();
        }
        catch (err) {
            setLoading(false);
            if(!err?.response) {
                setError("No server response!");
            }
            else if (err.response?.status === 400) {
                setError("Missing username or password!")
            }
            else if (err.response?.status === 401) {
                setError("Unauthorized!")
            }
            else {
                setError(`${err?.response?.data?.detail}`);
            }
        }
    }

    return (
        <>
        <Form>
            <Form.Title>CANDIDATE SIGN UP</Form.Title>
            <Form.Line />
            {error &&
                <Form.Error>
                    Error: {error}
                </Form.Error>
            }
            {alert &&
                <Form.Alert>
                    Alert: {alert}
                </Form.Alert>
            }
            <Form.ToggleGroup>
                <Form.Toggle onClick={() => {
                    navigate("/employer/signup", {state: { from: location }});
                    resetInputFields();
                }}>
                    Signup as employer
                </Form.Toggle>
            </Form.ToggleGroup>
            <Form.Base onSubmit={handleSignup} >
                <Form.InputContainer>
                    <Form.Input type="text" id="name" placeholder=" " autoComplete="off" value={name} onChange={({target}) => setName(target.value)} />
                    <Form.Label htmlFor="name">Name</Form.Label>
                </Form.InputContainer>
                <Form.InputColumn>
                    <Form.InputContainer refPointer={countryRef} width={"30%"}>
                        <Form.Input readOnly type="text" id="country" placeholder=" " autoComplete="off" value={country} onClick={() => setCountryDD((countryDD) => !countryDD)} />
                        <Form.Label small htmlFor="country">Code</Form.Label>
                        <Form.Dropdown width={"500%"} dropdown={countryDD} flexDirection="column">
                            <Form.SearchContainer>
                                <Form.Search type="text" id="search" placeholder="Search country..." autoComplete="off" value={search} onChange={({target}) => setSearch(target.value)} />
                                <Form.Icon search><BiSearch /></Form.Icon>
                            </Form.SearchContainer>
                            {countryCodes.filter(searchFor(search)).map((item) => {
                                return <Form.Option selected={(country === item.dial_code) ? "selected" : undefined} key={item.code} onClick={({target}) => changeCountry(item.dial_code)}>{item.name}, {item.dial_code}</Form.Option>
                            })}
                        </Form.Dropdown>
                        <Form.Icon style={{pointerEvents: "none"}}>
                            {(countryDD) ? <FiChevronUp /> : <FiChevronDown />}
                        </Form.Icon>
                    </Form.InputContainer>
                    <Form.InputContainer notAlone>
                        <Form.Input type="number" id="mobile" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" onKeyDown={blockInvalidNumber} value={mobile} onChange={({target}) => handleMobile(target.value)} />
                        <Form.Label htmlFor="mobile">Mobile Number</Form.Label>
                    </Form.InputContainer>
                </Form.InputColumn>
                <Form.InputContainer>
                    <Form.Input type="text" id="username" placeholder="Example: abc@gmail.com" autoComplete="off" value={username} onChange={({target}) => setUsername(target.value)} />
                    <Form.Label htmlFor="username">Username</Form.Label>
                </Form.InputContainer>
                <Form.InputContainer>
                    <Form.Input type={(showPassword) ? "text" : "password"} id="password"  autoComplete="off" placeholder=" " value={password} onChange={({target}) => setPassword(target.value)} />
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Icon onClick={() => {setShowPassword(!showPassword)}}>
                        {(showPassword) ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </Form.Icon>
                </Form.InputContainer>
                <Form.Submit disabled={isInvalid} type="submit">Sign Up</Form.Submit>
            </Form.Base>
            <Form.Text>
                Already have an account? <Form.Link to="/candidate/signin">Sign in now.</Form.Link>
            </Form.Text>
        </Form>
        </>
    );
}

export default CandSignup;
