import { KeyboardAvoidingView } from 'react-native';
import { useForm, SubmitHandler } from "react-hook-form"

import { CustomTextInput } from '../../components/inputs/customTextInput';
import { CustomOutlineButton } from '../../components/buttons/customOutlineButton';

import { CustomPasswordInput } from '../../components/inputs/customPasswordInput';
import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../../common/config/firebase';

import {
  AuthEmailView,
  AuthSocialView,
  FormView,
  LogoView,
  MainView,
  AuthInputContainerView,
  AuthSocialContainerView,
  ContentText,
} from './styles';

import { 
  FacebookIcon, 
  GoogleIcon, 
  LogoIcon, 
  TwitterIcon 
} from '../../../assets';

interface IUser {
  email: string,
  password: string
}

export function Auth() {
  const {
    control,
    handleSubmit,
  } = useForm<IUser>();

  const navigation = useNavigation();

  const onSubmit: SubmitHandler<IUser> = (user) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        navigation.navigate('Home' as never)
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
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <LogoView>
          <LogoIcon width="128" height="128" />
        </LogoView>
        <FormView>
          <AuthEmailView>
            <AuthInputContainerView>
              <CustomTextInput
                control={control}
                label='E-mail'
                placeholder='exeplo@exeplo.com.br'
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
            <CustomOutlineButton onPress={handleSubmit(onSubmit)}>
              Login
            </CustomOutlineButton>
          </AuthEmailView>
          <AuthSocialView>
            <ContentText>OU</ContentText>
            <AuthSocialContainerView>
              <FacebookIcon width="48" height="48" />
              <GoogleIcon width="48" height="48" />
              <TwitterIcon width="48" height="48" />
            </AuthSocialContainerView>
            <ContentText>Não tem uma conta? Cadastre-se</ContentText>
          </AuthSocialView>
        </FormView>
      </KeyboardAvoidingView>
    </MainView>
  );
}
