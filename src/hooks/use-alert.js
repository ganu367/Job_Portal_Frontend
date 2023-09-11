import { useContext } from "react";
import { AlertContext } from "../context/alert-context";

export default function useAlert() {
    return useContext(AlertContext);
}