import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useBase64ToFile, useFileSizeCheck, useValidFileExtension, useLoading, useSecondIndex } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export default function EmpUpdateInterviewEval({actionType}) {
    const getSecondIndex = useSecondIndex();
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const dataURLtoFile = useBase64ToFile();
    const isFileSizeValid = useFileSizeCheck();
    const isValidFileExtension = useValidFileExtension();
    const params = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const [interview, setInterview] = useState({});
    const [score, setScore] = useState("");
    const [remarks, setRemarks] = useState("");
    const [fileAttach, setFileAttach] = useState([]);
    const blockInvalidNumber = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const isInvalid = score === "" || remarks === "";

    const resetInputFields = () => {
        setScore("");
        setRemarks("");
        setFileAttach([]);
    }

    const fileAttachHandler = (docs) => {
        const fileList = []
        for(let i = 0; i < docs.length; i++) {
            fileList.push(docs[i]);
        }
        setFileAttach(fileList);
    }
    const removeFileAttach = (filename) => {
        setFileAttach(fileAttach.filter((file) => file.name !== filename));
    }

    const handleUpdateInterviewEval = () => {
        if (fileAttach.length !== 0) {
            if (!isValidFileExtension(fileAttach[0].name,["pdf","docx","xlsx"])) {
                setAlert({msg: "Type of File attachment invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(fileAttach[0].size)) {
                setAlert({msg: "File attachment size limit is 1MB", type: "error"});
                return;
            }
        }
        setLoading(true);
        // if(actionType === "create") {
            axiosPrivate
            .post("/api/employer/job/interview-evaluation/"+params.interviewID, {interview_score: score, interview_remarks: remarks, evalution_files: fileAttach[0]},
            {headers: {
                "Content-Type": "multipart/form-data"
            }})
            .then(function (response) {
                setLoading(false);
                // console.log(response?.data);
                setAlert({msg: `Success: ${response?.data}`, type: "success"});
                navigate("/employer/job/"+params.jobID+"/candidate/"+params.candID+"/interview", {state: { from: location }});
            })
            .catch(function (error) {
                setLoading(false);
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        // }
    }

    const fileHandler = (file,filePath) => {
        if(filePath === "fileAttach") {
            if(file !== undefined) {
                setFileAttach([file]);
            }
            else {
                setFileAttach([]);
            }
        }
    }

    const scoreHandler = (score) => {
        if ((score >= 1 && score <= 10) || score == "") {
            setScore(score.replace(/^0+/, ''));
        }
        // if (score == 0) {
        //     setScore(score.replace(/^0+/, 0))
        // }
    }

    const viewFile = async (path, filePath) => {
        try {
            const response = await axiosPrivate.get("/api/utility/send-file", {params: {file_path: path}}, {responseType: "arraybuffer"});
            if(response?.data) {
                const previewURL = "data:image/jpeg;base64," + response?.data;
                var subPath = path.substring(path.lastIndexOf('/'));
                const docFile = dataURLtoFile(previewURL, subPath.substring(getSecondIndex(subPath,'_')), {type: "application/octet-stream"});
                // const docFile = dataURLtoFile(previewURL, path.substring(path.lastIndexOf('/')+9), {type: "application/octet-stream"});
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

    useEffect(() => {
        axiosPrivate
        .get("/api/employer/job/get-interview/"+params.interviewID)
        .then(function (response) {
            // console.log(response?.data);
            const interview = response?.data;
            setInterview(interview)
            if (actionType === "update") {
                setScore(interview?.interview_score);
                setRemarks(interview?.interview_remarks);
                if(interview?.interview_document !== null) {
                    viewFile(interview?.interview_document,"fileAttach");
                }
            }
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
                navigate("/employer/dashboard", {state: { from: location }});
            });
    }, []);

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>{interview?.interview_title}</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => navigate(`/employer/job/${params.jobID}/candidate/${params.candID}/interview`, {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer suffix={"/10"}>
                    <Card.Input type="number" id="score" onWheel={(e) => e.target.blur()} placeholder=" " autoComplete="off" value={score} onKeyDown={blockInvalidNumber} onChange={({target}) => scoreHandler(target.value)} />
                    <Card.Label htmlFor="score" mandatory>Score</Card.Label>
                </Card.InputContainer>
                <Card.InputContainer>
                    <Card.Input type="text" id="remarks" placeholder=" " autoComplete="off" value={remarks} onChange={({target}) => setRemarks(target.value)} />
                    <Card.Label htmlFor="remarks" mandatory>Remarks</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Input file={fileAttach?.name} type="file" accept=".pdf,.docx,.doc,.xlsx" id="fileAttach" placeholder=" " autoComplete="off" onChange={({ target }) => fileAttachHandler(target.files)} />
                    <Card.Label htmlFor="fileAttach">File Attachment</Card.Label>
                    <Card.Placeholder visible={fileAttach.length === 0 ? true : false}>
                        Max size 1MB
                    </Card.Placeholder>
                    <Card.Tooltip>
                        File size should be less than 1MB. File types can be .pdf, .docx, .xlsx
                    </Card.Tooltip>
                </Card.InputContainer>
                {fileAttach.map((doc) => {
                    return (
                    <Card.InputContainer key={doc.name}>
                        <Card.FilePreview>
                            <Card.FileProp>Name: {doc.name}</Card.FileProp>
                            <Card.FileProp>Size: {((doc.size)/1000000).toFixed(2)}MB</Card.FileProp>
                            <Card.FileIcon onClick={() => removeFileAttach(doc.name)}><AiFillDelete /></Card.FileIcon>
                        </Card.FilePreview>
                    </Card.InputContainer>
                    );
                })}
            </Card.InputColumn>
            <Card.ButtonGroup marginTop>
                <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                <Button disabled={isInvalid} onClick={() => handleUpdateInterviewEval()}>{actionType === "create" ? "Evaluate" : "Update"}</Button>
            </Card.ButtonGroup>
        </Card>
    );
}