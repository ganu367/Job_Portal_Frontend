import React, { useState } from 'react'
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "../hooks";

export const ThemeContext = React.createContext();

const ThemeContextProvider = ({children}) => {
    const [theme,themeToggler] = useDarkMode();
    const [themeColor, setThemeColor] = useState("blue");
    // const ChangeColor = () => {
    //     if (themeColor === "blue")
    //     return theme === "light" ? "#009fff" : "#33b2ff";
    //     else if (themeColor === "green")
    //     return "#00b05d";
    // };
    
    const lightTheme = {
        type: "light",
        primaryColor1: "#33b2ff", //lightest
        primaryColor2: themeColor === "blue" ? "#009fff" : "#00b05d", //ChangeColor()
        primaryColor3: "#007fcc", //darkest
        textColor1: "#111", //darkest
        textColor2: "#555",
        textColor3: "#888", //lightest
        backgroundColor1: "#fafafa", //lightest
        backgroundColor2: "#eee",
        backgroundColor3: "#d6d6d6", //darkest
        backgroundColor4: "#c1c1c1", //darkest
        borderColor: "#009fff",
        white: "#fff",
        black: "#000",
        success: "#00b05d",
        danger: "#dc3545",
        caution: "#e69f06",
        info: "#009fff",
    }
    const darkTheme = {
        type: "dark",
        primaryColor1: "#5cc1ff", //lightest
        primaryColor2: themeColor === "blue" ? "#33b2ff" : "#00b05d",
        primaryColor3: "#298ecc", //darkest
        textColor1: "#eee", //lightest
        textColor2: "#bbb",
        textColor3: "#999", //darkest
        backgroundColor1: "#2c2c2c", //darkest
        backgroundColor2: "#3f3f3f",
        backgroundColor3: "#4f4f4f",
        backgroundColor4: "#5f5f5f", //lightest
        borderColor: "#009fff",
        white: "#fff",
        black: "#000",
        success: "#40c486",
        danger: "#e35d6a",
        caution: "#ffc851",
        info: "#47baff",
    }
    const themeStyle = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{theme,themeToggler,themeColor,setThemeColor}}>
            <ThemeProvider theme={themeStyle}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;