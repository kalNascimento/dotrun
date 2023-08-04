import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { RouteMarker } from '../routerMarker';

interface ICoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface RouteMapViewProps {
  coordinate: ICoordinates;
  positions: any[];
}

export function RouteMapView({
  coordinate,
  positions,
}: RouteMapViewProps) {

  return (
    <>
      {coordinate.latitude &&
        <MapView
          style={{ alignSelf: 'stretch', height: '100%', flex: 5, ...styles.button }}
          region={coordinate}>
            <RouteMarker coordinate={coordinate} positions={positions}></RouteMarker>
        </MapView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 1,
    backgroundColor: '#DDDDDD'
  }
})