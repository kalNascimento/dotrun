import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components';

import { AppRoute } from './src/routes/AppRoute';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/common/config/client';

import { theme } from './src/theme/Theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AppRoute />
          </QueryClientProvider>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}
