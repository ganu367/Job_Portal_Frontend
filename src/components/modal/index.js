import React from 'react';
import { Overlay, Container, Title, Line, Text, ButtonContainer, Form, Input, Textarea, Label, InputContainer, Error, ViewText } from './styles/modal';

function Modal({children, ...restProps}) {
    return(
        <Overlay {...restProps}>
            {children}
        </Overlay>
    );
}

Modal.Container = function ModalContainer({children, ...restProps}) {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    );
}

Modal.Title = function ModalTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

Modal.Line = function ModalLine({children, ...restProps}) {
    return (
        <Line {...restProps}>
            {children}
        </Line>
    );
}

Modal.Text = function ModalText({children, ...restProps}) {
    return (
        <Text {...restProps}>
            {children}
        </Text>
    );
}

Modal.ButtonContainer = function ModalButtonContainer({children, ...restProps}) {
    return (
        <ButtonContainer {...restProps}>
            {children}
        </ButtonContainer>
    );
}

Modal.Form = function ModalForm({children, ...restProps}) {
    return (
        <Form {...restProps}>
            {children}
        </Form>
    );
}

Modal.InputContainer = function ModalInputContainer({children, ...restProps}) {
    return (
        <InputContainer {...restProps}>
            {children}
        </InputContainer>
    );
}

Modal.Input = function ModalInput({children, ...restProps}) {
    return (
        <Input {...restProps}>
            {children}
        </Input>
    );
}

Modal.Textarea = function ModalTextarea({children, ...restProps}) {
    return (
        <Textarea {...restProps}>
            {children}
        </Textarea>
    );
}

Modal.Label = function ModalLabel({children, ...restProps}) {
    return (
        <Label {...restProps}>
            {children}
        </Label>
    );
}

Modal.Error = function ModalError({children, ...restProps}) {
    return (
        <Error {...restProps}>
            {children}
        </Error>
    );
}

Modal.ViewText = function ModalViewText({children, ...restProps}) {
    return (
        <ViewText {...restProps}>
            {children}
        </ViewText>
    );
}

export default Modal;