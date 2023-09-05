import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react-native'
import { theme } from '@theme/Theme'
import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react-native'

export {customRender as render}