import styled from "styled-components";
import Card from "../../../../components/Card";

export const Wrapper = styled(Card)`
  padding: 32px 40px 0 52px;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const MainTitle = styled.div`
  color: #002cfa;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 34px;
  margin-right: 54px;
`;

export const SubTitle = styled.div`
  color: #002cfa;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
