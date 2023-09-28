import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components';

import { AppRoute } from './src/routes/AppRoute';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@configs/client';

import { theme } from '@theme/Theme';

import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager"
import { useEffect, useState } from 'react';
import { ICoordinates } from 'src/screens/Home/types';

const LOCATION_TASK_NAME = "BACKGROUND_TRACKING"
const ACCURACY = Location.Accuracy.BestForNavigation;
const TIME_INTERVAL = 1000;
const DISTANCE_INTERVAL = 1;

export default function App() {
  const [coordinates, setCoordinates] = useState<ICoordinates>({latitude: 1, longitude: 1} as ICoordinates);
  
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error)
      // AlertNotification(`Erro inesperado: ${error.code}`, error.message);
      return;
    }
    if (data) {
      const { locations }: any = data;
      const location = locations[0];
      if (location) {
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    }
  });

  // useEffect(() => {
  //   (async () => {
  //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  //       accuracy: ACCURACY,
  //       showsBackgroundLocationIndicator: true,
  //       deferredUpdatesDistance: DISTANCE_INTERVAL,
  //       deferredUpdatesTimeout: TIME_INTERVAL,
  //       pausesUpdatesAutomatically: false,
  //       foregroundService: {
  //         notificationTitle: "Localização",
  //         notificationBody: "Rastreando localização em segundo plano",
  //         notificationColor: theme.colors.primary.main,
  //       },
  //     })
  //   })();
  //   }, [])

    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <AppRoute coord={coordinates}/>
            </QueryClientProvider>
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
