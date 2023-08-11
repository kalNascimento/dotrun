import { Text, View } from 'react-native';
import { AuthEmailView, AuthSocialView, FormView, LogoView, MainView, AuthInputContainerView, AuthSocialContainerView, ContentText } from './styles';
import { theme } from '../../theme/Theme';
import { CustomTextInput } from '../../components/inputs/customTextInput';
import { ActionButton } from '../../components/buttons/actionButton';
import { OutlineActionButton } from '../../components/buttons/outlineActionButton';

import LogoIcon from '../../../assets/dotRUN.svg'
import FacebookIcon from '../../../assets/facebook_logo.svg'
import GoogleIcon from '../../../assets/google_group.svg'
import TwitterIcon from '../../../assets/twitter_group.svg'
import { CustomPasswordInput } from '../../components/inputs/customPasswordInput';

export function Auth() {

  return (
    <MainView>
      <LogoView>
        <LogoIcon width="128" height="128"/>
      </LogoView>
      <FormView>
        <AuthEmailView>
          <AuthInputContainerView>
            <CustomTextInput label='E-mail'></CustomTextInput>
            <CustomPasswordInput label='Senha'></CustomPasswordInput>
          </AuthInputContainerView>
          <OutlineActionButton onPress={() => console.log('ok')}>
            Login
          </OutlineActionButton>
        </AuthEmailView>
        <AuthSocialView>
          <ContentText>OU</ContentText>
          <AuthSocialContainerView>
            <FacebookIcon width="48" height="48"/>
            <GoogleIcon width="48" height="48"/>
            <TwitterIcon width="48" height="48"/>
          </AuthSocialContainerView>
          <ContentText>Não tem uma conta? Cadastre-se</ContentText>
        </AuthSocialView>
      </FormView>
    </MainView>
  );
}
