import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat } from "../../hooks";

function CandDashboard() {
    const location = useLocation();
    const {setAlert} = useAlert();
    const {dateConverter} = useDateFormat();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/company";
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/job/all-applied-jobs-dashboard")
        .then(function (response) {
            // console.log(response?.data);
            const jobs = response?.data;
            setJobs(jobs);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            navigate("/candidate/dashboard", {state: { from: location }});
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
                <Button small onClick={() => navigate("/candidate/jobs", {state: { from: location }})}>Apply for Job</Button>
            </Card.ButtonGroup>
        </Card>
        <Card width="75%">
            <Table>
                <Table.Row header last>
                    <Table.Column flex={0.33}>
                        <Table.Header>Company</Table.Header>
                    </Table.Column>
                    <Table.Column flex={0.33}>
                        <Table.Header>Profile</Table.Header>
                    </Table.Column>
                    <Table.Column flex={0.25}>
                        <Table.Header>Applied on</Table.Header>
                    </Table.Column>
                    <Table.Column flex={0.25}>
                        <Table.Header>Application status</Table.Header>
                    </Table.Column>
                    <Table.Column flex={0.3}>
                        <Table.Header last>Action</Table.Header>
                    </Table.Column>
                </Table.Row>
                {jobs.map((job, index) => {
                    return (
                        <div style={{width: "100%"}} key={index}>
                        <Table.Row key={index} last>
                            <Table.Column flex={0.33}>
                                <Table.Data>{job.company_name}</Table.Data>
                            </Table.Column>
                            <Table.Column flex={0.33}>
                                <Table.Data>{job.job_title}</Table.Data>
                            </Table.Column>
                            <Table.Column flex={0.25}>
                                <Table.Data center>{dateConverter(job.applied_on)}</Table.Data>
                            </Table.Column>
                            <Table.Column flex={0.25}>
                                <Table.Data center><Table.AppStatusBox status={job.status}>{job.status}</Table.AppStatusBox></Table.Data>
                            </Table.Column>
                            <Table.Column flex={0.3}>
                                <Table.Data center><Button small onClick={() => navigate(`/candidate/job/${job.id}`, {state: { from: location, status: "applied" }})}>View job</Button></Table.Data>
                            </Table.Column>
                            {/* <Table.Column flex={0.25}>
                                <Table.Data center><Button small onClick={() => navigate(`/candidate/job/${job.id}`)}>View job</Button></Table.Data>
                            </Table.Column> */}
                        </Table.Row>
                        <Table.Row justifyStart>
                            <Table.Data><Table.Box color={"info"}>Number of applicants: {job.total_applications}</Table.Box></Table.Data>
                            <Table.Data><Table.Box color={"info"}>Job status: <Table.JobStatusBox marginLeft small status={job.job_status}>{job.job_status}</Table.JobStatusBox></Table.Box></Table.Data>
                        </Table.Row>
                        </div>
                    );
                })}
                {jobs.length === 0 &&
                    <Table.SpecialRow last>
                        <Table.Data>No jobs applied!</Table.Data>
                    </Table.SpecialRow>
                }
            </Table>
        </Card>
        </>
    );
}

export default CandDashboard;
