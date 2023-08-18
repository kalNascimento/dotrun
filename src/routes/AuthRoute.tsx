import { createStackNavigator } from '@react-navigation/stack';

import { LoginForm } from '../screens/Auth/LoginForm';
import { RegisterForm } from '../screens/Auth/RegisterForm';

const Stack = createStackNavigator();

export function AuthRoute() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterForm} />
    </Stack.Navigator>
  )
}