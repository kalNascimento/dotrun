import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { LoginForm } from '../screens/Auth/LoginForm';
import { RegisterForm } from '../screens/Auth/RegisterForm';
import { RequestLocationPermission } from 'src/screens/RequestLocationPermission';
import { useAuthUser } from '@hooks/use-auth-user.hook';

import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoute() {
  const { user, initializing } = useAuthUser();

  if (initializing) {
    return null;
  }

  // As telas mudam conforme o estado de autenticação: ao entrar ou sair,
  // o React Navigation troca a pilha inteira, sem telas sobrando para trás.
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="RequestPermission" component={RequestLocationPermission} />
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Register" component={RegisterForm} />
        </>
      )}
    </Stack.Navigator>
  );
}
