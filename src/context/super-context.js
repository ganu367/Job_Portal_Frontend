import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, SidebarProvider, AlertProvider, AuthProvider, LoadingProvider } from "../context";

function SuperProvider({children}) {
    return (
        <>
        <Router>
            <AuthProvider>
                <AlertProvider>
                    <LoadingProvider>
                        <SidebarProvider>
                            <ThemeProvider>
                                {children}
                            </ThemeProvider>
                        </SidebarProvider>
                    </LoadingProvider>
                </AlertProvider>
            </AuthProvider>
        </Router>
        </>
    );
}

export default SuperProvider;