import styled from "styled-components/native";

export const ButtonText = styled.Text`
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
`