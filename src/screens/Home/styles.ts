import styled from "styled-components/native";

export const HeaderView = styled.View`
  background-color: ${({theme}) => theme.colors.primary.main};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`

export const ContainerView = styled.View`
  flex: 1;
  padding: 16px
`

export const ContainerButtonView = styled.View`
  flex: 2;
  gap: 16px;
  margin-top: 16px;
`
