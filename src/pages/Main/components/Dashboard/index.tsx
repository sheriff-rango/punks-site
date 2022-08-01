import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../app/hooks";
import Chart from "../../../../components/Chart";
import TokenPrice from "../../../../components/TokenPrice";
import { Contracts } from "../../../../constant/config";
import { PAGES } from "../../../../constant/pages";
import useContract from "../../../../hooks/useContract";
import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
import {
  Wrapper,
  AirDropContainer,
  AirDropContent,
  AirDropTitle,
  AirDropSubTitle,
  ClaimButtonContainer,
  ClaimButton,
  AirDropImage,
  TokenPricesContainer,
  ClaimCheckerContainer,
  ClaimCheckerItem,
  ClaimCheckerTitle,
  ClaimCheckerContent,
  TokenIdInputerContainer,
  TokenIdInputer,
  StyledSvg,
  NftItem,
  NftItemImage,
  NftItemContents,
  NftItemContent,
} from "./styled";

const MAX_COUNT = 500;

const ClaimCheckOption = [
  {
    title: "Find your Genesis Punks",
    tokenId: "JunoPunks",
    nftAddress: Contracts.nftContracts.genisis,
    stakingAddress: Contracts.stakingContracts.genisis,
    imageBaseUrl:
      "https://hopegalaxy.mypinata.cloud/ipfs/Qmbsmj4q3cAZdqkFvFBq4zBrHtzXf4FzDTMQQm9MHcB2yb",
  },
  {
    title: "Find your Martians Punks",
    tokenId: "JunoPunks2",
    nftAddress: Contracts.nftContracts.martians,
    stakingAddress: Contracts.stakingContracts.martians,
    imageBaseUrl:
      "https://hopegalaxy.mypinata.cloud/ipfs/QmWFWZh2cqGPrCpsMeqvsxrjZjKz8WckbuRmmq9hRAXfFe",
  },
];

const SearchIcon = ({ ...props }) => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
  </StyledSvg>
);

