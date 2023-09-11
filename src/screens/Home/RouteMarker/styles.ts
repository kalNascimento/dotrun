import styled from "styled-components/native";

export const CustomMarker = styled.View`
  padding: 4px;
  border: .5px solid ${({ theme }) => theme.colors.gray};
`

export const CustomMarkerContent = styled.View`
  width: 8px;
  height: 8px;
  border: .5px solid ${({ theme }) => theme.colors.gray};
`