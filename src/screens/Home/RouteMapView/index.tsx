import { Platform } from 'react-native';
import MapView from 'react-native-maps/lib/MapView';
import {
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE
} from 'react-native-maps/lib/ProviderConstants';

import { RouteMarker } from '../RouteMarker';

import { ContainerMap } from './styles';
import { theme } from '@theme/Theme';

import type { RunCoordinate } from 'src/services/runTrackingStorage';
import { isValidCoordinate } from 'src/utils/geo';

interface RouteMapViewProps {
  coordinate: Partial<RunCoordinate> | null;
  positionHistory: RunCoordinate[];
}

const DELTA = 0.002;

export function RouteMapView({
  coordinate,
  positionHistory,
}: RouteMapViewProps) {
  const hasValidCoordinate = isValidCoordinate(coordinate);
  const validCoordinate = coordinate as RunCoordinate;

  return (
    <ContainerMap style={theme.shadow} testID='route-map-view'>
      {hasValidCoordinate &&
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          style={{ height: '100%' }}
          region={{
            latitude: validCoordinate.latitude,
            longitude: validCoordinate.longitude,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          }}
          testID='map-view'>
          <RouteMarker
            coordinate={validCoordinate}
            positionHistory={positionHistory} />
        </MapView>
      }
    </ContainerMap>
  )
}
