import React from "react";
import {
  Wrapper,
  AirDropContainer,
  AirDropContent,
  AirDropTitle,
  AirDropSubTitle,
  ClaimButton,
  AirDropImage,
} from "./styled";

const Dashboard: React.FC = () => {
  return (
    <Wrapper>
      <AirDropContainer>
        <AirDropContent>
          <AirDropTitle>Claim your PunkDrop!</AirDropTitle>
          <AirDropSubTitle>
            All the junoPunks NFT holders are eligible to claim the $PUNKS
            airdrop
          </AirDropSubTitle>
          <ClaimButton>Claim</ClaimButton>
        </AirDropContent>
        <AirDropImage />
      </AirDropContainer>
    </Wrapper>
  );
};

export default Dashboard;
