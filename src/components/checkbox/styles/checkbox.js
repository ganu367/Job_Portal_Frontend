import styled from "styled-components/macro";
import { GoCheck } from "react-icons/go";

export const Container = styled.div( ({theme, noMargin, hide}) => `
    width: 1.33rem;
    height: 1.33rem;
    visibility: ${hide ? "hidden" : "visible"};
    background: ${theme.backgroundColor1};
    border: 2px solid ${theme.backgroundColor4};
    border-radius: 0.25rem;
    margin-right: 0.75rem;
    margin-top: ${noMargin ? "" : "0.5rem"};

    &:hover
    {
        filter: ${theme.type === "light" ? "brightness(90%)" : "brightness(120%)"};
        cursor: pointer;
    }
`);

export const Check = styled(GoCheck)( ({theme, checked}) => `
    display: ${checked ? "flex" : "none"};
    color: ${theme.textColor2};
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    &:hover
    {
        cursor: pointer;
    }
`);