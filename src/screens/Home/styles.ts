import styled from "styled-components/native";

export const ContainerView = styled.View`
background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 16px
`

export const ContainerButtonView = styled.View`
  flex: 2;
  gap: 16px;
  margin-top: 16px;
`
