import React from 'react';
import { Container, Line, Title, ButtonGroup, InputContainer, InputColumn, InputRow, FileColumn, ViewRow, ViewColumn, ViewTitle, ViewSubtitle, ViewSubtitleLabel, ViewText, ViewDash, ViewLabel, Input, Textarea, Label, GridContainer, Icon, FileInput, ImagePreview, Dropdown, DropdownContainer, Option, OptionButton, PreviewLabel, FileList, FilePreview, FileProp, FileIcon, Note, NoteIcon } from './styles/filter';

function Card({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

Card.Line = function CardLine({children, ...restProps}) {
    return (
        <Line {...restProps}>
            {children}
        </Line>
    );
}

Card.Title = function CardTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

Card.ButtonGroup = function CardButtonGroup({children, ...restProps}) {
    return (
        <ButtonGroup {...restProps}>
            {children}
        </ButtonGroup>
    );
}

Card.InputColumn = function CardInputColumn({children, refPointer, ...restProps}) {
    return (
        <InputColumn {...restProps} ref={refPointer}>
            {children}
        </InputColumn>
    );
}

Card.InputRow = function CardInputRow({children, refPointer, ...restProps}) {
    return (
        <InputRow {...restProps} ref={refPointer}>
            {children}
        </InputRow>
    );
}

Card.InputContainer = function CardInputContainer({children, refPointer, ...restProps}) {
    return (
        <InputContainer {...restProps} ref={refPointer}>
            {children}
        </InputContainer>
    );
}

Card.Label = function CardLabel({children, ...restProps}) {
    return (
        <Label {...restProps}>
            {children}
        </Label>
    );
}

Card.PreviewLabel = function CardPreviewLabel({children, ...restProps}) {
    return (
        <PreviewLabel {...restProps}>
            {children}
        </PreviewLabel>
    );
}

Card.ViewRow = function CardViewRow({children, ...restProps}) {
    return (
        <ViewRow {...restProps}>
            {children}
        </ViewRow>
    );
}

Card.ViewColumn = function CardViewColumn({children, ...restProps}) {
    return (
        <ViewColumn {...restProps}>
            {children}
        </ViewColumn>
    );
}

Card.ViewTitle = function CardViewTitle({children, ...restProps}) {
    return (
        <ViewTitle {...restProps}>
            {children}
        </ViewTitle>
    );
}

Card.ViewSubtitle = function CardViewSubtitle({children, ...restProps}) {
    return (
        <ViewSubtitle {...restProps}>
            {children}
        </ViewSubtitle>
    );
}

Card.ViewText = function CardViewText({children, ...restProps}) {
    return (
        <ViewText {...restProps}>
            {children}
        </ViewText>
    );
}

Card.ViewDash = function CardViewDash({children, ...restProps}) {
    return (
        <ViewDash {...restProps}>
            {children}
        </ViewDash>
    );
}

Card.ViewLabel = function CardViewLabel({children, ...restProps}) {
    return (
        <ViewLabel {...restProps}>
            {children}
        </ViewLabel>
    );
}

Card.Input = function CardInput({children, ...restProps}) {
    return (
        <Input {...restProps}>
            {children}
        </Input>
    );
}

Card.Textarea = function CardTextarea({children, ...restProps}) {
    return (
        <Textarea {...restProps}>
            {children}
        </Textarea>
    );
}

Card.GridContainer = function CardGridContainer({children, ...restProps}) {
    return (
        <GridContainer {...restProps}>
            {children}
        </GridContainer>
    );
}

Card.Icon = function CardIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            {children}
        </Icon>
    );
}

Card.FileInput = function CardFileInput({children, ...restProps}) {
    return (
        <FileInput {...restProps}>
            {children}
        </FileInput>
    );
}

Card.ImagePreview = function CardImagePreview({children, ...restProps}) {
    return (
        <ImagePreview {...restProps}>
            {children}
        </ImagePreview>
    );
}

Card.Dropdown = function CardDropdown({children, ...restProps}) {
    return (
        <Dropdown {...restProps}>
            <DropdownContainer {...restProps}>
                {children}
            </DropdownContainer>
        </Dropdown>
    );
}

Card.Option = function CardOption({children, ...restProps}) {
    return (
        <Option {...restProps}>
            {children}
        </Option>
    );
}

Card.OptionButton = function CardOptionButton({children, ...restProps}) {
    return (
        <OptionButton {...restProps}>
            {children}
        </OptionButton>
    );
}

Card.FileList = function CardFileList({children, ...restProps}) {
    return (
        <FileList {...restProps}>
            {children}
        </FileList>
    );
}

Card.FilePreview = function CardFilePreview({children, ...restProps}) {
    return (
        <FilePreview {...restProps}>
            {children}
        </FilePreview>
    );
}

Card.FileProp = function CardFileProp({children, ...restProps}) {
    return (
        <FileProp {...restProps}>
            {children}
        </FileProp>
    );
}

Card.FileIcon = function CardFileIcon({children, ...restProps}) {
    return (
        <FileIcon {...restProps}>
            {children}
        </FileIcon>
    );
}

Card.FileColumn = function CardFileColumn({children, ...restProps}) {
    return (
        <FileColumn {...restProps}>
            {children}
        </FileColumn>
    );
}

Card.Note = function CardNote({children, ...restProps}) {
    return (
        <Note {...restProps}>
            {children}
        </Note>
    );
}

Card.NoteIcon = function CardNoteIcon({children, ...restProps}) {
    return (
        <NoteIcon {...restProps}>
            {children}
        </NoteIcon>
    );
}

Card.ViewSubtitleLabel = function CardViewSubtitleLabel({children, ...restProps}) {
    return (
        <ViewSubtitleLabel {...restProps}>
            {children}
        </ViewSubtitleLabel>
    );
}

export default Card;