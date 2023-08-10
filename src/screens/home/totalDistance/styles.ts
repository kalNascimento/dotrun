import styled from "styled-components/native";

export const DisplayView = styled.View`
  padding: 8px;
`

export const DisplayText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${({theme}) => theme.fontSize.md};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`