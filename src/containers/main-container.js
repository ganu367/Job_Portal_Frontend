import React, {useEffect} from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import {HeaderContainer,
        FooterContainer,
        DisplayContainer,
        AdminSignin,
        AdminSignup,
        AdminDashboard,
        AdminProfile,
        AdminUpdateProfile,
        HomePage,
        EmpSignup,
        EmpSignin,
        CandSignup,
        CandSignin,
        ChangePassword,
        EmpDashboard,
        CandDashboard,
        EmpProfile,
        CandProfile,
        EmpUpdateProfile,
        CandUpdateProfile,
        EmpCreateJob,
        EmpUpdateJob,
        EmpJob,
        CandJobs,
        // CandAppliedJobs,
        EmpJobCandidate,
        EmpJobApplications,
        CandJobApplications,
        EmpViewCandProfile,
        CandViewJob,
        EmpJobChat,
        CandJobChat,
        CandSubmitAssignment,
        EmpInterview,
        CandInterview,
        EmpUpdateInterview,
        EmpUpdateInterviewEval,
        EmpUpdateEval,
        VerifiedContainer} from "../containers";
import {PersistSignin,
        ProtectedRoutes,
        RedirectRoutes,
        ProtectedRoleRoutes,
        RedirectIncompleteProfile,
        RedirectUnverifiedUser,
        HomeRedirect} from "../helpers";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default function MainContainer({children}) {

    return (
        <Container>
            <HeaderContainer />
            <DisplayContainer>
                <Routes>
                    <Route path="/admin" element={<Outlet />}>
                        <Route element={<RedirectRoutes userType={"admin"} />}>
                            <Route path="signin" element={<AdminSignin />} />
                            <Route path="signup" element={<AdminSignup />} />
                        </Route>
                        <Route element={<PersistSignin />}>
                            <Route element={<ProtectedRoutes userType={"admin"} />}>
                                <Route element={<ProtectedRoleRoutes allowedUserType={"admin"} />}>
                                    <Route path="change-password" element={<ChangePassword userType="admin" />} />
                                    <Route path="dashboard" element={<AdminDashboard />} />
                                    <Route path="profile" element={<AdminProfile />} />
                                    <Route path="update-profile" element={<AdminUpdateProfile />} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/employer" element={<Outlet />}>
                        <Route element={<RedirectRoutes userType={"employer"} />}>
                            <Route path="signup" element={<EmpSignup />} />
                            <Route path="signin" element={<EmpSignin />} />
                        </Route>
                        <Route element={<PersistSignin />}>
                            <Route element={<ProtectedRoutes userType={"employer"} />}>
                                <Route element={<ProtectedRoleRoutes allowedUserType={"employer"} />}>
                                    <Route path="update-profile" element={<EmpUpdateProfile />} />
                                    <Route element={<RedirectIncompleteProfile />}>
                                        <Route path="change-password" element={<ChangePassword userType="employer" />} />
                                        <Route path="dashboard" element={<EmpDashboard />} />
                                        <Route path="profile" element={<EmpProfile />} />
                                        <Route path="post-job" element={<EmpCreateJob />} />
                                        <Route path="update-job/:id" element={<EmpUpdateJob />} />
                                        <Route path="job/:id" element={<EmpJob />} />
                                        <Route path="job/:id/applications" element={<EmpJobApplications statusType="applied" />} />
                                        <Route path="job/:id/applications/shortlisted" element={<EmpJobApplications statusType="shortlisted" />} />
                                        <Route path="job/:id/applications/hired" element={<EmpJobApplications statusType="hired" />} />
                                        <Route path="job/:id/applications/rejected" element={<EmpJobApplications statusType="rejected" />} />
                                        <Route path="job/:id/applications/withdrawn" element={<EmpJobApplications statusType="withdrawn" />} />
                                        <Route path="job/:id/candidates" element={<EmpJobCandidate />} />
                                        <Route path="job/:jobID/candidate/:candID" element={<EmpViewCandProfile />} />
                                        <Route path="job/:jobID/chat" element={<EmpJobChat />} />
                                        <Route path="job/:jobID/candidate/:candID/interview" element={<EmpInterview />} />
                                        <Route path="job/:jobID/candidate/:candID/interview/schedule" element={<EmpUpdateInterview actionType="create" />} />
                                        <Route path="job/:jobID/candidate/:candID/interview/:interviewID" element={<EmpUpdateInterview actionType="update" />} />
                                        <Route path="job/:jobID/candidate/:candID/interview/:interviewID/eval/new" element={<EmpUpdateInterviewEval actionType="create" />} />
                                        <Route path="job/:jobID/candidate/:candID/interview/:interviewID/eval" element={<EmpUpdateInterviewEval actionType="update" />} />
                                        <Route path="job/:jobID/candidate/:candID/evaluation" element={<EmpUpdateEval />} />
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/candidate" element={<Outlet />}>
                        <Route element={<RedirectRoutes userType={"candidate"} />}>
                            <Route path="signup" element={<CandSignup />} />
                            <Route path="signin" element={<CandSignin />} />
                        </Route>
                        <Route element={<PersistSignin />}>
                            <Route element={<ProtectedRoutes userType={"candidate"} />}>
                                <Route element={<ProtectedRoleRoutes allowedUserType={"candidate"} />}>
                                    <Route path="update-profile" element={<CandUpdateProfile />} />
                                    <Route element={<RedirectIncompleteProfile />}>
                                        <Route path="change-password" element={<ChangePassword userType="candidate" />} />
                                        <Route path="dashboard" element={<CandDashboard />} />
                                        <Route path="profile" element={<CandProfile />} />
                                        <Route path="jobs" element={<CandJobs />} />
                                        <Route path="jobs/applied" element={<CandJobApplications statusType="applied" />} />
                                        <Route path="jobs/withdrawn" element={<CandJobApplications statusType="withdrawn" />} />
                                        <Route path="job/:id" element={<CandViewJob />} />
                                        <Route path="job/:id/assignment" element={<CandSubmitAssignment />} />
                                        <Route path="jobs/chat" element={<CandJobChat />} />
                                        <Route path="interviews" element={<CandInterview />} />
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route element={<HomeRedirect />}>
                        <Route exact path="/" element={<HomePage />} />
                    </Route>
                    <Route path="/:userType/verified/:code" element={<VerifiedContainer />} />
                </Routes>
            </DisplayContainer>
            <FooterContainer />
        </Container>
    );
}