import React from "react";
import Dashboard from "./components/Dashboard";
import NFTs from "./components/NFTs";
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
        <NFTs />
      </MainContent>
    </Wrapper>
  );
};

export default Main;
