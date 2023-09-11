import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ChatBox, Button, Dropdown } from "../../components";
import { useAxiosPrivate, useAlert, useDateFormat } from "../../hooks";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function EmpJobChat() {
    const location = useLocation();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {setAlert} = useAlert();
    const {dateConverter,timeConverter} = useDateFormat();
    const scrollMsgsRef = useRef(null);
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [message, setMessage] = useState("");
    const [candidatesList, setCandidatesList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentCandidate, setCurrentCandidate] = useState({});
    let prevDate = "0";
    const [showComponent, setShowComponent] = useState("");

    const [searchCand, setSearchCand] = useState("");
    const searchCandRef = useRef();
    const [searchCandDD, setSearchCandDD] = useState(false);
    const [searchCandList, setSearchCandList] = useState([]);

    const getChatsForJob = () => {
        axiosPrivate
        .get("/api/get-chats-for-job/"+params.jobID)
        .then(function (response) {
            // console.log(response?.data);
            setCandidatesList(response?.data?.candidate_chats);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    const getSearchCandList = () => {
        axiosPrivate
        .get("/api/employer/get-applied-candidates/"+params.jobID)
        .then(function (response) {
            // console.log(response?.data);
            setSearchCandList(response?.data?.search_candidates);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    useEffect(() => {
        getChatsForJob();
        getSearchCandList();
    }, []);
    
    const getMessagesWithCandidate = (candID) => {
        axiosPrivate
        .get("/api/get-messages-with-cand/"+params.jobID+"/"+candID)
        .then(function (response) {
            // console.log(response?.data);
            setMessages(response?.data?.messages);
            setCurrentCandidate(response?.data?.candidate);
        })
        .catch(function (error) {
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            // navigate("/candidate/dashboard");
        });
    }

    useEffect(() => {
        if(state !== null) {
            getMessagesWithCandidate(state?.candidateID);
        }
        if(params?.id || params?.jobID) {
            let jobID = params?.id || params?.jobID;
            axiosPrivate
            .get("/api/employer/job/get-job-status/"+jobID)
            .then(function (response) {
                if (response?.data?.status === "Open") {
                    setShowComponent(true);
                }
                else {
                    setShowComponent(false);
                }
            })
            .catch(function (error) {
                setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
            });
        }
    }, [])
    

    const sendMessage = (e) => {
        e.preventDefault();
        axiosPrivate
        .post("/api/employer/chat/"+params.jobID+"/"+currentCandidate?.id, {message: message},
        {headers: {
            "Content-Type": "multipart/form-data"
        }})
        .then(function (response) {
            setMessage("");
            getMessagesWithCandidate(currentCandidate?.id);
            getChatsForJob();
        })
        .catch(function (error) {
            // console.log(error)
            setAlert({msg: `Error: ${error?.response?.data?.detail}`, type: "error"});
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        getMessagesWithCandidate(searchCand?.id);
    }

    const scrollToRef = (ref) => {
        ref?.current?.scrollTo({
            left: 0,
            top: ref.current.scrollHeight,
            behavior: 'smooth'
        });
    };

    // useEffect(() => {
    //     if (candidatesList.length != 0) {
    //         getMessagesWithCandidate(candidatesList[0]?.candidate_id)
    //     }
    // }, [candidatesList])

    useEffect(() => {
        scrollToRef(scrollMsgsRef);
    }, [messages]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(searchCandDD && !searchCandRef?.current?.contains(e.target)) {
                setSearchCandDD(false);
            }
        }
        window.addEventListener("click",handleOutsideClick);
        return () => window.removeEventListener("click",handleOutsideClick);
    }, [searchCandDD, searchCandRef]);
    const changeCand = (item) => {
        setSearchCand(item);
        setSearchCandDD(false);
    }

    return (
        <ChatBox alone={!currentCandidate?.id}>
            <ChatBox.Section width={currentCandidate?.id ? "30%" : "100%"} noPaddingBottom bordered={!currentCandidate?.id}>
                <ChatBox.Header>
                    <ChatBox.Row spaceBetween center={!currentCandidate?.id} noMargin={currentCandidate?.id}>
                        <ChatBox.Column>
                            <ChatBox.Title>Chat Messages</ChatBox.Title>
                        </ChatBox.Column>
                        <ChatBox.ButtonGroup noMarginTop alone={currentCandidate?.id}>
                            <Button iconPadding small danger onClick={() => navigate("/employer/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
                        </ChatBox.ButtonGroup>
                    </ChatBox.Row>
                </ChatBox.Header>
                <ChatBox.SearchBox onSubmit={handleSearch}>
                    <ChatBox.SearchContainer refPointer={searchCandRef}>
                        <ChatBox.SearchInput readOnly type="text" id="searchCand" placeholder="Search candidates..."  autoComplete="off" value={searchCand?.name} onClick={() => setSearchCandDD((searchCandDD) => !searchCandDD)} />
                        <Dropdown top={"1%"} width={"100%"} dropdown={searchCandDD} flexDirection="column" empty={searchCandList.length === 0}>
                        {searchCandList.map((item) => {
                            return <Dropdown.Option noPointer selected={(searchCand?.name === item.name) ? "selected" : undefined} key={item.id} onClick={() => changeCand(item)}>
                                        {item.name}
                                    </Dropdown.Option>
                        })}
                        </Dropdown>
                        <ChatBox.Icon style={{pointerEvents: "none"}}>
                            {(searchCandDD) ? <FiChevronUp /> : <FiChevronDown />}
                        </ChatBox.Icon>
                    </ChatBox.SearchContainer>
                    <ChatBox.Send search type="submit" disabled={!searchCand?.id}><BiSearchAlt2 /></ChatBox.Send>
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
                    {candidatesList.map((item) => {
                        return (
                            <ChatBox.Person key={item.id} onClick={() => getMessagesWithCandidate(item.candidate_id)}>
                                <ChatBox.Column width={"100%"}>
                                    <ChatBox.Name>{item.name}</ChatBox.Name>
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
                    {candidatesList.length === 0 &&
                        <ChatBox.SpecialRow>
                            No chats yet!
                        </ChatBox.SpecialRow>
                    }
                </ChatBox.PeopleWindow>
            </ChatBox.Section>
            {(currentCandidate && currentCandidate?.id) &&
            <ChatBox.Section width={"70%"} > {/* noPaddingBottom={!showComponent} */}
                <ChatBox.Header>
                    <ChatBox.Row spaceBetween noMargin>
                        <ChatBox.Column>
                            <ChatBox.Title>{currentCandidate?.name}</ChatBox.Title>
                            <ChatBox.Subtitle>{currentCandidate?.current_location}</ChatBox.Subtitle>
                        </ChatBox.Column>
                        <ChatBox.ButtonGroup flexEnd noMarginTop>
                            <Button iconPadding small danger onClick={() => navigate("/employer/dashboard", {state: { from: location }})}><Button.Icon alone><FaTimes /></Button.Icon></Button>
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
                {showComponent &&
                    <>
                        <ChatBox.Input placeholder="Type your message..." type="text" id="message" autoComplete="off" value={message} onChange={({target}) => setMessage(target.value)}  />
                        <ChatBox.Send type="submit" disabled={!currentCandidate?.id || message === ""}><RiSendPlaneFill /></ChatBox.Send>
                    </>
                }
                {!showComponent &&
                    <ChatBox.SpecialRow>
                        Cannot send messages!
                    </ChatBox.SpecialRow>
                }
                </ChatBox.InputBox>
            </ChatBox.Section>
            }
        </ChatBox>
    );
}