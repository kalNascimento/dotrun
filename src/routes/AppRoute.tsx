import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Auth } from '../screens/Auth';
import { RequestLocationPermission } from 'src/screens/RequestLocationPermission';

const Stack = createStackNavigator();

export function AppRoute({coord}: any) {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="RequestPermission" component={RequestLocationPermission} />
      <Stack.Screen name="Home">
        {() => <Home coord={coord}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
