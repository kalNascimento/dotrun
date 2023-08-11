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
`;