import styled from "styled-components/native";

export const ButtonView = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  border-radius: 4px;
  padding: 2px;
`

export const ButtonContentView = styled.View`
  align-items: center;
  padding: 12px 16px;
`

export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
`