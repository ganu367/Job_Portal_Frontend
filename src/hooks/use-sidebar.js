import { useContext } from "react";
import { SidebarContext } from "../context/sidebar-context";

export default function useSidebar() {
    return useContext(SidebarContext);
}