import {
  CoincilIcon,
  DaoIcon,
  NftIcon,
  PaperIcon,
  TokenIcon,
} from "./SvgIcons";
import { MenuType } from "./types";

const Menus: MenuType[] = [
  {
    title: "$Punk Token",
    icon: TokenIcon,
  },
  {
    title: "Punk NFT",
    icon: NftIcon,
  },
  {
    title: "DAO",
    icon: DaoIcon,
    link: "https://v1.daodao.zone/dao/juno1xl6cnw8j8gpfyk9lchulxjym83kvlznv8farsnnlwrf2sh5m5sgs9stqn6",
  },
  {
    title: "Punks Coincil",
    icon: CoincilIcon,
  },
  {
    title: "Punks Paper",
    icon: PaperIcon,
    link: "https://docs.google.com/document/d/1dNmjcDIkfpTRTriz-V9xtXY1AVmjwmmst67asc79rpk",
  },
];

export default Menus;
