import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react-native'
import { theme } from '@theme/Theme'
import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type { RootStackParamList } from 'src/routes/types';

const Stack = createStackNavigator<RootStackParamList>();

function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
}

function withNavigation(ui: ReactElement) {
  return function WithNavigation({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {() => children}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  };
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

const renderWithNavigation = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: withNavigation(ui), ...options })

export * from '@testing-library/react-native'

export {
  customRender as render,
  renderWithNavigation
}
