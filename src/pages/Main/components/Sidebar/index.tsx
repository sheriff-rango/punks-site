import React from "react";

import ConnectWalletButton from "./ConnectWalletButton";
import { Wrapper, Logo, Title, MenuItem } from "./styled";
import { HomeIcon } from "./SvgIcons";
import Menus from "./menus";
import { MenuType } from "./types";

const Sidebar: React.FC = () => {
  const handleClickMenuItem = (menuItem: MenuType) => {
    if (menuItem.link) {
      window.open(menuItem.link);
    }
  };

  return (
    <Wrapper>
      <Logo />
      <Title>
        <HomeIcon />
        Dashboard
      </Title>
      {Menus.map((menuItem: MenuType, index: number) => (
        <MenuItem onClick={() => handleClickMenuItem(menuItem)} key={index}>
          <menuItem.icon />
          {menuItem.title}
        </MenuItem>
      ))}
      <ConnectWalletButton />
    </Wrapper>
  );
};

export default Sidebar;
