import React from "react";
import { ChatBox, Dropdown, Button } from "../components";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";

export default function Chat() {

    return (
        <ChatBox>
            <ChatBox.Section width={"30%"} noPaddingBottom>
                <ChatBox.Header>
                    <ChatBox.Title>Chat Messages</ChatBox.Title>
                </ChatBox.Header>
                <ChatBox.SearchBox>
                    <ChatBox.SearchInput placeholder="Search candidates..." />
                    <ChatBox.Send search><BiSearchAlt2 /></ChatBox.Send>
                </ChatBox.SearchBox>
                <ChatBox.PeopleWindow fullHeight borderRadius>
                    <ChatBox.Person>
                        <ChatBox.Column width={"100%"}>
                            <ChatBox.Name>Ganesh Mane</ChatBox.Name>
                            <ChatBox.LastMsg>Hello, how are you?</ChatBox.LastMsg>
                        </ChatBox.Column>
                        <ChatBox.Column alignEnd width={"fit-content"}>
                            <ChatBox.Date>2022/12/31</ChatBox.Date>
                            <ChatBox.Status>Shortlisted</ChatBox.Status>
                        </ChatBox.Column>
                    </ChatBox.Person>
                </ChatBox.PeopleWindow>
            </ChatBox.Section>
            <ChatBox.Section width={"70%"}>
                <ChatBox.Header>
                    <ChatBox.Title>Acecom Solutions Private Limited</ChatBox.Title>
                    <ChatBox.Subtitle>Web Development Internship</ChatBox.Subtitle>
                </ChatBox.Header>
                <ChatBox.Window>
                    <ChatBox.Message>
                        Hello
                        <ChatBox.Time>09:34am</ChatBox.Time>
                    </ChatBox.Message>
                    <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message>How are you?<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message>
                        I am doing good. How are you? How was your day?
                        <ChatBox.Time>09:34am</ChatBox.Time>
                    </ChatBox.Message>
                    <ChatBox.Message receive>
                        I am doing good. How are you? How was your day? I am doing good. How are you? How was your day?
                        <ChatBox.Time>09:34am</ChatBox.Time>
                    </ChatBox.Message>
                    <ChatBox.Message>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                    <ChatBox.Message>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
                </ChatBox.Window>
                <ChatBox.InputBox>
                    <ChatBox.Input placeholder="Type your message..." />
                    <ChatBox.Send><RiSendPlaneFill /></ChatBox.Send>
                </ChatBox.InputBox>
            </ChatBox.Section>
        </ChatBox>
    );
}