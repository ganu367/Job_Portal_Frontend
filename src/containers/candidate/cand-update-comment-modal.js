import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "../../components";
import { useAlert, useAxiosPrivate } from "../../hooks";

export default function CandUpdateCommentModal({children, viewComment, setViewComment, setCommentUpdated, setViewCommentModal}) {
    const axiosPrivate = useAxiosPrivate();
    const {setAlert} = useAlert();
    const params = useParams();

    const handleUpdateComment = () => {
        axiosPrivate
        .put(`/api/candidate/job/update-comment/${viewComment?.jobID}`, {comment: viewComment?.comment},
        {headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }})
        .then(function (response) {
            // console.log(response?.data);
            setAlert({msg: `Success: ${response?.data}`, type: "success"});
            setViewComment({comment: "", jobID: ""});
            setViewCommentModal(false);
            setCommentUpdated(true);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    return (
        <>
            <Modal>
                <Modal.Container>
                    <Modal.Title>Comment</Modal.Title>
                    <Modal.Line />
                    {/* <Modal.Text>{children}</Modal.Text> */}
                    <Modal.InputContainer>
                        <Modal.Textarea type="text" id="viewComment" placeholder=" " autoComplete="off" value={viewComment?.comment} onChange={({target}) => setViewComment({comment: target.value, jobID: viewComment?.jobID})} />
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setViewComment({comment: "", jobID: ""});
                            setViewCommentModal(false);
                        }}>Close</Button>
                        <Button onClick={() => handleUpdateComment()}>Update</Button>
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
            {/*
            <Modal>
                <Modal.Container>
                    <Modal.Title>Comment</Modal.Title>
                    <Modal.Line />
                    {/* <Modal.Text>{children}</Modal.Text> *}
                    <Modal.InputContainer>
                        <Modal.ViewText>{viewComment}</Modal.ViewText>
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setViewComment("");
                            setViewCommentModal(false);
                        }}>Close</Button>
                        {/* <Button danger={action === "Reject"} >{action}</Button> *}
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
            */}
        </>
    );
}