import React from "react";
import InfoCard, { InfoCardProps } from "../../../../components/InfoCard";

import {
  Wrapper,
  TitleBar,
  MainTitle,
  SubTitle,
  SubWrapper,
  InfoContainer,
  FooterBar,
  FooterContent,
  FooterBalance,
} from "./styled";

const NFTs: React.FC = () => {
  const infos: InfoCardProps[] = [
    {
      title: "Your Allocation",
      contents: ["3 NFTs Available"],
    },
    {
      title: "NFT Staked",
      contents: ["1 NFT Available"],
    },
    {
      title: "Currently Unstaking",
      contents: ["1 NFT"],
    },
    {
      title: "Your Rewards",
      contents: ["101 $PUNK Available"],
      buttonOption: {
        title: "Claim",
      },
    },
  ];

  return (
    <div id="punkNft">
      <Wrapper>
        <TitleBar>
          <MainTitle>$PUNK NFTs</MainTitle>
          <SubTitle>Unstaking Period 27 Days | Daily Payout 08:00 UTC</SubTitle>
        </TitleBar>
        <SubWrapper>
          <InfoContainer>
            {infos.map((info: InfoCardProps, index: number) => (
              <InfoCard {...info} />
            ))}
          </InfoContainer>
          <FooterBar>
            <FooterContent>Total Punks Genesis NFT</FooterContent>
            <FooterBalance>145/500</FooterBalance>
          </FooterBar>
        </SubWrapper>
      </Wrapper>
    </div>
  );
};

export default NFTs;