const Dashboard: React.FC = () => {
  const [tokenIdNumber, setTokenIdNumber] = useState<{ [key: string]: string }>(
    {}
  );
  const [claimCheckResult, setClaimCheckResult] = useState<{
    [key: string]: { id: string; claimStatus: boolean };
  }>({});
  const [rewardsAirdrop, setRewardsAirdrop] = useState();
  const { runQuery, runExecute } = useContract();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state) => state.accounts.keplr);
  const tokens = useAppSelector(
    (state) => state.nfts[Contracts.nftContracts.genisis]
  );

  const claimChecker = async (
    tokenId: string,
    {
      nftAddress,
      stakingAddress,
    }: { nftAddress: string; stakingAddress: string }
  ): Promise<boolean> => {
    if (!nftAddress || !stakingAddress) return false;
    const tokens: any = await runQuery(Contracts.nftContracts.genisis, {
      all_nft_info: {
        token_id: tokenId,
      },
    });
    const address = tokens?.access?.owner;
    const claimAmount = await runQuery(Contracts.stakingContracts.genisis, {
      get_claim_amount: {
        id: [tokenId],
        address,
      },
    });
    return Number(claimAmount) === 0;
  };

  const getClaimAmount = useCallback(
    async (tokens: any, address: string) => {
      if (address && tokens) {
        const rewards = await runQuery(Contracts.stakingContracts.genisis, {
          get_claim_amount: {
            id: tokens,
            address: address,
          },
        });
        setRewardsAirdrop(rewards);
      }
    },
    [runQuery]
  );

  useEffect(() => {
    if (account && tokens) {
      getClaimAmount(tokens.tokens, account.address);
    }
  }, [runQuery, account, tokens, getClaimAmount]);

  const handleClaimAirdrop = async () => {
    if (!account || !tokens) return;

    await runExecute(Contracts.stakingContracts.genisis, {
      claim_reward: {
        token_id: tokens.tokens,
      },
    });
    getClaimAmount(tokens.tokens, account.address);
    toast.success("Successfully claimed!");
  };

  const handleChangeSearchTokenId = (e: any, nftAddress: string) => {
    const { value } = e.target;
    const number = Number(value.split(".").pop());
    if (isNaN(number)) return;
    setTokenIdNumber((prev) => ({
      ...prev,
      [nftAddress]: number ? "" + Math.min(number, MAX_COUNT) : "",
    }));
  };

  const handleCheckClaim = async (
    nftAddress: string,
    stakingAddress: string
  ) => {
    try {
      const tokenId =
        nftAddress === Contracts.nftContracts.genisis
          ? `JunoPunks.${tokenIdNumber[nftAddress]}`
          : `JunoPunks2${tokenIdNumber[nftAddress]}`;
      const claimResult = await claimChecker(tokenId, {
        nftAddress,
        stakingAddress,
      });
      setClaimCheckResult((prev) => ({
        ...prev,
        [nftAddress]: {
          id: tokenIdNumber[nftAddress],
          claimStatus: claimResult,
        },
      }));
    } catch (err) {}
  };

  const handleKeyUp = (e: any, nftAddress: string, stakingAddress: string) => {
    if (e.key === "Enter" && tokenIdNumber) {
      handleCheckClaim(nftAddress, stakingAddress);
    }
  };

  return (
    <Wrapper id={PAGES.DASHBOARD}>
      <AirDropContainer isMobile={isMobile}>
        {isMobile && <AirDropImage />}
        <AirDropContent>
          <AirDropTitle>Claim your PunkDrop!</AirDropTitle>
          <AirDropSubTitle>
            All the junoPunks NFT and Martians holders are eligible to claim the
            $PUNKS airdrop
          </AirDropSubTitle>
          <ClaimButtonContainer>
            <ClaimButton
              disabled={!account || !Number(rewardsAirdrop)}
              onClick={handleClaimAirdrop}
            >
              {/* {`Claim ${
                rewardsAirdrop ? Number(rewardsAirdrop) / 1e6 : ""
              } $PUNK Token`} */}
              $PUNK GENESIS
            </ClaimButton>
            <ClaimButton>$PUNK MARTIANS</ClaimButton>
          </ClaimButtonContainer>
        </AirDropContent>
        {!isMobile && <AirDropImage />}
      </AirDropContainer>
      <ClaimCheckerContainer id={PAGES.TOKENCHECKER}>
        {ClaimCheckOption.map((item, index) => {
          const url = `${item.imageBaseUrl}/${
            claimCheckResult?.[item.nftAddress]?.id
          }.png`;
          return (
            <ClaimCheckerItem key={index}>
              <ClaimCheckerTitle>{item.title}</ClaimCheckerTitle>
              <ClaimCheckerContent>
                <TokenIdInputerContainer>
                  <TokenIdInputer
                    value={`${item.tokenId}.${
                      tokenIdNumber[item.nftAddress] || ""
                    }`}
                    onChange={(e) =>
                      handleChangeSearchTokenId(e, item.nftAddress)
                    }
                    onKeyUp={(e) =>
                      handleKeyUp(e, item.nftAddress, item.stakingAddress)
                    }
                    placeholder="Please input token id"
                  />
                  <SearchIcon
                    onClick={() =>
                      handleCheckClaim(item.nftAddress, item.stakingAddress)
                    }
                  />
                </TokenIdInputerContainer>
                {claimCheckResult[item.nftAddress] && (
                  <NftItem>
                    <NftItemImage src={url} alt="" />
                    <NftItemContents>
                      <NftItemContent>{`JunoPunks.${
                        claimCheckResult?.[item.nftAddress]?.id
                      }`}</NftItemContent>
                      <NftItemContent
                        backgroundColor={
                          claimCheckResult[item.nftAddress].claimStatus
                            ? "#4062FF"
                            : "#66C24F"
                        }
                      >
                        {claimCheckResult[item.nftAddress].claimStatus
                          ? "Claimed"
                          : "Claimable"}
                      </NftItemContent>
                    </NftItemContents>
                  </NftItem>
                )}
              </ClaimCheckerContent>
            </ClaimCheckerItem>
          );
        })}
      </ClaimCheckerContainer>
      <TokenPricesContainer>
        <TokenPrice tokenType="juno" />
        <div />
        {/* <TokenPrice tokenType="punk" /> */}
      </TokenPricesContainer>
      <Chart />
    </Wrapper>
  );
};

export default Dashboard;
