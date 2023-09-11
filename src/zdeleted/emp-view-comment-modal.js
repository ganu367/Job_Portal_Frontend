import React, { useState } from "react";
import { Modal, Button } from "../../components";

export default function EmpViewCommentModal({children, viewComment, setViewComment, setViewCommentModal}) {
    return (
        <>
            <Modal>
                <Modal.Container>
                    <Modal.Title>Comment</Modal.Title>
                    <Modal.Line />
                    {/* <Modal.Text>{children}</Modal.Text> */}
                    <Modal.InputContainer>
                        <Modal.Textarea type="text" id="viewComment" placeholder=" " autoComplete="off" value={viewComment} onChange={({target}) => setViewComment(target.value)} />
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setViewComment("");
                            setViewCommentModal(false);
                        }}>Close</Button>
                        <Button>Update</Button>
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