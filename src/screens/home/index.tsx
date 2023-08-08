import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import { RouteMapView } from "./routeMapView";

import { ActionButton } from "../../components/actionButton";

import { ContainerButtonView, ContainerView } from "./styles";

import { ICoordinates } from './types';


const TIME_INTERVAL = 5000;
const DEFAULT_POSITION = 1;
const DISTANCE_INTERVAL = 0;

let foregroundSubscription: any = null

export function Home() {
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates);
  const [positions, setPositions] = useState<ICoordinates[]>([{
      latitude: DEFAULT_POSITION,
      longitude: DEFAULT_POSITION
    }] as ICoordinates[]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()

      stopForegroundUpdate();
    }
    requestPermissions()
  }, [])

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      setErrorMsg("Permissão para rastrear de localização negada")
      return
    }
    setPositions([])

    foregroundSubscription?.remove()

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: TIME_INTERVAL,
        distanceInterval: DISTANCE_INTERVAL,
      },
      location => {
        setPositions(prevPosition => [...prevPosition, {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }])
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      }
    )
  }

  const stopForegroundUpdate = async () => {
    foregroundSubscription?.remove()
    const location = await Location.getLastKnownPositionAsync({});
    setCoordinates({
      latitude: location?.coords.latitude ?? DEFAULT_POSITION,
      longitude: location?.coords.longitude ?? DEFAULT_POSITION,
    });
  }

  return (
    <ContainerView>
      <RouteMapView coordinate={coordinates} positionHistory={positions} />
      <ContainerButtonView>
        <ActionButton onPress={startForegroundUpdate}>
          Iniciar
        </ActionButton>
        <ActionButton onPress={stopForegroundUpdate}>
          Parar
        </ActionButton>
      </ContainerButtonView>
    </ContainerView>
  );
}
