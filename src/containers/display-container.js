import React from "react";
import styled from "styled-components/macro";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
`;

export default function DisplayContainer({children}) {
    return (
        <Container>
            {children}
        </Container>
    );
}