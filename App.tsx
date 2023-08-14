import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './src/screens/home';
import { Auth } from './src/screens/auth';

import { theme } from './src/theme/Theme';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}
