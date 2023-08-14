import { KeyboardAvoidingView } from 'react-native';
import { CustomTextInput } from '../../components/inputs/customTextInput';
import { OutlineActionButton } from '../../components/buttons/outlineActionButton';

import { useForm, SubmitHandler } from "react-hook-form"

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

import LogoIcon from '../../../assets/dotRUN.svg'
import FacebookIcon from '../../../assets/facebook_logo.svg'
import GoogleIcon from '../../../assets/google_group.svg'
import TwitterIcon from '../../../assets/twitter_group.svg'
import { CustomPasswordInput } from '../../components/inputs/customPasswordInput';

export function Auth() {
  const {
    control,
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
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
            <OutlineActionButton onPress={handleSubmit(onSubmit)}>
              Login
            </OutlineActionButton>
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
