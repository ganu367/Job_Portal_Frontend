import styled from "styled-components/macro";
import { Link as ReactRouterLink } from "react-router-dom";

export const Box = styled.div( ({theme, dropdown, width, empty}) => `
    display: ${empty ? "none" : dropdown ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: 3.5rem;
    right: 0;
    width: ${ width ? width : "100%"};
    min-height: 7.5rem;
    cursor: initial;
`);

export const DropdownContainer = styled.div( ({theme, flexDirection, right, top}) => `
    background-color: ${theme.backgroundColor1};
    color: ${theme.textColor1};
    border-radius: 0.75rem;
    box-sizing: border-box;
    border: 2px solid ${theme.backgroundColor4};
    // box-shadow: 0px 0px 15px 0px ${ (theme.type === 'light') ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" };
    font-size: 1rem;
    width: fit-content; //
    padding: 0.5rem;
    min-height: calc(100% - 0.5rem);
    white-space: nowrap;
    position: absolute;
    top: ${top ? top : "0.5rem"};
    right: ${right ? right : "0"};
    display: flex;
    flex-direction: ${flexDirection === "column" ? "column" : "row" };
    justify-content: flex-start;
    align-items: center;
    max-height: 250%;
    overflow: auto;
    z-index: 15;

    &::-webkit-scrollbar
    {
        position: absolute;
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor3}; 
        border-radius: 0.5rem;
        width: 50%;
        padding: 0.1rem;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);

export const Option = styled.div( ({theme, selected, justifyStart, noPointer}) => `
    border: none;
    width: 100%;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: Montserrat;
    display: flex;
    justify-content: ${ justifyStart ? "flex-start" : "flex-start"}; //center
    align-items: center;
    cursor: ${selected || noPointer ? "cursor" : "pointer" };
    pointer-events: ${selected ? "none" : "auto" };
    padding: 1rem;
    border: ${selected ? `2px solid ${theme.backgroundColor3}` : "none" };
    color: ${selected ? theme.textColor3 : "inherit" };

    &:hover
    {
        background: ${selected ? "initial" : theme.backgroundColor2};
    }
`);

export const Search = styled.input( ({theme}) => `
    border: none;
    width: 100%;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: Montserrat;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    padding: 1rem;
    background: ${theme.backgroundColor2};
    color: ${theme.textColor1};
    border: 3px solid ${theme.backgroundColor3};
`);

export const Icon = styled.div( ({theme}) => `
    color: ${theme.textColor3};
    position: absolute;
    right: 5%;
    bottom: 20%;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover
    {
        color: ${theme.textColor2};
    }
`);

export const SearchContainer = styled.div( ({theme, width, notAlone}) => `
    position: relative;
    height: 4rem;
    margin-bottom: 1rem;
    margin-left: ${notAlone ? "1rem" : "0" };
    width: ${ width ? width : "100%"};

    &:last-of-type
    {
        margin-bottom: ${notAlone ? "0" : "1.5rem;" };
    }
`);
