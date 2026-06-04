import { View } from 'react-native';

import { MapMarker as Marker } from 'react-native-maps/lib/MapMarker';
import { MapPolyline as Polyline } from 'react-native-maps/lib/MapPolyline';

import { CustomMarker, CustomMarkerContent } from './styles';
import { theme } from '@theme/Theme';

import type { RunCoordinate } from 'src/services/runTrackingStorage';

interface RouteMapViewProps {
  coordinate: RunCoordinate,
  positionHistory: RunCoordinate[]
}

export function RouteMarker({
  coordinate,
  positionHistory,
}: RouteMapViewProps) {

  return (
    <>
      <Marker
        testID="router-marker"
        coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}
      >
        <CustomMarker style={{ backgroundColor: theme.colors.white, borderRadius: 24 }}>
          <CustomMarkerContent style={{ backgroundColor: theme.colors.secondary, borderRadius: 24 }} />
        </CustomMarker>
      </Marker>
      <Polyline coordinates={positionHistory} strokeWidth={8} strokeColor="#5699FD" />
    </>
  )
}
