import React from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Token from "./components/Token";

import { Wrapper, MainContent } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <Dashboard />
        <Token />
      </MainContent>
    </Wrapper>
  );
};

export default Main;
