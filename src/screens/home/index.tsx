import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import { TotalDistance } from './totalDistance';
import { RouteMapView } from "./routeMapView";
import { Timer } from './stopwatch';
import { CustomButton } from "../../components/buttons/customButton";
import { AnchorButton } from '../../components/buttons/anchorButton';

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
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()

      stopForegroundUpdate();
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

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      setErrorMsg("Permissão para rastrear de localização negada")
      return
    }
    setPositions([])

    setIsTimerStart(!isTimerStart);
    setResetTimer(false);

    foregroundSubscription?.remove()
    setIsPositionUpdating(true);
    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: TIME_INTERVAL,
        distanceInterval: DISTANCE_INTERVAL,
      },
      location => {
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      }
    )
  }

  const stopForegroundUpdate = async () => {
    setIsPositionUpdating(false);

    setIsTimerStart(false);

    foregroundSubscription?.remove()

    const location = await Location.getLastKnownPositionAsync({});
    setCoordinates({
      latitude: location?.coords.latitude ?? DEFAULT_POSITION,
      longitude: location?.coords.longitude ?? DEFAULT_POSITION,
    });
  }

  let foregroundSubscription: any = null

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
            <CustomButton onPress={stopForegroundUpdate} style={{ width: '42%' }}>
              <Text>Parar</Text>
              <StopIcon width="32" />
            </CustomButton>
            <CustomButton onPress={stopForegroundUpdate} style={{ width: '42%' }}>
              <Text>Pausar</Text>
              <PauseIcon width="32" />
            </CustomButton>
          </View>
          <CustomButton onPress={startForegroundUpdate}>
            <Text>Iniciar</Text>
            <PlayIcon width="32" />
          </CustomButton>
        </ContainerButtonView>
      </ContainerView>
    </>
  );
}
