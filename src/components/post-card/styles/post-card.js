import styled from "styled-components/macro";

export const Container = styled.div( ({theme, width}) => `
    box-sizing: border-box;
    width: ${width ? width : "100%"};
    min-height: 100%;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`);

// export const Title = styled.div( ({theme, colored}) => `
//     color: ${ colored ? theme.primaryColor2 : theme.textColor1};
//     font-size: 1.5rem;
//     font-weight: bold;
//     display: flex;
//     width: 100%;
//     justify-content: space-between;

//     // @media (max-width: 950px)
//     // {
//     //     justify-content: center;
//     // }
// `);

export const Line = styled.div( ({theme, noMarginTop}) => `
    background: ${theme.backgroundColor4};
    height: 0.15rem;
    width: 100%;
    border-radius: 0.5rem;
    margin: ${noMarginTop ? "0 0 1rem" : "1rem 0"};
`);

export const ButtonGroup = styled.div( ({theme,flexStart,flexEnd,marginTop,marginLeft,marginBottom}) => `
    width: 100%;
    margin-top: ${ marginTop ? "0.5rem" : "0" };
    margin-left: ${ marginLeft ? "1rem" : "0" };
    margin-bottom: ${ marginBottom ? "1.2rem" : "0" };
    display: flex;
    flex-direction: row;
    justify-content: ${flexStart ? "flex-start" : (flexEnd ? "flex-end" : "center")};
    align-items: center;
`);

export const Window = styled.div( ({theme}) => `
    padding: 1rem;
    width: 100%;
    height: 40rem;     //30rem;
    // border: 3px solid ${theme.backgroundColor3};
    outline: 3px solid ${theme.backgroundColor1};
    background: ${theme.backgroundColor1};
    border-radius: 0.25rem;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;

    &::-webkit-scrollbar
    {
        background: ${theme.backgroundColor1};
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor4};
        border-radius: 0.5rem;
        width: 0.5rem;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);

export const Post = styled.div( ({theme}) => `
    padding: 0.75rem;
    width: 100%;
    outline: 3px solid ${theme.backgroundColor2};
    background: ${theme.backgroundColor2};
    border-radius: 0.25rem;
    min-height: fit-content;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    // overflow: auto;
    margin-bottom: 1rem;

    &::-webkit-scrollbar
    {
        background: ${theme.backgroundColor1};
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor4};
        border-radius: 0.5rem;
        width: 0.5rem;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);

export const Row = styled.div( ({theme, width, center, flexEnd, noMargin}) => `
    display: flex;
    flex-direction: row;
    justify-content: ${flexEnd ? "flex-end" : "flex-start"};
    align-items: ${center ? "center" : "flex-start"};
    margin-bottom: ${noMargin ? "0" : "0.75rem"};
    width: ${width ? width : "100%"};
`);

export const Column = styled.div( ({theme, fullHeight, width, center, marginRight}) => `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${center ? "center" : "flex-start"};
    min-height: ${fullHeight ? "100%" : "auto"};
    width: ${width ? width : "100%"};
    margin-right: ${marginRight ? "0.6rem" : "0"};
`);

export const Group = styled.div( ({theme, alignStart}) => `
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: ${alignStart ? "flex-start" : "center"};
`);

export const Title = styled.div( ({theme, alone}) => `
    font-size: 1.2rem;
    margin-top: ${alone ? "0.5rem" : ""};
`);

export const Subtitle = styled.div( ({theme}) => `
    font-size: 0.86rem;
`);

export const SmallText = styled.div( ({theme}) => `
    font-size: 0.75rem;
`);

export const Text = styled.div( ({theme, width}) => `
    color: ${theme.textColor1};
    border-radius: 0.5rem;
    font-size: 0.8rem;
    background: ${theme.backgroundColor1};
    color: ${theme.textColor1};
    padding: 0.5rem;
    box-sizing: border-box;
    font-family: Montserrat;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: justify;
    width: ${ width ? width : "fit-content" };
`);

export const Label = styled.div( ({theme, paddingBottom, paddingRight, paddingTop}) => `
    font-size: 0.75rem;
    font-weight: bold;
    color: ${theme.textColor1};
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${paddingBottom ? "0.25rem" : "0" };
    padding-right: ${paddingRight ? "0.25rem" : "0" };
    padding-top: ${paddingTop ? "0.5rem" : "0" };
    white-space: nowrap;
`);

export const BigLabel = styled.div( ({theme, paddingBottom, paddingRight}) => `
    font-size: 1rem;
    font-weight: bold;
    color: ${theme.textColor1};
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`);

export const Dash = styled.div( ({theme}) => `
    color: ${theme.textColor1};
    font-size: 0.9rem;
    color: ${theme.textColor1};
    padding: 0.5rem;
    box-sizing: border-box;
    font-family: Montserrat;
    display: flex;
    justify-content: center;

    &:first-of-type
    {
        padding-left: 0;
    }
`);

export const Status = styled.div( ({theme, status}) => `
    padding: 0.33rem;
    font-size: 0.9rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid ${status === "withdrawn" ? `${theme.caution}a8` : status === "shortlisted" ? `${theme.caution}a8` : status === "hired" ? `${theme.success}a8` : status === "rejected" ? `${theme.danger}a8` : `${theme.info}a8`};
    background-color: ${status === "withdrawn" ? `${theme.caution}33` : status === "shortlisted" ? `${theme.caution}33` : status === "hired" ? `${theme.success}33` : status === "rejected" ? `${theme.danger}33` : `${theme.info}33`};
    border-radius: 0.5rem;
    color: ${theme.textColor1};
`);

export const SpecialRow = styled.div( ({theme}) => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`);