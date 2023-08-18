import MapView from 'react-native-maps';

import { RouteMarker } from '../RouterMarker';

import { ContainerMap } from './styles';
import { theme } from '../../../theme/Theme';

import { ICoordinates } from '../types';

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
    <ContainerMap style={theme.shadow}>
      {!isObjectEmpty &&
        <MapView
          style={{ height: '100%' }}
          region={{
            ...coordinate,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          }}>
          <RouteMarker
            coordinate={coordinate}
            positionHistory={positionHistory} />
        </MapView>
      }
    </ContainerMap>
  )
}