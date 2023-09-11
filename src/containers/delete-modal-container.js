import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "../components";

export default function DeleteModalContainer({children, setDeleteModal, deleteFunction, destination}) {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteFunction();
        setDeleteModal(false);
        if (destination) {
            navigate(destination);
        }
    }

    return (
        <>
            <Modal>
                <Modal.Container>
                    <Modal.Title>Caution</Modal.Title>
                    <Modal.Line />
                    <Modal.Text>{children}</Modal.Text>
                    <Modal.ButtonContainer>
                        <Button nofill onClick={() => setDeleteModal(false)}>Cancel</Button>
                        <Button danger onClick={() => handleDelete()}>Confirm</Button>
                    </Modal.ButtonContainer>
                </Modal.Container>
            </Modal>
        </>
    );
}