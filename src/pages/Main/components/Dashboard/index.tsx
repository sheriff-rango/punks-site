import React from "react";
import TokenPrice from "../../../../components/TokenPrice";
import {
  Wrapper,
  AirDropContainer,
  AirDropContent,
  AirDropTitle,
  AirDropSubTitle,
  ClaimButton,
  AirDropImage,
  TokenPricesContainer,
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
      <TokenPricesContainer>
        <TokenPrice tokenType="juno" />
        <TokenPrice tokenType="punk" />
      </TokenPricesContainer>
    </Wrapper>
  );
};

export default Dashboard;
