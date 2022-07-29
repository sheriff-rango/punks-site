import React, { useState, useEffect } from "react";

import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
import ConnectWalletButton from "./ConnectWalletButton";
import {
  Wrapper,
  MenuContainer,
  WrapperBackground,
  Logo,
  MenuItem,
  SocialIcons,
  StyledSocialIconSvg,
  StyledBarIcon as BarIcon,
  SidebarFooter,
} from "./styled";
import Menus from "./menus";
import { MenuType } from "./types";
import { useAppSelector } from "../../../../app/hooks";

const TwitterIcon = ({ ...props }) => (
  <StyledSocialIconSvg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="22" height="22" rx="11" fill="#4066AC" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.99414 15.0159C5.94306 15.0657 6.84204 14.941 7.71605 14.5419C8.11559 14.3673 8.4652 14.1678 8.8148 13.8934C8.41525 13.8685 8.04068 13.7936 7.69108 13.619C7.11673 13.3197 6.69221 12.8458 6.44249 12.2471C6.39255 12.0975 6.39255 12.0975 6.54238 12.1224C6.9669 12.1474 7.26656 12.1474 7.4913 12.0476C7.26656 11.9728 7.04181 11.9229 6.86701 11.7982C5.99301 11.3242 5.54352 10.5759 5.4686 9.57821C5.4686 9.45349 5.49357 9.45349 5.59346 9.50338C5.89312 9.67798 6.24272 9.75281 6.6173 9.77775C6.44249 9.62809 6.31764 9.50338 6.16781 9.37866C5.44363 8.60542 5.26883 7.3832 5.76826 6.43535C5.84318 6.31063 5.86815 6.31063 5.94306 6.41041C7.16667 7.80723 8.66497 8.65531 10.4879 8.95463C10.6627 8.97957 10.8874 9.00451 11.0622 9.02946C11.1871 9.0544 11.2121 9.00451 11.1871 8.87979C10.9873 7.78229 11.5117 6.70973 12.4856 6.16097C13.4845 5.58728 14.758 5.76188 15.5571 6.53512C15.657 6.60995 15.7319 6.6349 15.8318 6.60995C16.3313 6.51018 16.7807 6.31063 17.2053 6.08614C17.2302 6.08614 17.2802 6.0612 17.3052 6.01131C17.1304 6.6349 16.7558 7.08388 16.2064 7.45803C16.7058 7.40814 17.1553 7.25848 17.6048 7.08388C17.6048 7.15871 17.5798 7.18365 17.5299 7.23354C17.2302 7.65757 16.8806 8.03172 16.4561 8.33104C16.3812 8.40587 16.3562 8.43082 16.3562 8.55553C16.3812 10.4512 15.7819 12.1474 14.5583 13.644C13.4595 14.966 11.9862 15.7891 10.2382 16.0635C8.39028 16.3378 6.64227 16.0385 5.04408 15.0408C5.04408 15.0408 5.01911 15.0159 4.99414 15.0159Z"
      fill="white"
    />
  </StyledSocialIconSvg>
);

