import 'react-native-gesture-handler';
import { BodyTemplate } from './src/components/bodyTemplate';
import { Home } from './src/screens/home';
import { View, StyleSheet } from 'react-native';

import PersonIcon from './assets/person.svg'
import LogoIcon from './assets/dotRUN.svg'
import MenuIcon from './assets/menu.svg'
import { Auth } from './src/screens/auth';

const header = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <PersonIcon width="24" />
      <LogoIcon width="48" />
      <MenuIcon width="24" />
    </View>
  )
}

export default function App() {
  return (
    <BodyTemplate>
      <Auth></Auth>
    </BodyTemplate>
  );
}
