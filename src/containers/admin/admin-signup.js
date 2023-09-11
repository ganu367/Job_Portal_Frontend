import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components";
import axios from "../../api/axios";
import { useAuth, useFileSizeCheck, useValidFileExtension } from "../../hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function AdminSignup() {
    const {setAuth} = useAuth();
    const isFileSizeValid = useFileSizeCheck();
    const isValidFileExtension = useValidFileExtension();
    const navigate = useNavigate();
    const [organisationName, setOrganisationName] = useState("");
    const [logo, setLogo] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isInvalid = password === "" || username === "" || organisationName === "" || logo.length === 0;

    const resetInputFields = () => {
        setOrganisationName("");
        setLogo([])
        setUsername("");
        setPassword("");
    }

    useEffect(() => {
        setError("");
    }, [username,password,organisationName]);
    
    const handleSignup = async (event) => {
        event.preventDefault();
        if (logo.length !== 0) {
            if (!isValidFileExtension(logo[0].name,["png","jpg","jpeg"])) {
                setError("Type of Logo invalid!");
                return;
            }
            if (!isFileSizeValid(logo[0].size)) {
                setError("Logo size limit is 1MB");
                return;
            }
        }
        axios
        .post("/auth/register/new-admin", {username: username, organisation_name: organisationName, password: password, logo: logo[0]},
        {headers: {
            "Content-Type": "multipart/form-data"
        }})
        .then(function (response) {
            // console.log(response?.data)
            const accessToken = response?.data;
            setAuth({accessToken});
            resetInputFields();
        })
        .catch(function (error) {
            setError(`${error?.response?.data?.detail}`);
        });
    }

    const imageHandler = (img) => {
        // console.log("img: ",img);
        if(img[0] !== undefined) {
            const imageList = []
            for(let i = 0; i < img.length; i++) {
                imageList.push(img[i]);
            }
            setLogo(imageList);
            // setLogoPreview(URL.createObjectURL(imageList[0]));
        }
        else {
            setLogo([]);
            // setLogoPreview(defaultAvatar);
        }
    }

    const removeLogo = (filename) => {
        setLogo(logo.filter((file) => file.name !== filename));
        // setLogoPreview({});
    }

    return (
        <>
        <Form>
            <Form.Title>ADMIN REGISTRATION</Form.Title>
            <Form.Line />
            {error &&
            <Form.Error>
                Error: {error}
            </Form.Error>}
            <Form.Base onSubmit={handleSignup} >
                <Form.InputContainer>
                    <Form.Input type="text" id="organisationName" placeholder=" " autoComplete="off" value={organisationName} onChange={({target}) => setOrganisationName(target.value)} />
                    <Form.Label htmlFor="organisationName">Organisation Name</Form.Label>
                </Form.InputContainer>
                <Form.InputRow center width={"100%"}>
                    <Form.InputColumn width={"100%"}>
                        <Form.InputContainer width="100%" notLast>
                            <Form.InputColumn>
                                <Form.Input file={logo[0]?.name} type="file" id="logo" onChange={({target}) => imageHandler(target.files)} accept=".png,.jpeg,.jpg" /> 
                                <Form.Label htmlFor="logo">Logo</Form.Label>
                                <Form.Tooltip>
                                    File size should be less than 1MB. File types can be .jpeg, .jpg, .png
                                </Form.Tooltip>
                            </Form.InputColumn>
                        </Form.InputContainer>
                    </Form.InputColumn>
                    {logo.map((doc) => {
                        return (
                            <Form.InputColumn key={doc.name}>
                                <Form.InputContainer height="fit-content">
                                    <Form.ImagePreview alone id="logoPreview" src={URL.createObjectURL(doc)} />
                                    <Form.ImageRemoveIcon onClick={() => removeLogo(doc.name)} />
                                </Form.InputContainer>
                            </Form.InputColumn>
                        );
                    })}
                </Form.InputRow>
                <Form.InputContainer>
                    <Form.Input type="text" id="username" placeholder=" " autoComplete="off" value={username} onChange={({target}) => setUsername(target.value)} />
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
                Already registered? <Form.Link to="/admin/signin">Sign in now.</Form.Link>
            </Form.Text>
        </Form>
        </>
    );
}

export default AdminSignup;