const DiscordIcon = ({ ...props }) => (
  <StyledSocialIconSvg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="22" height="22" rx="11" fill="#4066AC" />
    <path
      d="M14.0135 15.8219C13.7624 15.4703 13.5363 15.0936 13.3354 14.7168C13.3605 14.7168 13.3605 14.6917 13.3605 14.6917C13.5866 14.5913 13.8377 14.4908 14.0637 14.3652C14.1642 14.315 14.2646 14.2397 14.3651 14.1894C14.3651 14.1894 14.3651 14.1894 14.3902 14.1643L14.3651 14.1392C14.2898 14.089 14.2395 14.0388 14.1642 13.9885C14.1391 13.9634 14.114 13.9634 14.114 13.9885C13.913 14.089 13.687 14.1643 13.4861 14.2648C13.1345 14.3904 12.7829 14.4908 12.4062 14.5662C12.1802 14.6164 11.9792 14.6415 11.7532 14.6666C11.6025 14.6917 11.4267 14.6917 11.2761 14.6917C11.1505 14.6917 11.0249 14.6917 10.8742 14.6917C10.7235 14.6917 10.5729 14.6917 10.4222 14.6666C10.2213 14.6415 10.0455 14.6164 9.84454 14.5913C9.64363 14.5662 9.4176 14.5159 9.21669 14.4657C8.81486 14.3652 8.43815 14.2397 8.06144 14.0639C7.9861 14.0388 7.93587 14.0136 7.86053 13.9885C7.83541 13.9885 7.83541 13.9885 7.8103 13.9885C7.73496 14.0388 7.65961 14.1141 7.58427 14.1643C7.58427 14.1643 7.58427 14.1894 7.60938 14.1894C7.83541 14.315 8.06144 14.4406 8.31258 14.5662C8.41304 14.6164 8.51349 14.6415 8.61395 14.6917C8.61395 14.6917 8.63907 14.6917 8.63907 14.7168C8.61395 14.8424 8.11167 15.6461 7.96098 15.8219C7.93587 15.8219 7.91075 15.7967 7.88564 15.7967C7.53404 15.6963 7.20756 15.5707 6.88107 15.42C6.65505 15.3196 6.45413 15.2191 6.22811 15.1187C5.85139 14.9178 5.47468 14.6917 5.09797 14.4406C5.02263 14.3904 4.92217 14.315 4.84683 14.2648C4.82171 14.2397 4.82171 14.2397 4.7966 14.1894C4.7966 14.0639 4.77148 13.9383 4.77148 13.8378C4.77148 13.4862 4.77148 13.1598 4.77148 12.8333C4.77148 12.6575 4.7966 12.4566 4.7966 12.2808C4.7966 12.1301 4.82171 11.9794 4.84683 11.8287C4.87194 11.6529 4.89706 11.4771 4.92217 11.3013C4.9724 10.9748 5.04774 10.6735 5.12308 10.347C5.22354 10.0205 5.324 9.6689 5.44957 9.34241C5.60025 8.9657 5.75094 8.58899 5.95185 8.23739C6.15276 7.86068 6.37879 7.45885 6.60482 7.10725C6.62993 7.08214 6.62993 7.05702 6.65505 7.03191C6.68016 7.00679 6.70527 6.98168 6.73039 6.98168C6.9313 6.90634 7.13222 6.80588 7.33313 6.73054C7.6345 6.60497 7.93587 6.50451 8.23724 6.42917C8.53861 6.32871 8.86509 6.27848 9.19158 6.20314C9.29203 6.17803 9.26692 6.17803 9.31715 6.25337C9.4176 6.42917 9.51806 6.63008 9.5934 6.831C9.61852 6.88122 9.61852 6.88122 9.66875 6.88122C9.81943 6.85611 9.945 6.85611 10.0957 6.831C10.2464 6.80588 10.3719 6.80588 10.5226 6.80588C10.7487 6.80588 10.9747 6.80588 11.1756 6.80588C11.3012 6.80588 11.4016 6.80588 11.5272 6.80588C11.6276 6.80588 11.7281 6.831 11.8537 6.831C11.9541 6.831 12.0546 6.85611 12.155 6.85611C12.2304 6.85611 12.3308 6.88122 12.4062 6.88122C12.4564 6.88122 12.4564 6.88122 12.4815 6.831C12.5569 6.63008 12.6573 6.42917 12.7578 6.22826C12.7829 6.17803 12.7829 6.17803 12.8331 6.20314C13.2601 6.27848 13.687 6.37894 14.0888 6.50451C14.4404 6.60497 14.7669 6.73054 15.0934 6.88122C15.1687 6.90634 15.2441 6.95657 15.3194 6.98168C15.3445 6.98168 15.3697 7.00679 15.3697 7.03191C15.4952 7.20771 15.5957 7.40862 15.7213 7.58442C15.8971 7.88579 16.0729 8.21227 16.2235 8.53876C16.4245 8.9657 16.6003 9.41775 16.7509 9.86981C16.8765 10.2716 16.977 10.6735 17.0523 11.0753C17.1025 11.3013 17.1277 11.5525 17.1528 11.7785C17.1779 11.9543 17.1779 12.105 17.203 12.2808C17.203 12.3812 17.2281 12.4817 17.2281 12.6073C17.2281 12.7077 17.2281 12.8333 17.2281 12.9337C17.2281 13.0091 17.2281 13.0844 17.2281 13.1598C17.2281 13.2853 17.2281 13.436 17.2281 13.5616C17.2281 13.662 17.2281 13.7625 17.203 13.8881C17.203 13.9885 17.1779 14.089 17.1779 14.1894C17.1779 14.2146 17.1528 14.2397 17.1276 14.2648C17.0021 14.3401 16.9016 14.4406 16.7761 14.5159C16.4747 14.7168 16.1733 14.9178 15.8468 15.0684C15.671 15.1438 15.5203 15.2442 15.3445 15.3196C15.0432 15.4703 14.7167 15.5958 14.4153 15.6963C14.3149 15.7214 14.1893 15.7716 14.0888 15.7967C14.0637 15.7967 14.0386 15.8219 14.0135 15.8219ZM10.0455 11.4771C10.0455 11.3264 10.0203 11.1757 9.99523 11.0502C9.89477 10.7237 9.69386 10.4474 9.36737 10.2967C9.11623 10.1712 8.89021 10.1712 8.61395 10.2465C8.31258 10.347 8.11167 10.5228 7.96098 10.799C7.83541 11.0502 7.76007 11.3264 7.78518 11.6027C7.8103 11.8538 7.88564 12.0799 8.03632 12.2808C8.13678 12.4315 8.28747 12.557 8.43815 12.6575C8.58884 12.7328 8.76464 12.7831 8.96555 12.7579C9.11623 12.7579 9.26692 12.7077 9.4176 12.6324C9.51806 12.5821 9.61852 12.4817 9.69386 12.4063C9.7692 12.331 9.84454 12.2305 9.89477 12.105C9.99523 11.9041 10.0455 11.678 10.0455 11.4771ZM11.929 11.4771C11.929 11.6529 11.9541 11.8287 12.0295 11.9794C12.1299 12.2305 12.3057 12.4566 12.5318 12.5821C12.7327 12.7077 12.9336 12.7579 13.1596 12.7328C13.3856 12.7077 13.5866 12.6073 13.7624 12.4315C14.0135 12.1803 14.1391 11.8538 14.1642 11.5022C14.1642 11.3264 14.1391 11.1255 14.0888 10.9497C13.9884 10.6735 13.8126 10.4725 13.5614 10.3219C13.2852 10.1712 12.9838 10.1461 12.6824 10.2465C12.4062 10.347 12.2304 10.5479 12.0797 10.799C11.9792 11.0251 11.929 11.2511 11.929 11.4771Z"
      fill="white"
    />
  </StyledSocialIconSvg>
);

