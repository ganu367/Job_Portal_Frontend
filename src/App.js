import React from "react";
import { GlobalStyles } from './global-styles';
import { SuperProvider } from "./context";
import { Layout } from "./containers";

function App() {
  return (
    <>
    <SuperProvider>
      <GlobalStyles />
      <Layout />
    </SuperProvider>
    </>
  );
}

export default App;