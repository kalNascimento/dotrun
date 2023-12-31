import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager"

import { CustomButton } from '@buttons/CustomButton';
import { LoggedHeader } from 'src/components/LoggedHeader';

import { TotalDistance } from './TotalDistance';
import { RouteMapView } from './RouteMapView';
import { Timer } from './Timer';

import { ICoordinates } from './types';

import {
  ContainerButtonView,
  ContainerView
} from "./styles";

import {
  PauseIcon,
  PlayIcon,
  StopIcon
} from '@assets/icons';
import { AlertNotification } from 'src/components/AlertNotification';
import { theme } from '@theme/Theme';

const LOCATION_TASK_NAME = "BACKGROUND_TRACKING"
const ACCURACY = Location.Accuracy.Highest;
const TIME_INTERVAL = 5000;
const DISTANCE_INTERVAL = 5;
const DEFAULT_POSITION = 1;

export function Home() {
  const [positions, setPositions] = useState<ICoordinates[]>([{
    latitude: DEFAULT_POSITION,
    longitude: DEFAULT_POSITION
  }] as ICoordinates[]);
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates);
  const [isPositionUpdating, setIsPositionUpdating] = useState<boolean>(false);

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [resetStopTimer, setResetTimer] = useState(false);

  useEffect(() => {
    lastLocation();
  }, []);

  useEffect(() => {
    if (isPositionUpdating) {
      setPositions(prevPosition => [...prevPosition, {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }])
    }
  }, [coordinates])

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      AlertNotification(`Erro inesperado: ${error.code}`, error.message);
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

  const startBackgroundUpdate = async () => {
    const background = await Location.requestBackgroundPermissionsAsync()

    setPositions([]);
    setIsPositionUpdating(true);
    setIsTimerStart(true);
    setResetTimer(false);

    if (background) {
      const { granted } = await Location.getBackgroundPermissionsAsync()
      if (!granted) {
        AlertNotification('Permission Erro', "Acesso a localização negado");
        return
      }
    }

    const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      AlertNotification('Task error', "Tarefa em segundo plano não definida");
      return
    }

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      AlertNotification('Aviso', "Rastreio em segundo plano já foi iniciado");
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: ACCURACY,
      showsBackgroundLocationIndicator: true,
      deferredUpdatesDistance: DISTANCE_INTERVAL,
      deferredUpdatesTimeout: TIME_INTERVAL,
      pausesUpdatesAutomatically: false,
      foregroundService: {
        notificationTitle: "Localização",
        notificationBody: "Rastreando localização em segundo plano",
        notificationColor: theme.colors.primary.main,
      },
    })
  }

  const stopBackgroundUpdate = async () => {

    setIsPositionUpdating(false);
    setIsTimerStart(false);
    setPositions([]);
    setResetTimer(true);

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      AlertNotification('Aviso', "Rastreio em segundo plano foi desativado");
    }
  }

  const pauseBackgroundUpdate = async () => {
    setIsPositionUpdating(false);
    setIsTimerStart(false);

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      AlertNotification('Aviso', "Rastreio em segundo plano foi pausado")
    }
  }

  const lastLocation = async () => {
    const location = await Location.getLastKnownPositionAsync({});
    setCoordinates({
      latitude: location?.coords.latitude ?? DEFAULT_POSITION,
      longitude: location?.coords.longitude ?? DEFAULT_POSITION,
    });
  }

  return (
    <>
      <LoggedHeader />
      <ContainerView testID='home-screen'>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Timer isTimerStart={isTimerStart} resetTimer={resetStopTimer}></Timer>
          <TotalDistance positionHistory={positions} />
        </View>
        <RouteMapView coordinate={coordinates} positionHistory={positions} />
        <ContainerButtonView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomButton onPress={stopBackgroundUpdate} style={{ width: '42%' }}>
              <Text>Parar</Text>
              <StopIcon width="32" />
            </CustomButton>
            <CustomButton onPress={pauseBackgroundUpdate} style={{ width: '42%' }}>
              <Text>Pausar</Text>
              <PauseIcon width="32" />
            </CustomButton>
          </View>
          <CustomButton onPress={startBackgroundUpdate}>
            <Text>Iniciar</Text>
            <PlayIcon width="32" />
          </CustomButton>
        </ContainerButtonView>
      </ContainerView>
    </>
  );
}
