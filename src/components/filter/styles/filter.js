import styled from "styled-components/macro";

export const Container = styled.div( ({theme, width}) => `
    padding: 1rem;
    // margin-bottom: 1rem;
    box-sizing: border-box;
    width: ${width ? width : "35%"};
    height: 100%;
    border: 3px solid ${theme.backgroundColor3};
    border-radius: 0 0.75rem 0.75rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: ${theme.backgroundColor3};

    @media (max-width: 950px)
    {
        width: 100%;
        border-radius: 0.75rem 0.75rem 0 0;
        height: fit-content;
    }
`);

export const Title = styled.div( ({theme, colored}) => `
    color: ${ colored ? theme.primaryColor2 : theme.textColor1};
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    width: 100%;
    justify-content: space-between;

    // @media (max-width: 950px)
    // {
    //     justify-content: center;
    // }
`);

export const Line = styled.div( ({theme}) => `
    background: ${theme.backgroundColor4};
    height: 0.15rem;
    width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;
`);

export const ButtonGroup = styled.div( ({theme,flexStart,flexEnd,marginTop,marginLeft,marginBottom}) => `
    width: 100%;
    margin-top: ${ marginTop ? "1rem" : "0" };
    margin-left: ${ marginLeft ? "1rem" : "0" };
    margin-bottom: ${ marginBottom ? "1rem" : "0" };
    display: flex;
    flex-direction: column-reverse;
    justify-content: ${flexStart ? "flex-start" : (flexEnd ? "flex-end" : "center")};
    align-items: center;

    @media (max-width: 950px)
    {
        flex-direction: row;
    }
`);

export const Input = styled.input( ({theme, width, file}) => `
    border-radius: 0.5rem;
    width: ${width ? width : "100%"};
    font-size: 1rem;
    background: ${theme.backgroundColor2};
    border: 2px solid  ${theme.backgroundColor4};
    color: ${theme.textColor1};
    line-height: 2rem;
    padding: 0.5rem 0.75rem;
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

    &[type=file]
    {
        color: ${file ? theme.textColor1 : "transparent"};
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
    background: ${theme.backgroundColor1};
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

export const ViewTitle = styled.div( ({theme}) => `
    font-size: 2rem;
    font-weight: bold;
    color: ${theme.primaryColor2};
    text-align: center;
`);

export const ViewSubtitle = styled.div( ({theme, colored, bold}) => `
    font-size: ${ bold ? "1.1rem" : "1rem" };
    font-weight: ${ bold ? "bold" : "normal" };
    color: ${ colored ? theme.primaryColor2 : theme.textColor1};
    margin-top: 0.33rem;
`);

export const ViewText = styled.div( ({theme}) => `
    color: ${theme.textColor1};
    border-radius: 0.5rem;
    flex: 1;
    font-size: 1rem;
    background: ${theme.backgroundColor1};
    // border: 2px solid ${theme.backgroundColor3};
    color: ${theme.textColor1};
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: Montserrat;
    width: 100%;
    display: flex;
`);

export const ViewDash = styled.div( ({theme, symbol}) => `
    color: ${theme.textColor1};
    flex: 0.1;
    font-size: ${ symbol ? "1.25rem" : "1rem" };
    color: ${theme.textColor1};
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: Montserrat;
    width: 100%;
    display: flex;
    justify-content: center;

    &:first-of-type
    {
        padding-left: 0;
    }
`);

export const ViewLabel = styled.div( ({theme}) => `
    font-size: 0.9rem;
    line-height: 1rem;
    padding-bottom: 1rem;
    font-weight: bold;
    color: ${theme.textColor1};
    width: 100%;
    letter-spacing: 1px;
`);
export const ViewSubtitleLabel = styled.div( ({theme}) => `
    font-size: 0.9rem;
    font-weight: bold;
    color: ${theme.textColor1};
    width: fit-content;
    margin-right: 0.5rem;
    letter-spacing: 1px;

    @media (max-width: 950px)
    {
        margin-bottom: 0.5rem;
    }
`);

export const ViewRow = styled.div( ({theme}) => `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    @media (max-width: 950px)
    {
        align-items: center;
    }
`);

export const ViewColumn = styled.div( ({theme, notResponsive}) => `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    @media (max-width: 950px)
    {
        flex-direction: ${ notResponsive ? "row" : "column" };
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
    transition: 0.2s ease all;

    // {Input}:focus ~ &,
    // {Input}:not(:placeholder-shown){Input}:not(:focus) ~ &,
    // {Input}:active
    ${Input}:focus,
    ${Input}:active,
    ${Input}:not(:placeholder-shown) + &
    {
        background-color: ${theme.primaryColor2};
        padding: 0.2rem 0.5rem 0.2rem;
        border-radius: 0.5rem;
        top: -20%;
        font-size: 0.8rem;
        color: #fff;
    }

    ${Textarea}:not(:active),
    ${Textarea}:placeholder-shown + &
    {
        top: 10%;
    }

    ${Textarea}:focus,
    ${Textarea}:active,
    ${Textarea}:not(:placeholder-shown) + &
    {
        background-color: ${theme.primaryColor2};
        padding: 0.2rem 0.5rem 0.2rem;
        border-radius: 0.5rem;
        top: -7%;
        font-size: 0.8rem;
        color: #fff;
    }
`);

export const InputContainer = styled.div( ({theme, width, notAlone, flexEnd, center, noMarginTop, except}) => `
    position: relative;
    width: ${width ? width : "100%"};
    display: flex;
    flex-direction: row;
    justify-content: ${ flexEnd ? "flex-end" : center ? "center" : "flex-start" };
    margin: 0.25rem;
    margin-left: ${notAlone ? "0" : "1rem" };
    margin-top: ${noMarginTop ? "0" : "1rem" };
    align-items: center;

    @media (max-width: 950px)
    {
        margin-left: ${except ? "0" : "1rem" };
        justify-content: center;
    }
`);

export const InputColumn = styled.div( ({theme, notResponsive}) => `
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 950px)
    {
        flex-direction: ${ notResponsive ? "row" : "column" };
    }
`);

export const InputRow = styled.div( ({theme}) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 950px)
    {
        align-items: center;
    }
`);

