import styled from "styled-components/native";

export const MainView = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  flex: 1;
  padding: 16px 0;
`

export const LogoView = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`

export const FormView = styled.View`
  flex: 6;
  gap: 32px;
  padding: 16px;
`

export const AuthEmailView = styled.View`
  flex: 4;
  justify-content: space-between;
`

export const AuthInputContainerView = styled.View`
  gap: 16px;
`

export const AuthSocialView = styled.View`
  flex: 3;
  gap: 32px;
  align-items: center;
  padding: 16px;
`

export const AuthSocialContainerView = styled.View`
  flex-direction: row;
  gap: 32px;
`

export const ContentText = styled.Text`
  color: ${({theme}) => theme.fontColor.textLight};
  font-size: ${({theme}) => theme.fontSize.sm};
`

export const Input = styled.TextInput`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 15px;
`