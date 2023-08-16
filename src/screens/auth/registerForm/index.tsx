import { useForm, SubmitHandler } from "react-hook-form"

import { CustomTextInput } from '../../../components/inputs/customTextInput';
import { CustomOutlineButton } from '../../../components/buttons/customOutlineButton';

import { CustomPasswordInput } from '../../../components/inputs/customPasswordInput';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../common/config/firebase';

import {
  AuthEmailView,
  FormView,
  AuthInputContainerView,
  ContentText,
  MainView,
  LogoView,
} from './styles';
import { AnchorButton } from "../../../components/buttons/anchorButton";
import { KeyboardAvoidingView } from "react-native";
import { LogoIcon } from "../../../../assets";

interface IUser {
  email: string,
  password: string,
  confirmPassword: string
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
  } = useForm<IUser>();

  const navigation = useNavigation();

  const onSubmit: SubmitHandler<IUser> = (user) => {
    const isSamePassword = user.password === user.confirmPassword

    isSamePassword && createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        navigation.navigate('Login' as never)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
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
            <CustomOutlineButton onPress={handleSubmit(onSubmit)}>
              Cadastrar
            </CustomOutlineButton>
            <AnchorButton onPress={() => navigation.navigate('Login' as never)}>
              <ContentText>Não tem uma conta? Cadastre-se</ContentText>
            </AnchorButton>
          </AuthEmailView>
        </FormView>
      </KeyboardAvoidingView>
    </MainView>
  );
}
