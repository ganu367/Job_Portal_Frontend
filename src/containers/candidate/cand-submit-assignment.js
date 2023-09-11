import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, Button } from "../../components";
import { useAxiosPrivate, useAlert, useBase64ToFile, useFileSizeCheck, useValidFileExtension, useGetFile, useGoToLink, useLoading, useSecondIndex } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import { BiLinkExternal, BiDownload } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export default function CandSubmitAssignment() {
    const getSecondIndex = useSecondIndex();
    const {loading, setLoading} = useLoading();
    const location = useLocation();
    const getFile = useGetFile();
    const goToLink = useGoToLink();
    const navigate = useNavigate();
    const dataURLtoFile = useBase64ToFile();
    const isFileSizeValid = useFileSizeCheck();
    const isValidFileExtension = useValidFileExtension();
    const params = useParams();
    const {state} = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const [coverLetter, setCoverLetter] = useState("");

    const [detailsReqQuestion, setDetailsReqQuestion] = useState("");
    const [ansToDetailsReq, setAnsToDetailsReq] = useState("");

    const [assignmentQuestion, setAssignmentQuestion] = useState("");
    const [assignmentReply, setAssignmentReply] = useState("");

    const [assignmentAttachQuestion, setAssignmentAttachQuestion] = useState("");
    const [assignmentAttach, setAssignmentAttach] = useState([]);

    const [assignmentLinkQuestion, setAssignmentLinkQuestion] = useState("");
    const [comment, setComment] = useState("");

    const [type, setType] = useState( state?.type ? state?.type : "update");

    const resetInputFields = () => {
        setAnsToDetailsReq("");
        setCoverLetter("");
        setAssignmentReply("");
        setAssignmentAttach([]);
    }

    const assignmentAttachHandler = (docs) => {
        const fileList = []
        for(let i = 0; i < docs.length; i++) {
            fileList.push(docs[i]);
        }
        setAssignmentAttach(fileList);
    }
    const removeAssignmentAttach = (filename) => {
        setAssignmentAttach(assignmentAttach.filter((file) => file.name !== filename));
    }

    const handleSubmitAssignment = () => {
        if (assignmentAttach.length !== 0) {
            if (!isValidFileExtension(assignmentAttach[0].name,["pdf","docx","xlsx"])) {
                setAlert({msg: "Type of Assignment File invalid!", type: "error"});
                return;
            }
            if (!isFileSizeValid(assignmentAttach[0].size)) {
                setAlert({msg: "Assignment File size limit is 1MB", type: "error"});
                return;
            }
        }
        if (type === "create") {
            setLoading(true);
            axiosPrivate
            .post("/api/candidate/job/apply-job/"+params.id, {answer_details_required: ansToDetailsReq, cover_letter: coverLetter, assignement_reply: assignmentReply, my_comment: comment, assignment_files: assignmentAttach[0]}, 
            {headers: {
                "Content-Type": "multipart/form-data"
            }})
            .then(function (response) {
                setLoading(false);
                setAlert({msg: `Success: ${response?.data}`, type: "success"});
                navigate("/candidate/jobs", {state: { from: location }});
                resetInputFields();
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
        else {
            setLoading(true);
            axiosPrivate
            .put("/api/candidate/job/update-assessment/"+params.id, {answer_details_required: ansToDetailsReq, cover_letter: coverLetter, assignement_reply: assignmentReply, my_comment: comment, assignment_files: assignmentAttach[0]}, 
            {headers: {
                "Content-Type": "multipart/form-data"
            }})
            .then(function (response) {
                setLoading(false);
                setAlert({msg: `Success: ${response?.data}`, type: "success"});
                navigate(`/candidate/job/${params.id}`, {state: {from: location, status: "applied"}});
                resetInputFields();
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
    }

    useEffect(() => {
        if (type === "update") {
            axiosPrivate
            .get("/api/candidate/job/view-assignment/"+params.id)
            .then(function (response) {
                // console.log(response?.data);
                const assignment = response?.data;
                setAnsToDetailsReq(assignment?.ans_to_required_deatail ? assignment?.ans_to_required_deatail :"");
                setCoverLetter(assignment?.cover_letter ? assignment?.cover_letter : "");
                setAssignmentReply(assignment?.assignment_reply ? assignment?.assignment_reply : "");
                if(assignment?.assignment_submission_file !== null) {
                    viewFile(assignment?.assignment_submission_file,"assignmentAttach");
                }
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
                // navigate("/candidate/dashboard");
            });
        }
    }, []);

    useEffect(() => {
        axiosPrivate
        .get("/api/candidate/job/view-assignment-questions/"+params.id)
        .then(function (response) {
            // console.log(response?.data);
            const assignmentQ = response?.data;
            setDetailsReqQuestion(assignmentQ?.required_details ? assignmentQ?.required_details :"");
            setAssignmentQuestion(assignmentQ?.assignment ? assignmentQ?.assignment : "");
            setAssignmentLinkQuestion(assignmentQ?.assignment_link ? assignmentQ?.assignment_link : "");
            setAssignmentAttachQuestion(assignmentQ?.assignment_file ? assignmentQ?.assignment_file : "");
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }, []);
    
    const fileHandler = (file,filePath) => {
        if(filePath === "assignmentAttach") {
            if(file !== undefined) {
                setAssignmentAttach([file]);
            }
            else {
                setAssignmentAttach([]);
            }
        }
        else if(filePath === "assignmentAttachQuestion") {
            if(file !== undefined) {
                setAssignmentAttachQuestion([file]);
            }
            else {
                setAssignmentAttachQuestion([]);
            }
        }
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

    return (
        <Card width="75%">
            <Card.InputColumn notResponsive center>
                <Card.Title>Assignment</Card.Title>
                <Card.ButtonGroup flexEnd>
                    <Button iconPadding small danger onClick={() => {
                        type === "create" ? navigate(-1) : navigate(`/candidate/job/${params.id}`, {state: {from: location, status: "applied"}})
                    }}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                </Card.ButtonGroup>
            </Card.InputColumn>
            <Card.Line />
            <Card.InputColumn>
                <Card.InputContainer>
                    <Card.Textarea type="text" id="coverLetter" placeholder=" " autoComplete="off" value={coverLetter} onChange={({target}) => setCoverLetter(target.value)} />
                    <Card.Label htmlFor="coverLetter">Cover Letter</Card.Label>
                </Card.InputContainer>
            </Card.InputColumn>
            {detailsReqQuestion &&
                <>
                    <Card.InputColumn>
                        <Card.InputContainer marginBottom="0.5rem" noMarginTop>
                            <Card.ViewRow>
                                <Card.ViewLabel paddingBottom="0.5rem" id="detailsReqQuestion">Details required from candidate:-</Card.ViewLabel>
                                <Card.Question id="detailsReqQuestion">{detailsReqQuestion}</Card.Question>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Textarea type="text" id="ansToDetailsReq" placeholder=" " autoComplete="off" value={ansToDetailsReq} onChange={({target}) => setAnsToDetailsReq(target.value)} />
                            <Card.Label htmlFor="ansToDetailsReq">Answer to details required</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                </>
            }
            <Card.Line />
            {assignmentQuestion &&
                <>
                    {(assignmentAttachQuestion !== "" || assignmentLinkQuestion !== "") &&
                        <>
                            <Card.InputColumn>
                                <Card.InputContainer noMarginTop marginBottom="0.5rem">
                                    {assignmentAttachQuestion !== "" &&
                                        <Card.InputContainerTop notAlone width="fit-content">
                                            <Card.ViewText id="assignmentAttachQuestion">Assignment Attachment</Card.ViewText>
                                            <Button small onClick={() => getFile(assignmentAttachQuestion)}><Button.Icon alone><BiDownload /></Button.Icon></Button>
                                        </Card.InputContainerTop>
                                    }
                                    {assignmentLinkQuestion !== "" &&
                                        <Card.InputContainerTop notAlone width="fit-content">
                                            <Card.ViewText id="assignmentLinkQuestion">Assignment Link</Card.ViewText>
                                            <Button small onClick={() => goToLink(assignmentLinkQuestion)}><Button.Icon alone><BiLinkExternal /></Button.Icon></Button>
                                        </Card.InputContainerTop>
                                    }
                                </Card.InputContainer>
                            </Card.InputColumn>
                        </>
                    }
                    <Card.InputColumn>
                        <Card.InputContainer marginBottom="0.5rem" noMarginTop>
                            <Card.ViewRow>
                                <Card.ViewLabel paddingBottom="0.5rem" id="assignmentQuestion">Assignment:-</Card.ViewLabel>
                                <Card.Question id="assignmentQuestion">{assignmentQuestion}</Card.Question>
                            </Card.ViewRow>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Textarea type="text" id="assignmentReply" placeholder=" " autoComplete="off" value={assignmentReply} onChange={({target}) => setAssignmentReply(target.value)} />
                            <Card.Label htmlFor="assignmentReply">Assignment Reply</Card.Label>
                        </Card.InputContainer>
                    </Card.InputColumn>
                    <Card.InputColumn>
                        <Card.InputContainer>
                            <Card.Input file={assignmentAttach?.name} type="file" accept=".pdf,.docx,.doc,.xlsx" id="assignmentAttach" placeholder=" " autoComplete="off" onChange={({ target }) => assignmentAttachHandler(target.files)} />
                            <Card.Label htmlFor="assignmentAttach">Assignment File</Card.Label>
                            <Card.Tooltip>
                                File size should be less than 1MB. File types can be .pdf, .docx, .xlsx
                            </Card.Tooltip>
                        </Card.InputContainer>
                        {assignmentAttach.map((doc) => {
                            return (
                            <Card.InputContainer key={doc.name}>
                                <Card.FilePreview>
                                    <Card.FileProp>Name: {doc.name}</Card.FileProp>
                                    <Card.FileProp>Size: {((doc.size)/1000000).toFixed(2)}MB</Card.FileProp>
                                    <Card.FileIcon onClick={() => removeAssignmentAttach(doc.name)}><AiFillDelete /></Card.FileIcon>
                                </Card.FilePreview>
                            </Card.InputContainer>
                            );
                        })}
                    </Card.InputColumn>
                </>
            }
            {/* {type === "create" && 
                <Card.InputColumn>
                    <Card.InputContainer>
                        <Card.Input type="text" id="comment" placeholder=" " autoComplete="off" value={comment} onChange={({target}) => setComment(target.value)} />
                        <Card.Label htmlFor="comment">Comment</Card.Label>
                    </Card.InputContainer>
                </Card.InputColumn>
            } */}
            <Card.ButtonGroup marginTop>
                <Button nofill onClick={() => resetInputFields()}>Reset</Button>
                <Button onClick={() => handleSubmitAssignment()}>{type === "create" ? "Submit & Apply" : "Update submission"}</Button>
            </Card.ButtonGroup>
        </Card>
    );
}