export const Note = styled.div( ({theme}) => `
    width: 100%;
    padding: 0.75rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid rgba(0, 159, 255, 0.5);
    background-color: rgba(0, 159, 255, 0.2);
    border-radius: 0.5rem;
    color: ${theme.textColor1};
`);

export const NoteIcon = styled.div( ({theme}) => `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.33rem;
    margin-right: 0.75rem;
    font-weight: bold;
`);

export const GridContainer = styled.div( ({theme}) => `
    padding: 2rem;
    height: 100%;
    width: 100%;
`);

export const Icon = styled.div( ({theme}) => `
    color: ${theme.textColor3};
    position: absolute;
    right: 2%;
    bottom: 13%;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover
    {
        color: ${theme.textColor2};
    }
`);

export const FileInput = styled.input( ({theme, width, file}) => `
    border-radius: 0.5rem;
    width: ${width ? width : "100%"};
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
        border-radius: 10px;
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

    &[type=file]::after
    {
        content: "${file ? file : "No file chosen"}";
    }

    ::-webkit-calendar-picker-indicator
    {
        cursor: pointer;
        font-size: 1.5rem;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    }
`);

export const ImagePreview = styled.img( ({theme, alone}) => `
    height: 15rem;
    border-radius: 1rem;
    border: 2px solid ${theme.backgroundColor3};
    padding: 0.5rem;
    margin-top: ${alone ? "" : "-0.5rem" };
`);

export const FileList = styled.div( ({theme, alone}) => `
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    // margin: -0.5rem 0 1rem;
`);

export const FilePreview = styled.div( ({theme}) => `
    display: flex;
    width: 100%;
    // margin-top: 0.5rem;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    border-radius: 0.5rem;
    border: 2px solid ${theme.backgroundColor3};
    background: ${theme.backgroundColor3};
    padding: 0.25rem;
    position: relative;
`);

export const FileProp = styled.div( ({theme}) => `
    font-size: 0.9rem;
    padding: 0.2rem;
    width: 90%;
`);

export const FileIcon = styled.div( ({theme}) => `
    color: ${theme.textColor2};
    position: absolute;
    right: 2.5%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.3s ease all;

    &:hover
    {
        color:  ${theme.textColor1};
    }
`);

export const FileColumn = styled.div( ({theme}) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`);

export const PreviewLabel = styled.label( ({theme}) => `
    font-size: 0.8rem;
    font-family: Montserrat;
    color: #fff;
    cursor: text;
    position: absolute;
    border-radius: 0.5rem;
    background-color: ${theme.primaryColor2};
    top: -10%;
    left: 1%;
    padding: 0.2rem 0.5rem 0.2rem;
    transition: 0.2s ease all;
`);

export const Dropdown = styled.div( ({theme, dropdown}) => `
    display: ${dropdown ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: 3.5rem;
    right: 0;
    width: 100%;
    min-height: 5rem;
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
    width: 100%;
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
    border: ${selected ? `2px solid ${theme.backgroundColor2}` : "none" };
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
    color: ${selected ? theme.textColor3 : "inherit" };

    &:hover
    {
        background: ${selected ? "initial" : theme.backgroundColor2};
    }
`);

export const OptionButton = styled.div( ({theme, selected}) => `
    border-top: 3px solid ${theme.backgroundColor2};
    width: 100%;
    font-size: 1rem;
    font-family: Montserrat;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin-top: 0.25rem;
    color: ${selected ? theme.textColor3 : "inherit" };
`);