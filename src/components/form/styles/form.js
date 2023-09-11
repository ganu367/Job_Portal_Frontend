import styled from "styled-components/macro";
import { Link as ReactRouterLink } from "react-router-dom";

export const Container = styled.div( ({theme}) => `
    display: flex;
    flex-direction: column;
    min-height: 200px;
    background-color: ${theme.backgroundColor2};
    border-radius: 15px;
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    margin-top: 3rem;
    max-width: 500px;
    padding: 40px;
    position: relative;
`);

export const Dropdown = styled.div( ({theme, dropdown, width}) => `
    display: ${dropdown ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: 3.5rem;
    right: 0;
    width: ${ width ? width : "100%"};
    min-height: 7.5rem;
    cursor: initial;
`);

export const DropdownContainer = styled.div( ({theme, flexDirection}) => `
    background-color: ${theme.backgroundColor1};
    color: ${theme.textColor1};
    border-radius: 0.75rem;
    box-sizing: border-box;
    border: 2px solid ${theme.backgroundColor3};
    // box-shadow: 0px 0px 15px 0px ${ (theme.type === 'light') ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" };
    font-size: 1rem;
    width: 100%; //fit-content
    padding: 0.5rem;
    min-height: calc(100% - 0.5rem);
    white-space: nowrap;
    position: absolute;
    top: 0.5rem;
    right: 0;
    display: flex;
    flex-direction: ${flexDirection === "column" ? "column" : "row" };
    justify-content: flex-start;
    align-items: center;
    max-height: 250%;
    overflow: auto;
    z-index: 2;

    &::-webkit-scrollbar
    {
        position: absolute;
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

export const Option = styled.div( ({theme, selected}) => `
    border: none;
    width: 100%;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: Montserrat;
    display: flex;
    justify-content: flex-start; //center
    align-items: center;
    cursor: ${selected ? "cursor" : "pointer" };
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

export const Title = styled.div( ({theme}) => `
    font-size: 1.75rem;
    text-transform: uppercase;
    font-weight: 600;
    color: ${theme.primaryColor2};
    margin: 1rem auto 1.5rem;
    font-family: Syncopate;
`);

export const Line = styled.div( ({theme}) => `
    background: ${theme.backgroundColor3};
    height: 0.15rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
`);

export const Error = styled.div( ({theme, alert}) => `
    background: #dc3545;
    border-radius: 0.75rem;
    font-size: 1rem;
    margin: ${alert ? "0 0 1rem" : "0 0 1.75rem"};
    color: #fff;
    padding: 15px 20px;
`);

export const Alert = styled.div( ({theme}) => `
    background: ${theme.caution};
    border-radius: 0.75rem;
    font-size: 1rem;
    margin: 0 0 1.75rem;
    color: ${theme.black};
    padding: 15px 20px;
`);

export const Base = styled.form( ({theme}) => `
    display: flex;
    flex-direction: column;
    // max-width: 450px;
    width: 100%;
`);

export const Input = styled.input( ({theme, file}) => `
    border-radius: 10px;
    width: 100%;
    font-size: 1rem;
    background: ${theme.backgroundColor3};
    border: 0;
    color: ${theme.textColor1};
    line-height: 50px;
    padding: 5px 20px;
    box-sizing: border-box;
    font-family: Montserrat;

    &:focus
    {
        outline: none;
    }

    &::placeholder {
        position: absolute;
        right: 1.25rem;
        top: 30%;
        color: ${theme.textColor3}
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
        background: ${theme.backgroundColor4};
        border: 0;
        color: ${theme.textColor2};
        padding: 3px 7px;
        font-family: Montserrat;

        &:focus
        {
            outline: none;
        }
    }

    &[type=file]
    {
        color: ${file ? theme.textColor1 : "transparent"};
    }
`);

export const Label = styled.label( ({theme, small}) => `
    font-size: 1rem;
    font-family: Montserrat;
    color: ${theme.textColor3};
    cursor: text;
    position: absolute;
    top: 30%;
    left: ${ small ? "15%" : "5.5%"};
    transition: 0.2s ease all;
    background: none;

    ${Input}:focus,
    ${Input}:not(:placeholder-shown) + &
    {
        background: ${theme.primaryColor2};
        padding: 0.2rem 0.5rem 0.2rem;
        border-radius: 0.5rem;
        top: -15%;
        left: ${ small ? "15%" : "3%"};
        font-size: 0.9rem;
        color: #fff;
    }
`);

export const Submit = styled.button( ({theme}) => `
    background: ${theme.primaryColor2};
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem 0 0;
    padding: 16px;
    border: 0;
    color: #fff;
    cursor: pointer;
    font-family: Montserrat;

    &:disabled
    {
        opacity: 0.75;
        cursor: initial;
    }
`);

export const Text = styled.div( ({theme}) => `
    color: ${theme.textColor1};;
    margin: 0.8rem auto 0;
    font-size: 0.9rem;
    font-family: Montserrat;
`);

export const Icon = styled.div( ({theme, search}) => `
    color: ${theme.textColor3};
    position: absolute;
    right: 5%;
    bottom: ${ search ? "20%" : "25%"};
    font-size: 1.5rem;
    cursor: pointer;

    &:hover
    {
        color: ${theme.textColor2};
    }
`);

export const InputContainer = styled.div( ({theme, width, notAlone, height, notLast, flexDirection}) => `
    position: relative;
    height: 4rem;
    margin-bottom: 1rem;
    margin-left: ${notAlone ? "1rem" : "0" };
    width: ${ width ? width : "100%"};
    height: ${ height ? height : "100%"};
    flex-direction: ${flexDirection ? flexDirection : ""};

    &:last-of-type
    {
        margin-bottom: ${notAlone ? "0" : notLast ? "1rem" : "1.5rem;" };
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

export const InputColumn = styled.div( ({theme, width}) => `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: ${width ? width : ""};
`);

export const Link = styled(ReactRouterLink)( ({theme}) => `
    color: ${theme.primaryColor2};
    text-decoration: none;
    transition: 0.3s ease all;
    font-weight: bold;

    &:hover
    {
        text-decoration: underline;
    }
`);

export const Toggle = styled.button( ({theme, marginRight}) => `
    // position: absolute;
    // top: -3rem;
    // right: 0;
    background: ${theme.primaryColor2};
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 0.8rem;
    border: 0;
    color: #fff;
    cursor: pointer;
    font-family: Montserrat;
    transition: all 0.3s ease;
    margin-right: ${marginRight ? "0.75rem" : ""};

    &:disabled
    {
        opacity: 0.75;
    }

    &:hover
    {
        transform: scale(0.9);
    }
`);

export const ToggleGroup = styled.div( ({theme}) => `
    position: absolute;
    top: -3rem;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`);

export const ImagePreview = styled.img( ({theme, alone}) => `
    height: 15rem;
    width: 15rem;
    object-fit: cover;
    border-radius: 1rem;
    border: 2px solid ${theme.backgroundColor3};
    padding: 0.5rem;
    margin-top: ${alone ? "" : "-0.5rem" };
`);

export const ImageRemoveIcon = styled.div( ({theme, alone}) => `
    border-radius: 5rem;
    background: ${theme.backgroundColor1};
    border: 2px solid ${theme.backgroundColor3};
    padding: 0.5rem;
    display: flex;
    font-size: 1.25rem;
    justify-content: center;
    align-items: center;
    color: ${theme.textColor2};
    transition: 0.3s ease all;
    position: absolute;
    top: -0.85rem;
    right: -1rem;

    &:hover
    {
        cursor: pointer;
        background: ${theme.backgroundColor3};
        transform: scale(0.9);
    }
`);

export const InputRow = styled.div( ({theme, width}) => `
    width: ${width ? width : "100%"};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`);

export const Tooltip = styled.div( ({theme}) => `
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: ${theme.textColor3};
    padding-left: 0.5rem;
    cursor: pointer;

    &:hover ${TooltipText}
    {
        display: flex;
        flex-direction: column;
    }
`);

export const TooltipText = styled.div( ({theme}) => `
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0.5px;
    background: ${theme.black};
    opacity: 0.75;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    max-width: 15rem;
    text-align: justify;
    color: ${theme.textColor1};
    padding-left: 0.5rem;
    cursor: pointer;
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
`);