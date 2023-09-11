import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

export default function ProtectedRoutes({userType}) {
    const location = useLocation();
    const {auth} = useAuth();

    return (
        (auth?.accessToken) ? <Outlet /> : <Navigate to={`/${userType}/signin`} state={{ from: location }} replace />
    );
}

export function RedirectRoutes({userType}) {
    const location = useLocation();
    const {auth} = useAuth();

    // console.log("redirectroutes location: ", location?.state?.from?.pathname)
    const dontRevisit = ["/admin/signin","/employer/signin","/candidate/signin","/admin/signup","/employer/signup","/candidate/signup"];

    return (
        !(auth?.accessToken) ? <Outlet /> : !dontRevisit.includes(location?.state?.from?.pathname) ? <Navigate to={location?.state?.from?.pathname} state={{ from: location }} replace /> : <Navigate to={`/${userType}/dashboard`} state={{ from: location }} replace />
    );
}

export function HomeRedirect() {
    const location = useLocation();
    const {JWT,auth} = useAuth();

    return (
        !(auth?.accessToken) ? <Outlet /> : <Navigate to={`/${JWT?.user?.userType}/dashboard`} state={{ from: location }} replace />
    );
}

export function RedirectIncompleteProfile() {
    const location = useLocation();
    const {JWT} = useAuth();
    const userType = JWT?.user?.userType;

    return (
        (JWT?.user?.isProfileCompleted) ? <Outlet /> : <Navigate to={`/${userType}/update-profile`} state={{ from: location }} replace />
    );
}

export function RedirectUnverifiedUser() {
    const location = useLocation();
    const {JWT} = useAuth();
    const userType = JWT?.user?.userType;

    return (
        (JWT?.user?.isActive) ? <Outlet /> : <Navigate to={`/${userType}/verified`} state={{ from: location }} replace />
    );
}

export function ProtectedRoleRoutes({allowedUserType}) {
    const location = useLocation();
    const {JWT} = useAuth();
    const userType = JWT?.user?.userType;
    // console.log(allowedUserType)
    // console.log((allowedUserType === userType))

    return (
        ((allowedUserType === userType)) ? 
            <Outlet />
            : 
            <Navigate to={`/${userType}/dashboard`} state={{ from: location }} replace />
    );
}