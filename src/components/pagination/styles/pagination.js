import styled from "styled-components/macro";

export const Container = styled.div( ({theme, width}) => `
    width: fit-content;
    // outline: 3px solid ${theme.backgroundColor1};
    background: ${theme.backgroundColor1};
    border-radius: 0.33rem;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1rem;
    overflow: clip;
`);

export const Item = styled.button( ({theme, endItem, active}) => `
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    background: ${active ? theme.primaryColor2 : "none"};
    color: ${active ? theme.white : theme.textColor2};
    border: none;
    border-right: 2px solid ${theme.backgroundColor3};
    // margin: ${endItem ? "0" : "0 0.15rem"};
    font-family: Montserrat;
    cursor: pointer;
    transition: 0.5s ease all;
    width: fit-content;

    &:hover
    {
        background: ${ active ? theme.primaryColor2 : theme.backgroundColor4};
        color: ${active ? theme.white : theme.textColor2};
        cursor: pointer;
    }

    &:last-of-type
    {
        border: none;
    }
`);

