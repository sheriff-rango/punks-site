import styled from "styled-components";

export const Wrapper = styled.div`
  width: 315px;
  padding-top: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.div`
  background: url("./images/Juno-Punks-logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 51px;
`;

export const StyledSvg = styled.svg`
  /* position: absolute;
  left: 27px; */
  margin-right: 19px;
`;

export const SidebarItem = styled.div`
  width: 207px;
  height: 64px;
  position: relative;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  user-select: none;
  padding-left: 27px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled(SidebarItem)`
  background-color: #4062ff;
  border-radius: 16px;
  color: white;
  margin-top: 52px;
  cursor: default;
`;

export const MenuItem = styled(SidebarItem)`
  color: #b8bed9;
  cursor: pointer;
  margin-top: 17px;
`;

export const ConnectWallet = styled(SidebarItem)<{ connected?: boolean }>`
  margin-top: 117px;
  color: ${({ connected }) => (connected ? "#FF4842" : "#002dff")};
  cursor: pointer;
`;
