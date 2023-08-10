import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import { RouteMapView } from "./routeMapView";

import { ActionButton } from "../../components/actionButton";

import { ContainerButtonView, ContainerView } from "./styles";

import { ICoordinates } from './types';
import { TotalDistance } from './totalDistance';
import { View } from 'react-native';

const TIME_INTERVAL = 1000;
const DEFAULT_POSITION = 1;
const DISTANCE_INTERVAL = 2;

export function Home() {
  const [positions, setPositions] = useState<ICoordinates[]>([{
    latitude: DEFAULT_POSITION,
    longitude: DEFAULT_POSITION
  }] as ICoordinates[]);
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates);
  const [isPositionUpdating, setIsPositionUpdating] = useState<boolean>(false);
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
    foregroundSubscription?.remove()

    const location = await Location.getLastKnownPositionAsync({});
    setCoordinates({
      latitude: location?.coords.latitude ?? DEFAULT_POSITION,
      longitude: location?.coords.longitude ?? DEFAULT_POSITION,
    });
  }

  let foregroundSubscription: any = null

  return (
    <ContainerView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TotalDistance positionHistory={positions} />
      </View>

      <RouteMapView coordinate={coordinates} positionHistory={positions} />
      <ContainerButtonView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ActionButton onPress={stopForegroundUpdate} style={{width: '42%'}}>
            Parar
          </ActionButton>
          <ActionButton onPress={stopForegroundUpdate} style={{width: '42%'}}>
            Pausar
          </ActionButton>
        </View>
        <ActionButton onPress={startForegroundUpdate}>
          Iniciar
        </ActionButton>
      </ContainerButtonView>
    </ContainerView>
  );
}
