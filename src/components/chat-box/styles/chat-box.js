import styled from "styled-components/macro";

export const Container = styled.div( ({theme, alone}) => `
    display: flex;
    flex-direction: row;
    justify-content: ${alone ? "center" : "space-between"};
    align-items: center;
    // padding: 0.5rem;
    margin: 1rem auto;
    width: ${ alone ? "30%" : "90%"};
    min-height: 80vh;
    height: 80vh;
    outline: 3px solid ${theme.backgroundColor2};
    overflow: clip;
    border-radius: 0.5rem;
    // box-shadow: 0px 0px 10px 0px ${ (theme.type === 'light') ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" };
`);

export const Section = styled.div( ({theme, width, height, noPaddingBottom, bordered}) => `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // border-radius: 0.5rem;
    padding: ${noPaddingBottom ? "1rem 0 0" : "1rem 0"};
    height: ${ height ? height : "100%" };
    width: ${ width ? width : "auto" };
    background: ${theme.backgroundColor2};

    &:first-of-type
    {
        border-right: ${ bordered ? "" : `2px solid ${theme.backgroundColor3}`};
    }
`);

export const Header = styled.div( ({theme}) => `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0 0.75rem 0.5rem;
    border-bottom: 2px solid ${theme.backgroundColor3};
`);

export const Title = styled.div( ({theme}) => `
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: capitalize;
`);

export const Subtitle = styled.div( ({theme}) => `
    font-size: 0.9rem;
    padding: 0.25rem 0;
    text-transform: capitalize;
`);

export const Window = styled.div( ({theme}) => `
    overflow: auto;
    padding: 1rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 1;
    background: ${theme.backgroundColor1};

    &::-webkit-scrollbar
    {
        position: absolute;
        width: 0.75rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor3}; 
        border-radius: 0.5rem;
        width: 50%;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);

export const Message = styled.div( ({theme, receive}) => `
    background: ${receive ? theme.backgroundColor2 : theme.primaryColor2};
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-top: 0.66rem;
    width: fit-content;
    color: ${receive ? theme.textColor1 : theme.white};
    max-width: 45%;
    align-self: ${receive ? "flex-start" : "flex-end" };
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
`);

export const Time = styled.div( ({theme}) => `
    font-size: 0.75rem;
    margin-top: 0.5rem;
    align-self: flex-end;
    text-transform: lowercase;
`);

export const InputBox = styled.form( ({theme, search}) => `
    padding: ${ search ? "0 0.75rem" : "1rem 0.5rem 0"};
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 2px solid ${theme.backgroundColor3};
    height: fit-content;
`);

export const Input = styled.input( ({theme}) => `
    padding: 0.5rem 1rem;
    width: 100%;
    border: none;
    line-height: 2rem;
    font-size: 1.1rem;
    font-weight: normal;
    outline: none;
    color: ${theme.textColor1};
    background: ${theme.backgroundColor3};
    border-radius: 0.5rem 0 0 0.5rem;
`);

export const Send = styled.button( ({theme, search}) => `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    background: ${theme.primaryColor2};
    color: ${theme.white};
    font-size: 1.75rem;
    height: 100%;
    width: 4vw;
    cursor: pointer;
    border-radius: 0 0.5rem 0.5rem 0;
    border: none;
    outline: none;
    transition: 0.3s ease all;

    &:hover:not(:disabled)
    {
        background: ${theme.primaryColor3};
    }
    &:disabled
    {
        cursor: initial;
        background: ${theme.primaryColor3};
    }
`);

export const ButtonGroup = styled.div( ({theme,flexStart,flexEnd,noMarginTop,marginLeft,marginBottom,alone}) => `
    width: fit-content;
    margin-top: ${noMarginTop ? "" : "1rem"};
    margin-left: ${ marginLeft ? "1rem" : "0" };
    margin-bottom: ${ marginBottom ? "1rem" : "0" };
    display: ${alone ? "none" : "flex"};
    flex-direction: row;
    justify-content: ${flexStart ? "flex-start" : (flexEnd ? "flex-end" : "center")};
    align-items: center;

    @media (max-width: 950px)
    {
        margin-top: 0.5rem;
    }
`);

export const SearchInput = styled.input( ({theme, width}) => `
    border-radius: 0.5rem;
    width: ${width ? width : "100%"};
    font-size: 1rem;
    background: ${theme.backgroundColor1};
    // border: 2px solid  ${theme.backgroundColor3};
    border: none;
    color: ${theme.textColor1};
    line-height: 2rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: Montserrat;
    outline: none;
    border-radius: 0.5rem 0 0 0.5rem;
    // border-radius: 0.5rem;
    cursor: pointer;
`);

export const SearchBox = styled.form( ({theme}) => `
    padding: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`);

export const SearchContainer = styled.div( ({theme}) => `
    width: 100%;
    position: relative;
`);

export const PeopleWindow = styled.div( ({theme}) => `
    overflow: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 2;
    background: ${theme.backgroundColor1};
    border-radius: 0 0 0 0.5rem;

    &::-webkit-scrollbar
    {
        position: absolute;
        width: 0.75rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor3}; 
        border-radius: 0.5rem;
        width: 50%;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);

