import styled from "styled-components/native";

export const ButtonView = styled.View`
  background-color: ${({ theme }) => theme.colors.primary.main};
  justify-content: center;
  border-radius: 4px;
`

export const ButtonContentView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
`
