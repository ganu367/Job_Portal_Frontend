import React, { useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Nav } from "../components";
import { useAlert, useSidebar, useBase64ToFile, useAuth } from "../hooks";
import { ProtectedComponent } from "../helpers";
import axios from "../api/axios";
// import { RoleView } from "../helpers";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { acecomLogo } from "../constants";

export default function SidebarContainer() {
    const location = useLocation();
    const {auth} = useAuth();
    const dataURLtoFile = useBase64ToFile();
    const {sidebarToggle, setSidebarToggle} = useSidebar();
    const {setAlert} = useAlert();
    const [candidateDD, setCandidateDD] = useState(false);
    const [showLink, setShowLink] = useState(true);
    const jobCandidatePath = matchPath({ path: "/employer/job/:id/*" }, location.pathname);
    const jobsPath = matchPath({ path: "/candidate/jobs/*" }, location.pathname);
    const empPath = matchPath({ path: "/employer/*" }, location.pathname);
    const candPath = matchPath({ path: "/candidate/*" }, location.pathname);
    const [logo, setLogo] = useState([]);
    const [organisationName, setOrganisationName] = useState("Acecom Solutions");
    const [logoPreview, setLogoPreview] = useState(acecomLogo);

    useEffect(() => {
        axios
        .get("/api/utility/get-logo")
        .then(function (response) {
            // console.log(response?.data);
            if(response?.data?.logo !== undefined && response?.data?.logo !== null) {
                const previewURL = "data:image/jpeg;base64," + response?.data?.logo;
                const docFile = dataURLtoFile(previewURL, "logo.png", {type: "image/png"});
                fileHandler(docFile);
            }
            else {
                setLogoPreview(acecomLogo);
            }
            if(response?.data?.organisation_name) {
                setOrganisationName(response?.data?.organisation_name)
            }
            else {
                setOrganisationName("Acecom Solutions");
            }
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }, [auth]);

    // useEffect(() => {
    //     console.log(logo)
    // }, [logo])
    
    
    const fileHandler = (file) => {
        if(file !== undefined) {
            setLogo([file]);
            setLogoPreview(URL.createObjectURL(file));
        }
    }
    
    return (
        <Nav sidebarToggle={sidebarToggle}>
            <Nav.Close sidebarToggle={sidebarToggle} onClick={() => setSidebarToggle(!sidebarToggle)} />
            <Nav.Header>
                <Nav.Logo id="logoPreview" src={logoPreview} />
                <Nav.Title>{organisationName}</Nav.Title>
            </Nav.Header>
            <Nav.Line />
            <Nav.LinkContainer>
                <ProtectedComponent>
                    {empPath?.pathname === location.pathname &&
                        <>
                            <Nav.Link>
                                <Nav.LinkText to={{pathname: `/employer/dashboard`, state: { from: location }}}>Dashboard</Nav.LinkText>
                            </Nav.Link>
                        </>
                    }
                    {candPath?.pathname === location.pathname &&
                        <>
                            <Nav.Link>
                                <Nav.LinkText to={{pathname: `/candidate/dashboard`, state: { from: location }}}>Dashboard</Nav.LinkText>
                            </Nav.Link>
                            <Nav.Link>
                                <Nav.LinkText to={{pathname: `/candidate/interviews`, state: { from: location }}}>Interviews</Nav.LinkText>
                            </Nav.Link>
                            <Nav.Link>
                                <Nav.LinkText onClick={() => setCandidateDD((candidateDD) => !candidateDD)}>
                                    Jobs
                                    <Nav.Icon>
                                        {(candidateDD) ? <FiChevronUp /> : <FiChevronDown />}
                                    </Nav.Icon>
                                </Nav.LinkText>
                                <Nav.Dropdown dropdown={candidateDD}>
                                    <Nav.DropdownItem to={{pathname: `/candidate/jobs`, state: { from: location }}}>Search</Nav.DropdownItem>
                                    <Nav.DropdownItem to={{pathname: `/candidate/jobs/applied`, state: { from: location }}}>Applied Jobs</Nav.DropdownItem>
                                    <Nav.DropdownItem to={{pathname: `/candidate/jobs/withdrawn`, state: { from: location }}}>Withdrawn Jobs</Nav.DropdownItem>
                                </Nav.Dropdown>
                            </Nav.Link>
                            <Nav.Link>
                                <Nav.LinkText to={{pathname: `/candidate/jobs/chat`, state: { from: location }}}>Message Box</Nav.LinkText>
                            </Nav.Link>
                        </>
                    }
                </ProtectedComponent>
                {jobCandidatePath?.pathname === location.pathname &&
                    <>
                        <Nav.Link>
                            <Nav.LinkText to={{pathname: `/employer/job/${jobCandidatePath.params.id}`, state: { from: location }}}>Manage Job</Nav.LinkText>
                        </Nav.Link>
                        {/* {showLink && */}
                            <Nav.Link>
                                <Nav.LinkText onClick={() => setCandidateDD((candidateDD) => !candidateDD)}>
                                    Candidates
                                    <Nav.Icon>
                                        {(candidateDD) ? <FiChevronUp /> : <FiChevronDown />}
                                    </Nav.Icon>
                                </Nav.LinkText>
                                <Nav.Dropdown dropdown={candidateDD}>
                                    <Nav.DropdownItem to={{pathname: `/employer/job/${jobCandidatePath.params.id}/candidates`, state: { from: location }}}>Search</Nav.DropdownItem>
                                    <Nav.DropdownItem to={{pathname: `/employer/job/${jobCandidatePath.params.id}/applications`, state: { from: location }}}>Applications</Nav.DropdownItem>
                                    {/* <Nav.DropdownItem to="">Marked as Interested</Nav.DropdownItem> */}
                                    <Nav.DropdownItem to={{pathname: `/employer/job/${jobCandidatePath.params.id}/applications/shortlisted`, state: { from: location }}}>Shortlisted</Nav.DropdownItem>
                                    <Nav.DropdownItem to={{pathname: `/employer/job/${jobCandidatePath.params.id}/applications/hired`, state: { from: location }}}>Hired</Nav.DropdownItem>
                                    <Nav.DropdownItem to={{pathname: `/employer/job/${jobCandidatePath.params.id}/applications/rejected`, state: { from: location }}}>Rejected</Nav.DropdownItem>
                                    <Nav.DropdownItem to={{pathname: `/employer/job/${jobCandidatePath.params.id}/applications/withdrawn`, state: { from: location }}}>Withdrawn</Nav.DropdownItem>
                                </Nav.Dropdown>
                            </Nav.Link>
                        {/* } */}
                        <Nav.Link>
                            <Nav.LinkText to={{pathname: `/employer/job/${jobCandidatePath.params.id}/chat`, state: { from: location }}}>Message Box</Nav.LinkText>
                        </Nav.Link>
                    </>
                }
                {jobsPath?.pathname === location.pathname &&
                    <>
                        
                    </>
                }
                {/* <Nav.Link>
                    <Nav.LinkText onClick={() => setUserDD((userDD) => !userDD)}>
                        User
                        <Nav.Icon>
                            {(userDD) ? <FiChevronUp /> : <FiChevronDown />}
                        </Nav.Icon>
                    </Nav.LinkText>
                    <Nav.Dropdown dropdown={userDD}>
                        <Nav.DropdownItem to="/user">Add user</Nav.DropdownItem>
                    </Nav.Dropdown>
                </Nav.Link>
                <Nav.Link>
                    <Nav.LinkText onClick={() => setUserRightsDD((userRightsDD) => !userRightsDD)}>
                        User Rights
                        <Nav.Icon>
                            {(userRightsDD) ? <FiChevronUp /> : <FiChevronDown />}
                        </Nav.Icon>
                    </Nav.LinkText>
                    <Nav.Dropdown dropdown={userRightsDD}>
                        <Nav.DropdownItem to="/user/rights">Add user rights</Nav.DropdownItem>
                    </Nav.Dropdown>
                </Nav.Link>
                <Nav.Link>
                    <Nav.LinkText to="/stock">Stock</Nav.LinkText>
                </Nav.Link>
                <Nav.Link>
                    <Nav.LinkText to="/vendor">Vendor</Nav.LinkText>
                </Nav.Link> */}
            </Nav.LinkContainer>
        </Nav>
    );
}