export const Person = styled.div( ({theme}) => `
    padding: 1rem 0.75rem 0.75rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 2px solid ${theme.backgroundColor2};
    transition: 0.5s ease all;

    &:hover
    {
        background: ${theme.backgroundColor3};
        cursor: pointer;
    }

    // &:last-of-type
    // {
    //     border-bottom: 0;
    // }
`);

export const Name = styled.div( ({theme}) => `
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
`);

export const CompanyName = styled.div( ({theme}) => `
    font-size: 0.75rem;
    text-transform: capitalize;
    padding: 0 0 0.2rem;
`);

export const LastMsg = styled.div( ({theme}) => `
    font-size: 0.86rem;
    padding: 0.25rem 0 0.5rem;
`);

export const Date = styled.div( ({theme}) => `
    font-size: 0.75rem;
    padding: 0 0 0.5rem;
`);

export const ChatDate = styled.div( ({theme}) => `
    font-size: 0.75rem;
    padding: 0.75rem 0.5rem 0.25rem;
    align-self: center;
`);

// export const Status = styled.div( ({theme}) => `
//     padding: 0.25rem;
//     font-size: 0.66rem;
//     display: flex;
//     flex-direction: row;
//     justify-content: flex-start;
//     align-items: center;
//     border: 2px solid rgba(0, 159, 255, 0.5);
//     background-color: rgba(0, 159, 255, 0.2);
//     border-radius: 0.5rem;
//     color: ${theme.textColor1};
// `);

export const Status = styled.div( ({theme, status}) => `
    padding: 0.25rem;
    font-size: 0.66rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid ${status === "withdrawn" ? `${theme.caution}a8` : status === "shortlisted" ? `${theme.caution}a8` : status === "hired" ? `${theme.success}a8` : status === "rejected" ? `${theme.danger}a8` : `${theme.info}a8`};
    background-color: ${status === "withdrawn" ? `${theme.caution}33` : status === "shortlisted" ? `${theme.caution}33` : status === "hired" ? `${theme.success}33` : status === "rejected" ? `${theme.danger}33` : `${theme.info}33`};
    border-radius: 0.5rem;
    color: ${theme.textColor1};
`);

export const Row = styled.div( ({theme, width, center, flexEnd, noMargin, spaceBetween}) => `
    display: flex;
    flex-direction: row;
    justify-content: ${flexEnd ? "flex-end" : spaceBetween ? "space-between" : "flex-start"};
    align-items: ${center ? "center" : "flex-start"};
    margin-bottom: ${noMargin ? "0" : "0.75rem"};
    width: ${width ? width : "100%"};
`);

export const Column = styled.div( ({theme, fullHeight, width, alignEnd, justifyCenter}) => `
    display: flex;
    flex-direction: column;
    justify-content: ${justifyCenter ? "center" : "flex-start"};
    align-items: ${alignEnd ? "flex-end" : "flex-start"};
    min-height: ${fullHeight ? "100%" : "auto"};
    width: ${width ? width : "100%"};
`);

export const Icon = styled.div( ({theme}) => `
    color: ${theme.textColor3};
    position: absolute;
    right: 0.5rem;
    top: 25%;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover
    {
        color: ${theme.textColor2};
    }
`);

export const SpecialRow = styled.div( ({theme}) => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`);

