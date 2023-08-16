import styled from "styled-components/native";

export const MainView = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.primary};
  flex: 1;
  padding: 16px 0;
`

export const LogoView = styled.View`
  justify-content: center;
  align-items: center;
  height: 144px;
`

export const FormView = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  flex: 6;
  gap: 32px;
  padding: 16px;
`

export const AuthEmailView = styled.View`
  flex: 4;
  gap: 32px;
`

export const AuthInputContainerView = styled.View`
  gap: 16px;
`

export const AuthSocialView = styled.View`
  flex: 3;
  align-items: center;
  gap: 32px;
  padding: 16px;
`

export const AuthSocialContainerView = styled.View`
  flex-direction: row;
  gap: 32px;
`

export const ContentText = styled.Text`
  color: ${({theme}) => theme.fontColor.textLight};
  font-size: ${({theme}) => theme.fontSize.sm};
  text-align: center;
`
