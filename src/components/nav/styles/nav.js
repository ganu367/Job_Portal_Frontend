import styled from "styled-components/macro";
import { Link as ReactRouterLink } from "react-router-dom";

export const Container = styled.div( ({sidebarToggle, theme}) => `
    transition: 0.3s ease all;
    overflow-x: hidden;
    width: ${sidebarToggle ? "25vw" : "0%" };
    min-height: 100%;
    background: ${theme.backgroundColor2};

    @media(max-width: 850px) {
        position: fixed;
        top: 0;
        left: ${sidebarToggle ? "0" : "-100%"};
        width: 100%;
        z-index: 99;
    }
`);

export const SubContainer = styled.div( ({theme}) => `
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`);

export const Header = styled.div( ({theme}) => `
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`);

export const Logo = styled.img( ({theme}) => `
    // height: 5rem;
    max-width: 66%;
    max-height: 5rem;
    object-fit: contain;
    border-radius: 0.25rem;
    margin-bottom: 0.75rem;
`);

export const Title = styled.div( ({theme}) => `
    font-size: 0.8rem;
    text-align: center;
`);

export const Button = styled.div( ({theme}) => `
    border: 2px solid ${theme.backgroundColor2};
    background: none;
    padding: 0.25rem;
    border-radius: 50%;
    margin-right: 1rem;
    transition: 0.3s ease all;
    cursor: pointer;

    &:hover
    {
        transform: scale(0.9);
    }
`);

export const Icon = styled.div( ({theme}) => `
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-width: 850px) {
        margin-left: 0.5rem;
    }
`);

export const Line = styled.div( ({theme}) => `
    background: ${theme.backgroundColor3};
    height: 0.15rem;
    width: 100%;
    border-radius: 0.5rem;
    margin: 1.2rem 0;
`);

export const Link = styled.div( ({theme}) => `
    margin-top: 0.1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`);

export const LinkText = styled(ReactRouterLink)( ({theme}) => `
    color: ${theme.textColor1};
    font-size: 1.2rem;
    text-decoration: none;
    cursor: pointer;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.75rem;
    transition: 0.3s ease all;
    position: relative;
    display: flex;
    justify-content: space-between;
    &:hover
    {
        background: ${theme.backgroundColor3};
    }

    @media(max-width: 850px) {
        justify-content: center;
        align-items: center;
    }
`);

export const LinkContainer = styled.div( ({theme}) => `
    background: ${theme.backgroundColor2};
    width: 100%;
    display: flex;
    flex-direction: column;
`);

export const Dropdown = styled.div( ({theme, dropdown}) => `
    margin-top: 0.1rem;
    display: ${dropdown ? "flex" : "none"};
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 1rem;
    width: 100%;

    @media(max-width: 850px) {
        justify-content: center;
        align-items: center;
    }
`);

export const DropdownItem = styled(ReactRouterLink)( ({theme}) => `
    border-radius: 0.5rem;
    width: 90%;
    cursor: pointer;
    padding: 0.75rem;
    color: ${theme.textColor1};
    text-decoration: none;
    transition: 0.3s ease all;
    display: flex;

    &:hover
    {
        background: ${theme.backgroundColor3};
    }

    @media(max-width: 850px) {
        justify-content: center;
        align-items: center;
    }
`);

export const Close = styled.div( ({theme, sidebarToggle}) => `
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    display: none;

    @media(max-width: 850px) {
        display: ${sidebarToggle ? "block" : "none"};
    }
`);