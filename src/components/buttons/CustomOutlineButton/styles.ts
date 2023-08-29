import styled from "styled-components/native";

export const ButtonView = styled.View`
  background-color: transparent;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`

export const ButtonContentView = styled.View`
  align-items: center;
  padding: 12px 16px;
`