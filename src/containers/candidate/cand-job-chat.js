import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ChatBox, Button, Dropdown } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat } from "../../hooks";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function CandJobChat() {
    const location = useLocation();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {setAlert} = useAlert();
    const {dateConverter,timeConverter} = useDateFormat();
    const scrollMsgsRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    const [message, setMessage] = useState("");
    const [employersList, setEmployersList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentEmployer, setCurrentEmployer] = useState({});
    let prevDate = "0";

    const [searchJob, setSearchJob] = useState("");
    const searchJobRef = useRef();
    const [searchJobDD, setSearchJobDD] = useState(false);
    const [searchJobList, setSearchJobList] = useState([]);

    const getChatsForJob = () => {
        axiosPrivate
        .get("/api/get-chats-for-candidate/")
        .then(function (response) {
            // console.log(response?.data);
            setEmployersList(response?.data?.employer_chats);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    const getSearchJobList = () => {
        axiosPrivate
        .get("/api/candidate/get-applied-jobs/")
        .then(function (response) {
            // console.log(response?.data);
            setSearchJobList(response?.data?.search_jobs);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    useEffect(() => {
        getChatsForJob();
        getSearchJobList();
    }, []);
    
    const getMessagesWithEmployer = (jobID) => {
        axiosPrivate
        .get("/api/get-messages-with-employer/"+jobID)
        .then(function (response) {
            // console.log(response?.data);
            setMessages(response?.data?.messages);
            setCurrentEmployer(response?.data?.employer);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    useEffect(() => {
        if(state !== null) {
            getMessagesWithEmployer(state?.jobID);
        }
    }, [])
    

    const sendMessage = (e) => {
        e.preventDefault();
        axiosPrivate
        .post("/api/candidate/chat/"+currentEmployer?.job_id, {message: message},
        {headers: {
            "Content-Type": "multipart/form-data"
        }})
        .then(function (response) {
            setMessage("");
            getMessagesWithEmployer(currentEmployer?.job_id);
            getChatsForJob();
        })
        .catch(function (error) {
            // console.log(error)
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        getMessagesWithEmployer(searchJob?.id);
    }

    const scrollToRef = (ref) => {
        ref?.current?.scrollTo({
            left: 0,
            top: ref.current.scrollHeight,
            behavior: 'smooth'
        });
    };

    // useEffect(() => {
    //     if (employersList.length != 0) {
    //         getMessagesWithEmployer(employersList[0]?.candidate_id)
    //     }
    // }, [employersList])

    // useEffect(() => {
    //     console.log(searchJob)
    // }, [searchJob])
    

    useEffect(() => {
        scrollToRef(scrollMsgsRef);
    }, [messages]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(searchJobDD && !searchJobRef?.current?.contains(e.target)) {
                setSearchJobDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [searchJobDD, searchJobRef]);
    const changeJob = (item) => {
        setSearchJob(item);
        setSearchJobDD(false);
    }

    return (
        <ChatBox alone={!currentEmployer?.id}>
            <ChatBox.Section width={currentEmployer?.id ? "30%" : "100%"} noPaddingBottom bordered={!currentEmployer?.id}>
                <ChatBox.Header>
                    <ChatBox.Row spaceBetween center={!currentEmployer?.id} noMargin={currentEmployer?.id}>
                        <ChatBox.Column>
                            <ChatBox.Title>Chat Messages</ChatBox.Title>
                        </ChatBox.Column>
                        <ChatBox.ButtonGroup noMarginTop alone={currentEmployer?.id}>
                            <Button iconPadding small danger onClick={() => navigate("/candidate/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                        </ChatBox.ButtonGroup>
                    </ChatBox.Row>
                </ChatBox.Header>
                <ChatBox.SearchBox onSubmit={handleSearch}>
                    <ChatBox.SearchContainer refPointer={searchJobRef}>
                        <ChatBox.SearchInput readOnly type="text" id="searchJob" placeholder="Search candidates..."  autoComplete="off" value={searchJob?.job_title} onClick={() => setSearchJobDD((searchJobDD) => !searchJobDD)} />
                        <Dropdown top={"1%"} width={"100%"} dropdown={searchJobDD} flexDirection="column" empty={searchJobList.length === 0}>
                        {searchJobList.map((item) => {
                            return <Dropdown.Option noPointer selected={(searchJob?.job_title === item.job_title) ? "selected" : undefined} key={item.id} onClick={() => changeJob(item)}>
                                        {item.job_title}
                                    </Dropdown.Option>
                        })}
                        </Dropdown>
                        <ChatBox.Icon style={{pointerEvents: "none"}}>
                            {(searchJobDD) ? <FiChevronUp /> : <FiChevronDown />}
                        </ChatBox.Icon>
                    </ChatBox.SearchContainer>
                    <ChatBox.Send search type="submit" disabled={!searchJob?.id}><BiSearchAlt2 /></ChatBox.Send>
                </ChatBox.SearchBox>
                <ChatBox.PeopleWindow fullHeight borderRadius>
                    {/* <ChatBox.Person>
                        <ChatBox.Column width={"100%"}>
                            <ChatBox.Name>Ganesh Mane</ChatBox.Name>
                            <ChatBox.LastMsg>Hello, how are you?</ChatBox.LastMsg>
                        </ChatBox.Column>
                        <ChatBox.Column alignEnd width={"fit-content"}>
                            <ChatBox.Date>2022/12/31</ChatBox.Date>
                            <ChatBox.Status status="shortlisted">shortlisted</ChatBox.Status>
                        </ChatBox.Column>
                    </ChatBox.Person> */}
                    {employersList.map((item) => {
                        return (
                            <ChatBox.Person key={item.id} onClick={() => getMessagesWithEmployer(item.job_id)}>
                                <ChatBox.Column width={"100%"}>
                                    <ChatBox.Name>{item.job_title}</ChatBox.Name>
                                    <ChatBox.CompanyName>{item.company_name}</ChatBox.CompanyName>
                                    <ChatBox.LastMsg>{item.username !== item.created_by ? "You: " : ""}{item.chat_message.substring(0,20)}{item.chat_message.length > 20 ? "..." : ""}</ChatBox.LastMsg>
                                </ChatBox.Column>
                                <ChatBox.Column alignEnd width={"fit-content"}>
                                    <ChatBox.Date>{dateConverter(item.chat_date)}</ChatBox.Date>
                                    {item.status &&
                                        <ChatBox.Status status={item?.status}>{item?.status}</ChatBox.Status>
                                    }
                                </ChatBox.Column>
                            </ChatBox.Person>
                        );
                    })}
                    {employersList.length === 0 &&
                        <ChatBox.SpecialRow>
                            No chats yet!
                        </ChatBox.SpecialRow>
                    }
                </ChatBox.PeopleWindow>
            </ChatBox.Section>
            {(currentEmployer && currentEmployer?.id) &&
            <ChatBox.Section width={"70%"}>
                <ChatBox.Header>
                    <ChatBox.Row spaceBetween noMargin>
                        <ChatBox.Column>
                            <ChatBox.Title>{currentEmployer?.job_title}</ChatBox.Title>
                            <ChatBox.Subtitle>{currentEmployer?.company_name}</ChatBox.Subtitle>
                        </ChatBox.Column>
                        <ChatBox.ButtonGroup flexEnd noMarginTop>
                            <Button iconPadding small danger onClick={() => navigate("/candidate/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                        </ChatBox.ButtonGroup>
                    </ChatBox.Row>
                </ChatBox.Header>
                <ChatBox.Window refPointer={scrollMsgsRef}>
                    {messages.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                            {(prevDate !== dateConverter(item.chat_date))
                                ?   <ChatBox.ChatDate>{prevDate = dateConverter(item.chat_date)}</ChatBox.ChatDate>
                                :   null
                            }
                            <ChatBox.Message receive={item.created_by === item.username}>
                                {item.chat_message}
                                <ChatBox.Time>{timeConverter(item.chat_date)}</ChatBox.Time>
                            </ChatBox.Message>
                            </React.Fragment>
                        );
                    })}
                    {messages.length === 0 &&
                        <ChatBox.SpecialRow>
                            No messages yet!
                        </ChatBox.SpecialRow>
                    }
                    {/* <ChatBox.Message>
                        Hello
                        <ChatBox.Time>09:34am</ChatBox.Time>
                    </ChatBox.Message> */}
                    {/* <ChatBox.Message receive>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message>
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
                    <ChatBox.Message>Hello<ChatBox.Time>09:34am</ChatBox.Time></ChatBox.Message> */}
                </ChatBox.Window>
                <ChatBox.InputBox onSubmit={sendMessage}>
                    <ChatBox.Input placeholder="Type your message..." type="text" id="message" autoComplete="off" value={message} onChange={({target}) => setMessage(target.value)}  />
                    <ChatBox.Send type="submit" disabled={!currentEmployer?.id || message === ""}><RiSendPlaneFill /></ChatBox.Send>
                </ChatBox.InputBox>
            </ChatBox.Section>
            }
        </ChatBox>
    );
}