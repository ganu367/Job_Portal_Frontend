import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { useTheme, useSidebar, useLogout, useAuth } from "../hooks";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { AiFillLock } from "react-icons/ai";
import { RxQuestionMark } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsGearFill, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useGoToLink } from "../hooks";

export default function HeaderContainer() {
    const navigate = useNavigate();
    const logout = useLogout();
    const goToLink = useGoToLink();
    const {auth, JWT} = useAuth();
    const {theme,themeToggler,setThemeColor} = useTheme();
    const {sidebarToggle,setSidebarToggle} = useSidebar();

    return (
        <Header>
            <Header.ButtonGroup>
                <Header.Button onClick={() => setSidebarToggle(!sidebarToggle)}>
                    <Header.Icon><FaBars /></Header.Icon>
                </Header.Button>
                {(auth?.accessToken) &&
                    <>
                        <Header.Button onClick={() => navigate(-1)}>
                            <Header.Icon><BiArrowBack /></Header.Icon>
                        </Header.Button>
                        <Header.Title>Welcome, {JWT?.user?.username}</Header.Title>
                    </>
                }
            </Header.ButtonGroup>
            <Header.ButtonGroup>
                {/* <Header.Button>
                    <Header.Icon><BsGearFill /></Header.Icon>
                    <Header.Dropdown>
                        <Header.ColorOption color={"#009fff"} onClick={() => setThemeColor("blue")} />
                        <Header.ColorOption color={"#00b05d"} onClick={() => setThemeColor("green")} />
                    </Header.Dropdown>
                </Header.Button> */}
                <Header.Button onClick={() => goToLink("https://docs.google.com/document/d/1zCV7Pd624piNu6vYPnuDEbkZkwYuyFjYYq2tiBURtNI/edit#")}>
                    <Header.Icon><RxQuestionMark /></Header.Icon>
                </Header.Button>
                <Header.Button onClick={themeToggler}>
                    <Header.Icon>{(theme === 'light') ? <BsFillMoonFill /> : <BsFillSunFill />}</Header.Icon>
                </Header.Button>
                {(auth?.accessToken) &&
                    <Header.Button>
                        <Header.Icon><FaUserAlt /></Header.Icon>
                        <Header.Dropdown flexDirection="column">
                            <Header.Option onClick={() => {navigate(`/${JWT?.user?.userType}/profile`)}}><Header.Icon><CgProfile style={{fontSize: "1.25rem"}} /></Header.Icon><Header.OptionText>Profile</Header.OptionText></Header.Option>
                            <Header.Option onClick={() => {navigate(`/${JWT?.user?.userType}/change-password`)}}><Header.Icon><AiFillLock style={{fontSize: "1.25rem"}} /></Header.Icon><Header.OptionText>Change Password</Header.OptionText></Header.Option>
                            <Header.Option onClick={() => logout()}><Header.Icon><TbLogout style={{fontSize: "1.25rem"}} /></Header.Icon><Header.OptionText>Logout</Header.OptionText></Header.Option>
                        </Header.Dropdown>
                    </Header.Button>
                }
            </Header.ButtonGroup>
        </Header>
    );
}