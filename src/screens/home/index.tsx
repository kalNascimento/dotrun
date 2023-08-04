import { useEffect, useState } from 'react';
import { View } from "react-native";

import * as Location from 'expo-location';
import { RouteMapView } from "./routeMapView";

import { ActionButton } from "../../components/actionButton";
import { ContainerView } from "./styles";

interface ICoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

let foregroundSubscription: any = null

export function Home() {
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates);
  const [position, setPosition] = useState([{ latitude: 1, longitude: 1 }])
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()

      const location = await Location.getLastKnownPositionAsync({});
      setCoordinates({
        latitude: location?.coords.latitude ?? 1,
        longitude: location?.coords.longitude ?? 1,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
    requestPermissions()
  }, [])

  const startForegroundUpdate = async () => {
    console.log('ok')
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      setErrorMsg("Permissão para rastrear de localização negada")
      return
    }
    setPosition([])

    foregroundSubscription?.remove()

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 0,
      },
      location => {
        setPosition(prevPosition => [...prevPosition, {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }])
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        })
      }
    )
  }

  const stopForegroundUpdate = async () => {
    foregroundSubscription?.remove()
    const location = await Location.getLastKnownPositionAsync({});
    setCoordinates({
      latitude: location?.coords.latitude ?? 1,
      longitude: location?.coords.longitude ?? 1,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }

  return (
    <ContainerView>
      <RouteMapView coordinate={coordinates} positions={position} />
      <View style={{ flex: 2, gap: 16, marginTop: 16 }}>
        <ActionButton onPress={startForegroundUpdate}>
          Iniciar
        </ActionButton>
        <ActionButton onPress={stopForegroundUpdate}>
          Parar
        </ActionButton>
      </View>
    </ContainerView>
  );
}
