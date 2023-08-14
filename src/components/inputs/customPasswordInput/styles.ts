import styled from "styled-components/native";

export const LabelText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.fontColor.textLight};
  margin-bottom: 4px;
`

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid red;
`

export const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({theme}) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.white};
  margin: 4px 8px;
`