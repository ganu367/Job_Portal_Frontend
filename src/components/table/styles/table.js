import styled from "styled-components/macro";

export const Container = styled.div( ({theme}) => `
    width: 100%;
    // border: 3px solid ${theme.backgroundColor3};
    outline: 3px solid ${theme.backgroundColor3};
    border-radius: 0.5rem;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    height: 30rem;
    background: ${theme.backgroundColor1};

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

export const Column = styled.div( ({theme, width, flex}) => `
    flex: ${flex ? flex : "1"};
    // width: ${width ? width : "100%"};
    padding: 0.25rem;
`);

export const Row = styled.div( ({theme, header, last, justifyStart}) => `
    display: flex;
    flex-direction: row;
    justify-content: ${justifyStart ? "flex-start" : "center"};
    align-items: center;
    // align-items: flex-start;
    width: 100%;
    // border: ${header ? "" : "2px solid black" };
    background: ${ header ? theme.backgroundColor3 : theme.backgroundColor1 };
    border-radius: ${ header ? "0.5rem 0.5rem 0 0" : "0" };
    font-weight:  ${ header ? "bold" : "normal" };
    border-bottom: ${ last ? "0" : `2px solid ${theme.backgroundColor3}`};

    &:last-of-type
    {
        border-radius: ${ header ? "0.5rem 0.5rem 0 0" : "0 0 0.5rem 0.5rem" };
    }
`);
export const SpecialRow = styled.div( ({theme, header}) => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: ${ header ? theme.backgroundColor3 : theme.backgroundColor1 };
    font-weight:  ${ header ? "bold" : "normal" };
`);

export const Header = styled.div( ({theme, last}) => `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border-right: ${last ? "0" : `2px solid ${theme.backgroundColor4}`};
    font-size: 1rem;
    text-align: center;
`);

export const Data = styled.div( ({theme, center, fontBold}) => `
    display: flex;
    justify-content: ${center ? "center" : "flex-start"};
    align-items: center;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: ${fontBold ? "bold" : "normal"};
`);

export const JobStatusBox = styled.div( ({theme, status, marginLeft, small}) => `
    // background: ${status === "Open" ? theme.primaryColor2 : status === "Closed" ? theme.backgroundColor3 : theme.backgroundColor2};
    border: 2px solid ${status === "Open" ? `${theme.info}a8` : status === "Closed" ? `${theme.danger}a8` : `${theme.info}a8`};
    background-color: ${status === "Open" ? `${theme.info}33` : status === "Closed" ? `${theme.danger}33` : `${theme.info}33`};
    padding: ${small ? "0.2rem 0.33rem" : "0.25rem 0.5rem"};
    border-radius: 1rem;
    font-size: ${small ? "0.75rem" : "0.9rem"};
    // color: ${status === "Open" ? theme.white : theme.textColor1};
    color: ${theme.textColor1};
    font-weight: normal;
    margin-left: ${marginLeft ? "0.5rem" : ""};
`);

export const AppStatusBox = styled.div( ({theme, status}) => `
    border: 2px solid ${status === "withdrawn" ? `${theme.caution}a8` : status === "shortlisted" ? `${theme.caution}a8` : status === "hired" ? `${theme.success}a8` : status === "rejected" ? `${theme.danger}a8` : `${theme.info}a8`};
    background-color: ${status === "withdrawn" ? `${theme.caution}33` : status === "shortlisted" ? `${theme.caution}33` : status === "hired" ? `${theme.success}33` : status === "rejected" ? `${theme.danger}33` : `${theme.info}33`};
    padding: 0.25rem 0.5rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    color: ${theme.textColor1};
    font-weight: normal;

    // display: flex;
    // flex-direction: row;
    // justify-content: flex-start;
    // align-items: center;
`);

export const Box = styled.div( ({theme, status, color}) => `
    // background: ${status === "Open" ? theme.primaryColor2 : status === "Closed" ? theme.backgroundColor3 : theme.backgroundColor2};
    padding: 0.5rem;
    // border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    // color: ${status === "Open" ? theme.white : theme.textColor1};
    color: ${color === "success" ? theme.success : color === "danger" ? theme.danger : color === "caution" ? theme.caution : color === "info" ? theme.info : theme.textColor1};
    font-weight: ${ theme.type === "light" ? "bold" : "normal"};
`);