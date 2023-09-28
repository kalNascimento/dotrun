import MapView from 'react-native-maps/lib/MapView';
import { 
  PROVIDER_DEFAULT, 
  PROVIDER_GOOGLE 
} from 'react-native-maps/lib/ProviderConstants';

import { MapPolyline as Polyline } from 'react-native-maps/lib/MapPolyline';

import { RouteMarker } from '../RouteMarker';

import { ContainerMap } from './styles';
import { theme } from '@theme/Theme';

import { ICoordinates } from '../types';
import { Platform } from 'react-native';

interface RouteMapViewProps {
  coordinate: ICoordinates;
  positionHistory: ICoordinates[];
}

const DELTA = 0.002;

export function RouteMapView({
  coordinate,
  positionHistory,
}: RouteMapViewProps) {
  const isObjectEmpty = Object.keys(coordinate).length == 0;

  return (
    <ContainerMap style={theme.shadow} testID='route-map-view'>
      {!isObjectEmpty &&
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          style={{ height: '100%' }}
          region={{
            ...coordinate,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          }}
          testID='map-view'>
          <RouteMarker
            coordinate={coordinate}
            positionHistory={positionHistory} />
        </MapView>
      }
    </ContainerMap>
  )
}