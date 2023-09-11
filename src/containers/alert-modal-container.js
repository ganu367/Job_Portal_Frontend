import React from "react";
import { AlertModal } from "../components";
import { useAlert } from "../hooks";

export default function AlertModalContainer({children}) {
    const {alert, setAlert} = useAlert();

    return (
        <>
            {(alert.msg) ? 
                <AlertModal alert={alert}>
                    <AlertModal.Text alert={alert}>
                        {alert.msg}
                        <AlertModal.Icon onClick={ () => {setAlert({msg: "",type: ""})}} />
                    </AlertModal.Text>
                </AlertModal>
            : null}
        </>
    );
}