import { Marker, Polyline } from 'react-native-maps';

import { CustomMarker, CustomMarkerContent } from '../styles';

interface ICoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface RouteMapViewProps {
  coordinate: ICoordinates,
  positions: any[]
}

export function RouteMarker({
  coordinate,
  positions,
}: RouteMapViewProps) {

  return (
    <>
      <Marker coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}>
        <CustomMarker style={{ backgroundColor: '#FFF', borderRadius: 24 }}>
          <CustomMarkerContent style={{ backgroundColor: '#3482F8', borderRadius: 24 }}>
          </CustomMarkerContent>
        </CustomMarker>
      </Marker>
      <Polyline coordinates={positions} strokeWidth={8} strokeColor="#5699FD" />
    </>
  )
}
