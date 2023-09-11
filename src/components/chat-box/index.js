import React from 'react';
import { Container, Section, Header, Title, Subtitle, Window, Message, Time, InputBox, Input, Send, SearchInput, SearchBox, SearchContainer, ButtonGroup, PeopleWindow, Person, Name, LastMsg, Date, Status, Column, Row, ChatDate, Icon, SpecialRow, CompanyName } from './styles/chat-box';

function ChatBox({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

ChatBox.Section = function ChatBoxSection({children, ...restProps}) {
    return (
        <Section {...restProps}>
            {children}
        </Section>
    );
}

ChatBox.Header = function ChatBoxHeader({children, ...restProps}) {
    return (
        <Header {...restProps}>
            {children}
        </Header>
    );
}

ChatBox.Title = function ChatBoxTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

ChatBox.Subtitle = function ChatBoxSubtitle({children, ...restProps}) {
    return (
        <Subtitle {...restProps}>
            {children}
        </Subtitle>
    );
}

ChatBox.Window = function ChatBoxWindow({children, refPointer, ...restProps}) {
    return (
        <Window ref={refPointer} {...restProps}>
            {children}
        </Window>
    );
}

ChatBox.Message = function ChatBoxMessage({children, ...restProps}) {
    return (
        <Message {...restProps}>
            {children}
        </Message>
    );
}

ChatBox.Time = function ChatBoxTime({children, ...restProps}) {
    return (
        <Time {...restProps}>
            {children}
        </Time>
    );
}

ChatBox.InputBox = function ChatBoxInputBox({children, ...restProps}) {
    return (
        <InputBox {...restProps}>
            {children}
        </InputBox>
    );
}

ChatBox.Input = function ChatBoxInput({children, ...restProps}) {
    return (
        <Input {...restProps}>
            {children}
        </Input>
    );
}

ChatBox.Send = function ChatBoxSend({children, ...restProps}) {
    return (
        <Send {...restProps}>
            {children}
        </Send>
    );
}

ChatBox.SearchInput = function ChatBoxSearchInput({children, ...restProps}) {
    return (
        <SearchInput {...restProps}>
            {children}
        </SearchInput>
    );
}

ChatBox.SearchBox = function ChatBoxSearchBox({children, ...restProps}) {
    return (
        <SearchBox{...restProps}>
            {children}
        </SearchBox>
    );
}

ChatBox.SearchContainer = function ChatBoxSearchContainer({children, refPointer, ...restProps}) {
    return (
        <SearchContainer ref={refPointer} {...restProps}>
            {children}
        </SearchContainer>
    );
}

ChatBox.ButtonGroup = function ChatBoxButtonGroup({children, ...restProps}) {
    return (
        <ButtonGroup {...restProps}>
            {children}
        </ButtonGroup>
    );
}

ChatBox.PeopleWindow = function ChatBoxPeopleWindow({children, ...restProps}) {
    return (
        <PeopleWindow {...restProps}>
            {children}
        </PeopleWindow>
    );
}

ChatBox.Person = function ChatBoxPerson({children, ...restProps}) {
    return (
        <Person {...restProps}>
            {children}
        </Person>
    );
}

ChatBox.Name = function ChatBoxName({children, ...restProps}) {
    return (
        <Name {...restProps}>
            {children}
        </Name>
    );
}

ChatBox.LastMsg = function ChatBoxLastMsg({children, ...restProps}) {
    return (
        <LastMsg {...restProps}>
            {children}
        </LastMsg>
    );
}

ChatBox.Date = function ChatBoxDate({children, ...restProps}) {
    return (
        <Date {...restProps}>
            {children}
        </Date>
    );
}

ChatBox.Status = function ChatBoxStatus({children, ...restProps}) {
    return (
        <Status {...restProps}>
            {children}
        </Status>
    );
}

ChatBox.Column = function ChatBoxColumn({children, ...restProps}) {
    return (
        <Column {...restProps}>
            {children}
        </Column>
    );
}

ChatBox.Row = function ChatBoxRow({children, ...restProps}) {
    return (
        <Row {...restProps}>
            {children}
        </Row>
    );
}

ChatBox.ChatDate = function ChatBoxChatDate({children, refPointer, ...restProps}) {
    return (
        <ChatDate ref={refPointer} {...restProps}>
            {children}
        </ChatDate>
    );
}

ChatBox.Icon = function ChatBoxIcon({children, refPointer, ...restProps}) {
    return (
        <Icon ref={refPointer} {...restProps}>
            {children}
        </Icon>
    );
}

ChatBox.SpecialRow = function ChatBoxSpecialRow({children, refPointer, ...restProps}) {
    return (
        <SpecialRow ref={refPointer} {...restProps}>
            {children}
        </SpecialRow>
    );
}

ChatBox.CompanyName = function ChatBoxCompanyName({children, refPointer, ...restProps}) {
    return (
        <CompanyName ref={refPointer} {...restProps}>
            {children}
        </CompanyName>
    );
}

export default ChatBox;