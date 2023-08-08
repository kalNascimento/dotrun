import styled from "styled-components/native";

export const ContainerView = styled.View`
  flex: 1;
`

export const ContainerButtonView = styled.View`
  flex: 2;
  gap: 16px;
  margin-top: 16px;
`

export const CustomMarker = styled.View`
  padding: 4px;
  border: .5px solid ${({ theme }) => theme.colors.gray};
`

export const CustomMarkerContent = styled.View`
  width: 8px;
  height: 8px;
  border: .5px solid ${({ theme }) => theme.colors.gray};
`