const Sidebar: React.FC = () => {
  // const [selectedMenuItem, setSelectedMenuItem] = useState<string>(Menus[0].id);
  const { isXs, isSm, isMd, isLg } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd || isLg;
  const [expanded, setExpanded] = useState(isMobile);
  const selectedMenuItem = useAppSelector(
    (state) => state.elementViewState.target
  );

  useEffect(() => {
    setExpanded(isMobile);
  }, [isMobile]);

  const handleClickMenuItem = (menuItem: MenuType) => {
    if (menuItem.link) {
      window.open(menuItem.link);
    } else {
      const targetElement = document.getElementById(menuItem.id);
      targetElement?.scrollIntoView({
        behavior: "smooth",
      });
      setExpanded(false);
      // setSelectedMenuItem(menuItem.id);
    }
  };

  return (
    <>
      {isMobile && !expanded && (
        <BarIcon onClick={() => setExpanded((prev) => !prev)} />
      )}
      {isMobile && expanded && (
        <WrapperBackground
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(false);
          }}
        />
      )}
      <Wrapper isMobile={isMobile} expanded={!isMobile || expanded}>
        <MenuContainer>
          <Logo />
          {Menus.map((menuItem: MenuType, index: number) => (
            <MenuItem
              selected={selectedMenuItem === menuItem.id}
              onClick={() => handleClickMenuItem(menuItem)}
              key={index}
            >
              <menuItem.icon />
              {menuItem.title}
            </MenuItem>
          ))}
          <SocialIcons>
            <TwitterIcon
              onClick={() => window.open("https://twitter.com/JunoPunksNFT")}
            />
            <DiscordIcon
              onClick={() => window.open("https://discord.gg/BfKPacc5jF")}
            />
          </SocialIcons>
          <ConnectWalletButton />
          <SidebarFooter>
            Made with 💚 in collaboration with Hopers.io Team!
          </SidebarFooter>
        </MenuContainer>
      </Wrapper>
    </>
  );
};

export default Sidebar;
