import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { SafeAreaView, StatusBar } from 'react-native';

import { AppRoute } from './src/routes/AppRoute';

import { theme } from './src/theme/Theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <AppRoute />
      </SafeAreaView>
    </ThemeProvider>
  );
}
