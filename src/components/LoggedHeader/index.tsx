import { AnchorButton } from '@buttons/AnchorButton';

import { logout } from 'src/utils/logout';

import { HeaderView } from './styles';

import {
  LogoIcon,
  LogoutIcon,
  PersonIcon,
} from '@assets/icons';


export const LoggedHeader = () => {

  return (
    <HeaderView>
      <AnchorButton navigateTo='Home'>
        <PersonIcon width="24" height="24" />
      </AnchorButton>
      <LogoIcon width="48" />
      <AnchorButton onPress={logout} navigateTo='Auth'>
        <LogoutIcon width="24" height="24" />
      </AnchorButton>
    </HeaderView>
  )
}