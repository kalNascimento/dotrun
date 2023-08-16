import styled from "styled-components/native";

export const DisplayText = styled.Text`
  color: ${({theme}) => theme.colors.primary.main};
  font-size: ${({theme}) => theme.fontSize.md};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`