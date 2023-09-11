import styled from "styled-components/macro";

export const Overlay = styled.div( ({theme}) => `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.86); //rgba(0, 159, 255, 0.66);
    display: grid;
    place-items: center;
    z-index: 5;
`);
