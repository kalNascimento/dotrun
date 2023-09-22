import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react-native'
import { theme } from '@theme/Theme'
import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AllTheProviders({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
}

function WithNavigation({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RequestPermission">
            {() => children}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

const renderWithNavigation = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: WithNavigation, ...options })

export * from '@testing-library/react-native'

export { 
  customRender as render, 
  renderWithNavigation 
}