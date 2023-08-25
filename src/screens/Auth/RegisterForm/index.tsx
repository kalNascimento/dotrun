import { KeyboardAvoidingView, View } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react";

import { CustomTextInput } from "@inputs/CustomTextInput";
import { CustomPasswordInput } from "@inputs/CustomPasswordInput";
import { CustomOutlineButton } from "@buttons/CustomOutlineButton";
import { AnchorButton } from "@buttons/AnchorButton";

import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@configs/firebase';

import {
  AuthEmailView,
  FormView,
  AuthInputContainerView,
  ContentText,
  MainView,
  LogoView,
  ErrorText,
} from './styles';

import { LogoIcon } from "@assets/icons";

import { IUser } from "../types";

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSamePassword, setIsSamePassword] = useState<boolean>();
  const { control, handleSubmit } = useForm<IUser>();

  const navigation = useNavigation();

  const onSubmit: SubmitHandler<IUser> = (user) => {
    const test = user.password === user.confirmPassword
    setIsSamePassword(test)

    isSamePassword && createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        navigation.navigate('Login' as never)
      })
      .catch((error) => {
        error.code && setErrorMsg('Não foi possível cadastrar um usuário com esses dados')
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
    <MainView contentContainerStyle={{ flexGrow: 1, paddingTop: 32 }}>
      <LogoView>
        <LogoIcon width="128" height="128" />
      </LogoView>
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <FormView>
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

              <CustomPasswordInput
                control={control}
                label="Confirme a senha"
                placeholder='••••••••'
                name="confirmPassword"
              />
            </AuthInputContainerView>
            <View>
              <CustomOutlineButton onPress={handleSubmit(onSubmit)}>
                Cadastrar
              </CustomOutlineButton>
              {!!errorMsg &&
                <ErrorText>{errorMsg}</ErrorText>
              }
              {isSamePassword == false &&
                <ErrorText>Senha e confirmar senha precisam ser iguais</ErrorText>
              }
            </View>
            <AnchorButton onPress={() => navigation.navigate('Login' as never)}>
              <ContentText>Não tem uma conta? Cadastre-se</ContentText>
            </AnchorButton>
          </AuthEmailView>
        </FormView>
      </KeyboardAvoidingView>
    </MainView>
  );
}
