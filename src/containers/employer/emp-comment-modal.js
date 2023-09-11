import React, { useState } from "react";
import { Modal, Button } from "../../components";

export default function EmpCommentModal({children, action, handleAction, setCommentModal,comment,setComment,setAction}) {

    const handleSubmit = () => {
        handleAction();
        setCommentModal(false);
    }

    return (
        <>
            <Modal>
                <Modal.Container>
                    <Modal.Title>Add a comment</Modal.Title>
                    <Modal.Line />
                    {/* <Modal.Text>{children}</Modal.Text> */}
                    <Modal.InputContainer>
                        <Modal.Textarea type="text" id="comment" placeholder=" " autoComplete="off" value={comment} onChange={({target}) => setComment(target.value)} />
                    </Modal.InputContainer>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => {
                            setAction("");
                            setCommentModal(false);
                        }}>Cancel</Button>
                        <Button danger={action === "Reject"} onClick={() => handleSubmit()}>{action}</Button>
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
        </>
    );
}