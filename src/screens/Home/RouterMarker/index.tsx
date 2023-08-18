import { View } from 'react-native';
import { Marker, Polyline } from 'react-native-maps';

import { CustomMarker, CustomMarkerContent } from '../styles';
import { theme } from '../../../theme/Theme';

import { ICoordinates } from '../types';

interface RouteMapViewProps {
  coordinate: ICoordinates,
  positionHistory: ICoordinates[]
}

export function RouteMarker({
  coordinate,
  positionHistory,
}: RouteMapViewProps) {

  return (
    <View>
      <Marker coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}>
        <CustomMarker style={{ backgroundColor: theme.colors.white, borderRadius: 24 }}>
          <CustomMarkerContent style={{ backgroundColor: theme.colors.secondary, borderRadius: 24 }} />
        </CustomMarker>
      </Marker>
      <Polyline coordinates={positionHistory} strokeWidth={8} strokeColor="#5699FD" />
    </View>
  )
}
