import styled from "styled-components/macro";

export const Container = styled.button( ({small, big, nofill, danger, back, theme, forGrid, marginTop, iconPadding, noMargin}) => `
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    padding: ${iconPadding? "4px 6px" : forGrid ? "1px 3px" : small ? "6px 10px" : (big ? "15px 20px" : "8px 12px")};
    font-size: ${small ? "0.9rem" : (big ? "1.5rem" : "1rem")};
    background: ${nofill ? "none" : (danger ? "#dc3545" : (back ? theme.backgroundColor4 : theme.primaryColor2))};
    color: ${nofill ? (danger ? "#dc3545" : theme.primaryColor2) : "#fff"};
    border: 2px solid ${danger ? "#dc3545" : theme.primaryColor2};
    border-radius: 0.7rem;
    margin: ${noMargin ? "0" : "0 0.5rem 0"};
    font-family: Montserrat;
    cursor: pointer;
    transition: 0.2s ease all;
    margin-top: ${ marginTop ? "0.5rem" : "0" };
    width: fit-content;
    white-space: nowrap;

    &:hover:not([disabled])
    {
        transform: scale(0.95);
    }

    &:disabled
    {
        opacity: 0.75;
        cursor: initial;
    }

    @media (max-width: 950px)
    {
        margin-top: 0;
    }
`);

export const ExternalLink = styled.a( ({small, big, nofill, danger, theme, forGrid, marginTop}) => `
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    padding: ${forGrid ? "1px 3px" : small ? "6px 10px" : (big ? "15px 20px" : "8px 12px")};
    font-size: ${small ? "0.9rem" : (big ? "1.5rem" : "1rem")};
    background: ${nofill ? "none" : (danger ? "#dc3545" : theme.primaryColor2)};
    color: ${nofill ? (danger ? "#dc3545" : theme.primaryColor2) : "#fff"};
    border: 2px solid ${danger ? "#dc3545" : theme.primaryColor2};
    border-radius: 0.7rem;
    margin: 0 0.5rem 0;
    font-family: Montserrat;
    cursor: pointer;
    transition: 0.2s ease all;
    margin-top: ${ marginTop ? "0.5rem" : "0" };
    width: fit-content;

    &:hover:not([disabled])
    {
        transform: scale(0.95);
    }

    &:disabled
    {
        opacity: 0.75;
        cursor: initial;
    }

    @media (max-width: 950px)
    {
        margin-top: 0;
    }
`);

export const Icon = styled.div( ({theme, alone}) => `
    color: #fff;
    font-size: ${alone ? "1.33rem" : "1rem"};
    margin-right: ${alone ? "0rem" : "0.5rem"};
    display: flex;
`);