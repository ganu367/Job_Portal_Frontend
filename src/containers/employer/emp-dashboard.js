import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Card, Button } from "../../components";
import { useAlert, useAxiosPrivate } from "../../hooks";
import { GiShare } from "react-icons/gi";
import { FiCheck } from "react-icons/fi";

const CopyIcon = ({params}) => {
    const {setAlert} = useAlert();
    const [copied, setCopied] = useState(false);
    const copyLink = (params) => {
        navigator.clipboard.writeText(params);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    useEffect(() => {
        if (copied) {
            setAlert({type: "success", msg: "Link copied to clipboard!"})
        }
    }, [copied]);

    return (<>
                <Button iconPadding onClick={() => copyLink(params)}>
                    <Button.Icon alone>{copied ? <FiCheck /> : <GiShare />}</Button.Icon>
                </Button>
            </>
            );
}

function EmpDashboard() {
    const location = useLocation();
    const {setAlert} = useAlert();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/company";
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axiosPrivate
        .get("/api/employer/job/all-jobs")
        .then(function (response) {
            // console.log(response?.data);
            const jobs = response?.data;
            setJobs(jobs);
            // setName(job?.company_name);
            // setCountry(job?.country_code);
            // setMobile(job?.mobile_number);
            // setAddress(job?.address ? job?.address : "");
            // setContactPerson(job?.job_name ? job?.job_name : "");
            // setGST(job?.gst_number ? job?.gst_number : "");
            // setPAN(job?.pan_number ? job?.pan_number : "");
            // setProfile(job?.profile ? job?.profile : "");
            // setWebsite(job?.web_url ? job?.web_url : "");
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/employer/dashboard", {state: { from: location }});
        });
    },[]);

    return (
        <>
        <Card width="75%">
            <Card.Title>
                Dashboard
            </Card.Title>
            <Card.Line />
            <Card.ButtonGroup flexStart>
                <Button small onClick={() => navigate("/employer/post-job", {state: { from: location }})}>Post Job</Button>
            </Card.ButtonGroup>
        </Card>
        <Card width="75%">
            <Table>
                <Table.Row header last>
                    <Table.Column flex={0.75}>
                        <Table.Header>Profile</Table.Header>
                    </Table.Column>
                    <Table.Column flex={0.45}>
                        <Table.Header>Status</Table.Header>
                    </Table.Column>
                    {/* <Table.Column>
                        <Table.Header>Applications</Table.Header>
                    </Table.Column> */}
                    <Table.Column flex={0.65}>
                        <Table.Header last>Action</Table.Header>
                    </Table.Column>
                </Table.Row>
                {jobs.map((job, index) => {
                    return (
                        <div style={{width: "100%"}} key={index}>
                        <Table.Row key={index} last>
                            <Table.Column flex={0.75}>
                                <Table.Data>{job.job_title}</Table.Data>
                            </Table.Column>
                            <Table.Column flex={0.45}>
                                <Table.Data center><Table.JobStatusBox status={job.status}>{job.status}</Table.JobStatusBox></Table.Data>
                            </Table.Column>
                            {/* <Table.Column>
                                <Table.Data><Table.Box>Total applications: {job.total_app}</Table.Box></Table.Data>
                                <Table.Data><Table.Box>Shortlisted applications: {job.shortlist_app}</Table.Box></Table.Data>
                                <Table.Data><Table.Box>Hired applications: {job.hire_app}</Table.Box></Table.Data>
                                <Table.Data><Table.Box>Rejected applications: {job.reject_app}</Table.Box></Table.Data>
                            </Table.Column> */}
                            <Table.Column flex={0.65}>
                                <Table.Data center>
                                    <Card.ButtonGroup>
                                        <Button small onClick={() => navigate(`/employer/job/${job.id}`, {state: { from: location }})}>View job</Button>
                                        <CopyIcon params={job.share_link} />
                                    </Card.ButtonGroup>
                                    </Table.Data>
                            </Table.Column>
                        </Table.Row>
                        <Table.Row justifyStart>
                            <Table.Data><Table.Box color={"info"}>Total applications: {job.total_app ? job.total_app : "0"}</Table.Box></Table.Data>
                            <Table.Data><Table.Box color={"caution"}>Shortlisted applications: {job.shortlist_app ? job.shortlist_app : "0"}</Table.Box></Table.Data>
                            <Table.Data><Table.Box color={"success"}>Hired applications: {job.hire_app ? job.hire_app : "0"}</Table.Box></Table.Data>
                            <Table.Data><Table.Box color={"danger"}>Rejected applications: {job.reject_app ? job.reject_app : "0"}</Table.Box></Table.Data>
                        </Table.Row>
                        </div>
                    );
                })}
                {jobs.length === 0 &&
                    <Table.SpecialRow last>
                        <Table.Data>No jobs posted!</Table.Data>
                    </Table.SpecialRow>
                }
            </Table>
        </Card>
        </>
    );
}

export default EmpDashboard;
