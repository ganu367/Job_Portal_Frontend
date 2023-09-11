import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle( ({theme}) => `
    *,
    *::before,
    *::after
    {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body
    {
        background-color: ${theme.backgroundColor1};
        color: ${theme.textColor1};
        font-size: 1rem;
        font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition: 0.3s ease all;

        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button
        { 
            -webkit-appearance: none; 
            margin: 0;
        }

        &::-webkit-scrollbar
        {
            position: absolute;
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
    }
`);