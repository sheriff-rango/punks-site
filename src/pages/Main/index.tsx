import React from "react";
import Sidebar from "./components/Sidebar";

import { Wrapper, MainContent } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <Sidebar />
      <MainContent>Main Content</MainContent>
    </Wrapper>
  );
};

export default Main;
