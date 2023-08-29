import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AnchorButton } from '@buttons/AnchorButton';

import { auth } from '@configs/firebase';

import { HeaderView } from './styles';

import {
  LogoIcon,
  LogoutIcon,
  PersonIcon,
} from '@assets/icons';


export const LoggedHeader = () => {
  const navigation =  useNavigation<StackNavigationProp<ParamListBase>>()

  const logout = () => {
    auth.signOut();
    navigation.navigate('Auth' as never);
  }

  return (
    <HeaderView>
      <AnchorButton onPress={() => navigation.replace('Auth' as never)}>
        <PersonIcon width="24" height="24" />
      </AnchorButton>
      <LogoIcon width="48" />
      <AnchorButton onPress={logout}>
        <LogoutIcon width="24" height="24" />
      </AnchorButton>
    </HeaderView>
  )
}