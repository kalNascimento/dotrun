import styled from "styled-components/native";

export const HeaderView = styled.View`
  background-color: ${({theme}) => theme.colors.primary.main};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`