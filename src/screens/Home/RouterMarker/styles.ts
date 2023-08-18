import styled from "styled-components/native";

export const CustomMarker = styled.View`
  padding: 2px;
  border: .5px solid ${({ theme }) => theme.colors.gray};
`

export const CustomMarkerContent = styled.View`
  width: 8px;
  height: 8px;
  border: .5px solid ${({ theme }) => theme.colors.gray};
`