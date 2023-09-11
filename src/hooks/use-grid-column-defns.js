import { Grid, Button, Card } from "../components";
import { BiDownload } from "react-icons/bi";
import { GiShare } from "react-icons/gi";
import { FiCheck } from "react-icons/fi";
import { useAlert, useGetFile, useSecondIndex } from "../hooks";
import { useEffect, useState } from "react";
import styled from "styled-components/macro";

export default function useGridColumnDefns() {
    const getFile = useGetFile();
    const getSecondIndex = useSecondIndex();
    
    const CopyIcon = ({params}) => {
        const {setAlert} = useAlert();
        const [copied, setCopied] = useState(false);
        const copyLink = (params) => {
            navigator.clipboard.writeText(params?.value);
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

        return (<Grid.ButtonGroup flexStart>
                    {params?.value &&
                        <>
                            <Button forGrid small onClick={() => copyLink(params)}>
                                <Button.Icon alone>{copied ? <FiCheck /> : <GiShare />}</Button.Icon>
                            </Button> {params?.value}
                        </>
                    }
                </Grid.ButtonGroup>);
    }

    const employersGridDefn = [
        // {headerName: " " ,field: "", cellRenderer: (params) => <></>,checkboxSelection: true, maxWidth: 50},
        {headerName: "ID", field: "id", hide: true },
        {headerName: "Company" ,field: "company_name"},
        {headerName: "Contact Person" ,field: "employer_name"},
        {headerName: "License Expiry" ,field: "expiry_date"},
        {headerName: "Candidate Views" ,field: "no_of_candidates_to_view"},
        {headerName: "Username" ,field: "username"},
        {headerName: "Mobile Number" ,field: "mobile_number"},
        {headerName: "GST Number" ,field: "gst_number"},
        {headerName: "PAN Number" ,field: "pan_number"},
        {headerName: "Address" ,field: "address"},
        {headerName: "Profile" ,field: "profile"},
        {headerName: "is Deleted" ,field: "is_deleted"},
    ];
    const jobsGridDefn = [
        // {headerName: " " ,field: "", cellRenderer: (params) => <></>,checkboxSelection: true, maxWidth: 50},
        {headerName: "ID", field: "id", hide: true },
        {headerName: "Title" ,field: "job_title"},
        // {headerName: "Attachment" ,field: "job_file"},
        {headerName: "Attachment" ,field: "job_file", cellRenderer: (params) => {
            if(params?.value) {
                var path = params?.value.substring(params?.value.lastIndexOf('/'));
                var subPath = path.substring(getSecondIndex(path,'_'));
            }
            return (<Grid.ButtonGroup flexStart>
                    {params?.value &&
                        <>
                            <Button forGrid small onClick={() => getFile(params?.value)}><Button.Icon alone><BiDownload /></Button.Icon></Button> {subPath}
                        </>
                    }
                </Grid.ButtonGroup>);
        }},
        {headerName: "Qualification" ,field: "qualification"},
        {headerName: "Skills" ,field: "skill"},
        {headerName: "Function" ,field: "job_function"},
        {headerName: "Hiring for" ,field: "hiring_for"},
        {headerName: "Min Experience" ,field: "experience_min"},
        {headerName: "Max Experience" ,field: "experience_max"},
        {headerName: "Min Salary" ,field: "salary_min"},
        {headerName: "Max Salary" ,field: "salary_max"},
        {headerName: "Perks & Benefits" ,field: "perks"},
        {headerName: "Start Date" ,field: "started_date"},
        {headerName: "Location" ,field: "job_location"},
        {headerName: "Tenure" ,field: "job_tenuer"},
        {headerName: "Type" ,field: "job_type"},
        {headerName: "Mode" ,field: "job_mode"},
        {headerName: "Status" ,field: "status"},
        {headerName: "Openings" ,field: "no_of_openings"},
        {headerName: "Description" ,field: "job_desc"},
        {headerName: "Other details" ,field: "other_details"},
        {headerName: "Details required" ,field: "required_details"},
        {headerName: "Assignment" ,field: "assignment"},
        // {headerName: "Assignment attachment" ,field: "assignment_file"},
        {headerName: "Assignment attachment" ,field: "assignment_file", cellRenderer: (params) => {
            if(params?.value) {
                var path = params?.value.substring(params?.value.lastIndexOf('/'));
                var subPath = path.substring(getSecondIndex(path,'_'));
            }
            return (<Grid.ButtonGroup flexStart>
                    {params?.value &&
                        <>
                            <Button forGrid small onClick={() => getFile(params?.value)}><Button.Icon alone><BiDownload /></Button.Icon></Button> {subPath}
                        </>
                    }
                </Grid.ButtonGroup>);
        }},
        {headerName: "Assignment link" ,field: "assignment_link"},
        {headerName: "Total applications" ,field: "total_app"},
        {headerName: "Shortlisted applications" ,field: "shortlist_app"},
        {headerName: "Hired applications" ,field: "hire_app"},
        {headerName: "Rejected applications" ,field: "reject_app"},
        {headerName: "Employer" ,field: "employer_name"},
        {headerName: "Posted on" ,field: "created_on"},
        {headerName: "Shareable link" ,field: "share_link", cellRenderer: (params) => <CopyIcon params={params} />},
    ];
    const candidatesGridDefn = [
        // {headerName: " " ,field: "", cellRenderer: (params) => <></>,checkboxSelection: true, maxWidth: 50},
        {headerName: "ID", field: "id", hide: true },
        {headerName: "Name" ,field: "name"},
        {headerName: "Current Location" ,field: "current_location"},
        {headerName: "Username" ,field: "username"},
        {headerName: "Mobile Number" ,field: "mobile_number"},
        // {headerName: "Photo" ,field: "photo"},
        {headerName: "Photo" ,field: "photo", cellRenderer: (params) => {
            if(params?.value) {
                var path = params?.value.substring(params?.value.lastIndexOf('/'));
                var subPath = path.substring(getSecondIndex(path,'_'));
            }
            return (<Grid.ButtonGroup flexStart>
                    {params?.value &&
                        <>
                            <Button forGrid small onClick={() => getFile(params?.value)}><Button.Icon alone><BiDownload /></Button.Icon></Button> {subPath}
                        </>
                    }
                </Grid.ButtonGroup>);
        }},
        // {headerName: "Resume" ,field: "resume"},
        {headerName: "Resume" ,field: "resume", cellRenderer: (params) => {
            if(params?.value) {
                var path = params?.value.substring(params?.value.lastIndexOf('/'));
                var subPath = path.substring(getSecondIndex(path,'_'));
            }
            return (<Grid.ButtonGroup flexStart>
                    {params?.value &&
                        <>
                            <Button forGrid small onClick={() => getFile(params?.value)}><Button.Icon alone><BiDownload /></Button.Icon></Button> {subPath}
                        </>
                    }
                </Grid.ButtonGroup>);
        }},
        {headerName: "Notice Period" ,field: "notice_period"},
        {headerName: "Profile" ,field: "profile_summery"},
        {headerName: "Preferred Job Location" ,field: "prefered_job_location"},
        {headerName: "Video profile link" ,field: "video_profile"},
        {headerName: "Experience (years)" ,field: "total_no_of_years_exp"},
        {headerName: "Experience (months)" ,field: "total_no_of_month_exp"},
        {headerName: "Preferred Job Tenure" ,field: "prefered_job_tenuer"},
        {headerName: "Preferred Job Type" ,field: "prefered_job_type"},
        {headerName: "Preferred Job Mode" ,field: "prefered_job_mode"},
        {headerName: "Current CTC" ,field: "current_ctc"},
        {headerName: "Min Expected CTC" ,field: "excepted_ctc_min"},
        {headerName: "Max Expected CTC" ,field: "excepted_ctc_max"},
        {headerName: "Qualification" ,field: "qualification"},
        {headerName: "Skills" ,field: "skill"},
        {headerName: "Address" ,field: "address"},
        {headerName: "is Deleted" ,field: "is_deleted"},
    ];

    return {employersGridDefn,jobsGridDefn,candidatesGridDefn};
};