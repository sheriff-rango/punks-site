import React from "react";

import { Wrapper, TitleBar, MainTitle, SubTitle } from "./styled";

const Token: React.FC = () => {
  return (
    <Wrapper>
      <TitleBar>
        <MainTitle>$PUNK Token</MainTitle>
        <SubTitle>Unstaking Period 27 Days | Daily Payout 08:00 UTC</SubTitle>
      </TitleBar>
    </Wrapper>
  );
};

export default Token;
