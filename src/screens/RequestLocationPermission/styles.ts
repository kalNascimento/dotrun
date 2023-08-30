import styled from "styled-components/native";

export const ContainerView = styled.View`
  background-color: ${({ theme }) => theme.colors.primary.main};
  flex: 1;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 96px 32px;
`

export const ExplanatoryText = styled.Text`
  color: ${({ theme }) => theme.fontColor.textLight};
  font-size: ${({ theme }) => theme.fontSize.md};
  width: 100%;
`

export const PermissionConsentText = styled.Text`
  color: ${({ theme }) => theme.fontColor.textLight};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  width: 100%;
  margin-bottom: 32px;
`