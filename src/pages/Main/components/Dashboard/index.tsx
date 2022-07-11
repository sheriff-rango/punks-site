import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../../app/hooks";
import Chart from "../../../../components/Chart";
import TokenPrice from "../../../../components/TokenPrice";
import { Contracts } from "../../../../constant/config";
import useContract from "../../../../hooks/useContract";
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
  const [tokens, setTokens] = useState<any>();
  const [rewardsAirdrop, setRewardsAirdrop] = useState();
  const account = useAppSelector((state) => state.accounts.keplr);
  const { runQuery, runExecute } = useContract();

  useEffect(() => {
    (async () => {
      if (account) {
        const tokens = await runQuery(Contracts.nftContract, {
          tokens: {
            owner: account.address,
            limit: 30,
          },
        });
        setTokens(tokens);
        const rewards = await runQuery(Contracts.stakingContract, {
          get_claim_amount: {
            id: tokens.tokens,
            address: account.address,
          },
        });
        setRewardsAirdrop(rewards);
      }
    })();
  }, [runQuery, account]);

  const handleClaimAirdrop = async () => {
    if (!account || !tokens) return;

    await runExecute(Contracts.stakingContract, {
      claim_reward: {
        token_id: tokens.tokens,
      },
    });
  };

  return (
    <Wrapper>
      <AirDropContainer>
        <AirDropContent>
          <AirDropTitle>Claim your PunkDrop!</AirDropTitle>
          <AirDropSubTitle>
            All the junoPunks NFT holders are eligible to claim the $PUNKS
            airdrop
          </AirDropSubTitle>
          <ClaimButton
            disabled={!account}
            onClick={handleClaimAirdrop}
          >{`Claim ${
            rewardsAirdrop ? Number(rewardsAirdrop) / 1e6 : ""
          } $PUNK Token`}</ClaimButton>
        </AirDropContent>
        <AirDropImage />
      </AirDropContainer>
      <TokenPricesContainer>
        <TokenPrice tokenType="juno" />
        <TokenPrice tokenType="punk" />
      </TokenPricesContainer>
      <Chart />
    </Wrapper>
  );
};

export default Dashboard;
