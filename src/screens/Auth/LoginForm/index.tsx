import { KeyboardAvoidingView, View } from "react-native";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

import { CustomTextInput } from "@inputs/CustomTextInput";
import { CustomPasswordInput } from "@inputs/CustomPasswordInput";
import { CustomOutlineButton } from "@buttons/CustomOutlineButton";
import { AnchorButton } from "@buttons/AnchorButton";

import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@configs/firebase';

import {
  MainView,
  LogoView,
  AuthEmailView,
  AuthSocialView,
  FormView,
  AuthInputContainerView,
  AuthSocialContainerView,
  ContentText,
  ErrorText,
} from './styles';

import {
  FacebookIcon,
  GoogleIcon,
  LogoIcon,
  TwitterIcon
} from '@assets/icons';

import { IUser } from "../types";

export function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { control, handleSubmit } = useForm<IUser>();
  
  const navigation = useNavigation();

  useEffect(() => {
    const userState = auth.onAuthStateChanged((user) => {
      user && navigation.navigate('RequestPermission' as never)
    })
    return userState;
  }, [])
  
  const onSubmit: SubmitHandler<IUser> = async (user: IUser) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        navigation.navigate('RequestPermission' as never)
      })
      .catch((error) => {
        error.code && setErrorMsg('Usuário e/ou senha incorretos, tente novamente')
      });
  };

  const emailRules = {
    required: 'Este campo é obrigatório',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Endereço de email inválido'
    }
  };

  return (
    <MainView contentContainerStyle={{ flexGrow: 1, paddingTop: 32 }} testID="login-form">
      <LogoView>
        <LogoIcon width="128" height="128" />
      </LogoView>
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <FormView testID="form-view">
          <AuthEmailView>
            <AuthInputContainerView>
              <CustomTextInput
                control={control}
                label='E-mail'
                placeholder='exemplo@exemplo.com.br'
                name='email'
                rules={emailRules}
              />

              <CustomPasswordInput
                control={control}
                label="Senha"
                placeholder='••••••••'
                name="password"
              />
            </AuthInputContainerView>
            <View>
              <CustomOutlineButton onPress={handleSubmit(onSubmit)}>
                Login
              </CustomOutlineButton>
              <ErrorText>{errorMsg}</ErrorText>
            </View>
          </AuthEmailView>
          <AuthSocialView>
            <ContentText>OU</ContentText>
            <AuthSocialContainerView>
              <FacebookIcon width="48" height="48" />
              <GoogleIcon width="48" height="48" />
              <TwitterIcon width="48" height="48" />
            </AuthSocialContainerView>
            <AnchorButton navigateTo="Register">
              <ContentText>Não tem uma conta? Cadastre-se</ContentText>
            </AnchorButton>
          </AuthSocialView>
        </FormView>
      </KeyboardAvoidingView>
    </MainView>
  );
}
