import React from "react";
import styled from "styled-components/macro";
import { Loading } from "../components";
import { SidebarContainer, MainContainer, AlertModalContainer } from "../containers";

const Container = styled.div`
    display: flex;
    min-height: 100vh;
`;

export default function Layout() {
    return (
        <Container>
            <SidebarContainer />
            <MainContainer />
            <AlertModalContainer />
            <Loading />
        </Container>
    );
}
