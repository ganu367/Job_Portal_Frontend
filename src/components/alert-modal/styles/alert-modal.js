import styled from "styled-components/macro";

export const Overlay = styled.div( ({theme}) => `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    pointer-events: none;
    // display: grid;
    // place-items: center;
    // transition: var(--transition);
    z-index: 6;
`);

export const Container = styled.div( ({alert}) => `
    position: relative;
    // min-width: 700px;
    // max-width: 1000px;
    transition: all 1s ease;
    opacity: ${alert ? 0.9 : 0};
    visibility: ${alert ? "visible" : "hidden"};
    z-index: 5;
`);

export const Text = styled.div( ({alert}) => `
    position: absolute;
    top: 4rem;
    width: fit-content;
    pointer-events: initial;
    left: 0;
    right: 0;
    margin: auto;
    background-color: ${alert.type === "error" ? "#dc3545" : "#00b05d"}; 
    color: #fff;
    font-weight: 600;
    font-size: 1.2rem;
    font-family: Montserrat;
    border-radius: 0.8rem;
    padding: 0.8rem;
    display: flex;
`);

export const Icon = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;