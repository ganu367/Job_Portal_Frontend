import styled from "styled-components/macro";

export const Container = styled.div( ({theme, noPadding}) => `
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;
    min-height: 75%;
    border: ${ noPadding ? "none" : `3px solid ${theme.backgroundColor2}`};
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: ${theme.backgroundColor2};
`);

export const Line = styled.div( ({theme}) => `
    background: ${theme.backgroundColor2};
    height: 0.15rem;
    width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;
`);

export const ButtonGroup = styled.div( ({theme,flexStart,flexEnd,center,marginBottom}) => `
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${flexStart ? "flex-start" : (flexEnd ? "flex-end" : "center")};
    align-items: center;
    margin-bottom: ${ marginBottom ? "1rem" : "0" };
`);

export const Text = styled.div( ({theme}) => `
    font-size: 1rem;
    padding: 0 0.5rem 0.5rem;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
`);
