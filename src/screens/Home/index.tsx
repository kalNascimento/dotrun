import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import * as TaskManager from "expo-task-manager"

import { TotalDistance } from './TotalDistance';
import { RouteMapView } from './RouteMapView';
import { Timer } from './Timer';
import { CustomButton } from '../../components/buttons/CustomButton';
import { AnchorButton } from '../../components/buttons/AnchorButton';

import { ICoordinates } from './types';

import {
  ContainerButtonView,
  ContainerView,
  HeaderView
} from "./styles";

import {
  LogoIcon,
  LogoutIcon,
  PauseIcon,
  PersonIcon,
  PlayIcon,
  StopIcon
} from '../../../assets';

const LOCATION_TASK_NAME = "BACKGROUND_TRACKING"
const ACCURACY = Location.Accuracy.Highest;
const TIME_INTERVAL = 1000;
const DEFAULT_POSITION = 1;
const DISTANCE_INTERVAL = 2;

const Header = () => {
  const navigation = useNavigation();

  return (
    <HeaderView>
      <AnchorButton onPress={() => navigation.navigate('Auth' as never)}>
        <PersonIcon width="24" height="24" />
      </AnchorButton>
      <LogoIcon width="48" />
      <AnchorButton onPress={() => navigation.navigate('Auth' as never)}>
        <LogoutIcon width="24" height="24" />
      </AnchorButton>
    </HeaderView>
  )
}

export function Home() {
  const [positions, setPositions] = useState<ICoordinates[]>([{
    latitude: DEFAULT_POSITION,
    longitude: DEFAULT_POSITION
  }] as ICoordinates[]);
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates);
  const [isPositionUpdating, setIsPositionUpdating] = useState<boolean>(false);

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [resetStopTimer, setResetTimer] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();

      stopBackgroundUpdate();
    }
    requestPermissions()
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
      console.error(error);
      return;
    }
    if (data) {
      const { locations }: any = data;
      const location = locations[0];
      if (location) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        setIsPositionUpdating(true);
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
    setIsTimerStart(true);
    setResetTimer(false);

    if (background) {
      const { granted } = await Location.getBackgroundPermissionsAsync()
      if (!granted) {
        console.log("Acesso a localização negado")
        return
      }
    }

    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Tarefa em segundo plano não definida")
      return
    }

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      console.log("Rastreio em segundo plano já foi iniciado")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: ACCURACY,
      timeInterval: TIME_INTERVAL,
      distanceInterval: DISTANCE_INTERVAL,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Localização",
        notificationBody: "Rastreando localização em segundo plano",
        notificationColor: "#F1F1F1",
      },
    })
  }

  const stopBackgroundUpdate = async () => {
    
    setIsPositionUpdating(false);
    setIsTimerStart(false);

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      console.log("Rastreio em segundo plano foi desativado")
    }
  }

  return (
    <>
      <Header />
      <ContainerView>
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
            <CustomButton onPress={stopBackgroundUpdate} style={{ width: '42%' }}>
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
