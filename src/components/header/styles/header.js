import styled from "styled-components/macro";

export const Container = styled.div( ({theme}) => `
    padding: 0.5rem;
    width: 100%;
    border-bottom: 3px solid ${theme.backgroundColor2};
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
`);

export const Dropdown = styled.div( ({theme}) => `
    display: none;
    position: absolute;
    top: 2.25rem;
    right: 0;
    width: 100%; //fit-content; //15rem;
    min-height: 5rem;
    cursor: initial;
`);

export const DropdownContainer = styled.div( ({theme, flexDirection}) => `
    background-color: ${theme.backgroundColor1};
    color: ${theme.textColor1};
    border-radius: 0.75rem;
    box-sizing: border-box;
    border: 3px solid ${theme.backgroundColor3};
    // box-shadow: 0px 0px 15px 0px ${ (theme.type === 'light') ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" };
    font-size: 1rem;
    width: fit-content; //100%;
    padding: 0.5rem;
    min-height: calc(100% - 0.5rem);
    white-space: nowrap;
    position: absolute;
    top: 0.5rem;
    right: 0;
    display: flex;
    flex-direction: ${flexDirection === "column" ? "column" : "row" };
    justify-content: space-around;
    align-items: center;
    z-index: 2;
`);

export const ColorOption = styled.div( ({theme, color}) => `
    background: ${color};
    border: none;
    display: flex;
    padding: 1rem;
    margin: 1rem;
    border-radius: 100%;
    min-width: 1rem;
    cursor: pointer;
`);

export const Option = styled.div( ({theme}) => `
    border: none;
    width: 100%;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: Montserrat;
    display: flex;
    justify-content: flex-start; //center
    align-items: center;
    cursor: pointer;
    padding: 1rem;

    &:hover
    {
        background: ${theme.backgroundColor2};
    }
`);

export const OptionText = styled.div( ({theme}) => `
    margin-left: 0.75rem;
`);

export const ButtonGroup = styled.div( ({theme}) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
`);

export const Button = styled.button(({ theme }) => `
    border: 2px solid ${theme.backgroundColor2};
    background: none;
    color: ${theme.textColor2};
    padding: 0.66rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    transition: 0.3s ease all;
    cursor: pointer;

    &:hover
    {
        transform: scale(0.9);
    }

    &:hover ${Dropdown}
    {
        display: flex;
        flex-direction: column;
    }
`);

export const Icon = styled.div( ({theme}) => `
    font-size: 1rem;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`);

export const Title = styled.div( ({theme}) => `
    font-size: 1.1rem;
    font-weight: bold;
    border: 2px solid ${theme.backgroundColor2};
    border-radius: 0.5rem;
    color: ${theme.primaryColor1};
    display: flex;
    cursor: default;
    justify-content: flex-start; //center
    align-items: center;
    padding: 0.5rem 0.66rem;
    margin-left: 0.66rem;
`);