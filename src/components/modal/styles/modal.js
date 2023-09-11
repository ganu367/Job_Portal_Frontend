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

export const Container = styled.div( ({theme, width}) => `
    display: flex;
    flex-direction: column;
    min-height: 200px;
    background-color: ${theme.backgroundColor1};
    border-radius: 15px;
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    margin-top: 100px;
    max-width: ${width ? width : "450px"};
    padding: 30px;
    margin-bottom: 100px;
    position: relative;
    justify-content: center;
    align-items: center;
`);

export const Title = styled.div( ({theme}) => `
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.primaryColor2};
    margin: 0 auto 1rem;
    font-family: Montserrat;
`);

export const Line = styled.div( ({theme}) => `
    background: ${theme.backgroundColor3};
    height: 0.15rem;
    border-radius: 0.5rem;
    width: 100%;
`);

export const Text = styled.div( ({theme}) => `
    color: ${theme.textColor1};
    margin: 1rem auto 0.7rem;
    font-size: 1rem;
    font-family: Montserrat;
`);

export const ButtonContainer = styled.div( ({theme}) => `
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0.5rem;
    width: 100%;
`);

export const Form = styled.form( ({theme}) => `
    padding: 1rem 1rem 0;
`);

export const Input = styled.input( ({theme}) => `
    border-radius: 0.5rem;
    width: 100%;
    font-size: 1rem;
    background: none;
    border: 2px solid  ${theme.backgroundColor3};
    color: ${theme.textColor1};
    line-height: 2rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: Montserrat;

    &:focus
    {
        outline: none;
    }

    &[type=password]
    {
        font-size: 1.75rem;
    }

    &[type=file]::file-selector-button
    {
        border-radius: 5px;
        font-size: 0.9rem;
        cursor: pointer;
        background: ${theme.backgroundColor3};
        border: 0;
        color: ${theme.textColor2};
        padding: 3px 7px;
        font-family: Montserrat;

        &:focus
        {
            outline: none;
        }
    }

    ::-webkit-calendar-picker-indicator
    {
        cursor: pointer;
        font-size: 1.5rem;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    }
`);

export const Textarea = styled.textarea( ({theme, width}) => `
    border-radius: 0.5rem;
    resize: none;
    width: ${width ? width : "100%"};
    height: 10rem;
    font-size: 1rem;
    background: ${theme.backgroundColor2};
    border: 2px solid ${theme.backgroundColor3};
    color: ${theme.textColor1};
    line-height: 2rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: Montserrat;

    &:focus
    {
        outline: none;
    }
    &::-webkit-scrollbar
    {
        position: absolute;
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor3}; 
        border-radius: 0.5rem;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);

export const Label = styled.label( ({theme}) => `
    font-size: 1rem;
    font-family: Montserrat;
    color: ${theme.textColor2};
    cursor: text;
    position: absolute;
    top: 30%;
    left: 0.75rem;
    // border: 1px solid ${theme.borderColor};
    transition: 0.2s ease all;

    ${Input}:focus,
    ${Input}:active,
    ${Input}:not(:placeholder-shown) + &
    {
        background-color: ${theme.primaryColor2};
        padding: 0.2rem 0.5rem 0.2rem;
        border-radius: 0.5rem;
        // border: 2px solid ${theme.borderColor};
        top: -20%;
        left: 1%;
        font-size: 0.8rem;
        color: #fff;
    }
`);

export const InputContainer = styled.div( ({theme, width}) => `
    position: relative;
    width: ${width ? width : "100%"};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 1rem;
    &:last-of-type
    {
        margin-bottom: 1.5rem;
    }
`);

export const Error = styled.div( ({theme}) => `
    background: #dc3545; //#e87c03;
    border-radius: 0.75rem;
    font-size: 1rem;
    margin: 0.5rem 0 0.2rem;
    color: white;
    padding: 15px 20px;
`);

export const ViewText = styled.div( ({theme}) => `
    color: ${theme.textColor1};
    border-radius: 0.5rem;
    flex: 1;
    font-size: 1rem;
    background: ${theme.backgroundColor2};
    border: 2px solid ${theme.backgroundColor3};
    max-height: 10rem;
    overflow: auto;
    color: ${theme.textColor1};
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: Montserrat;
    width: 100%;
    display: flex;

    &::-webkit-scrollbar
    {
        position: absolute;
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb
    {
        background: ${theme.backgroundColor3}; 
        border-radius: 0.5rem;
    }
    &::-webkit-scrollbar-button
    {
        display: none;
    }
`);