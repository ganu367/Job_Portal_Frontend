import { useAuth } from "../hooks";

export default function RoleView({children, allowedRoles, adminOnly}) {
    const {JWT} = useAuth();
    // console.log("allowedRoles: ",allowedRoles);
    // console.log("user role: ",JWT?.user?.role);
    // console.log("Allowed: ",(allowedRoles?.includes(JWT?.user?.role)));

    return (
        ((adminOnly) && (JWT?.user?.isAdmin)) ?
            children
            :
            ((allowedRoles?.includes(JWT?.user?.role)) && !(JWT?.user?.isAdmin)) ? 
                children 
                : 
                null
    );
}

export function ProtectedComponent({children}) {
    const {JWT} = useAuth();

    return (
        (JWT?.user) ? children : null
    );
}