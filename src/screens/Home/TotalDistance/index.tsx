import { ICoordinates } from "../types";
import { DisplayText, DisplayView } from "./styles";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface RouteMapViewProps {
  positionHistory: ICoordinates[]
}

function calculatePointDistance(startPoint: Coordinates, endPoint: Coordinates): number {
  const metersPerLatitude = 111.1;
  const metersPerLongitude = 96.2;

  const latitudeDifference = startPoint.latitude - endPoint.latitude;
  const longitudeDifference = startPoint.longitude - endPoint.longitude;

  return Math.sqrt(Math.pow(latitudeDifference * metersPerLatitude, 2) + Math.pow(longitudeDifference * metersPerLongitude, 2));
}

function calculateTotalPathDistance(positions: Coordinates[]): number {
  let totalPathDistance = 0;

  for (let i = 1; i < positions.length; i++) {
    let pointDistance = calculatePointDistance(positions[i - 1], positions[i]);
    totalPathDistance += pointDistance;
  }

  return totalPathDistance;
}


export function TotalDistance({
  positionHistory
}: RouteMapViewProps) {
  const totalDistanceInMeters = calculateTotalPathDistance(positionHistory);
  const totalDistanceInKilometers = (totalDistanceInMeters * 1000).toFixed(2);

  return (
    <DisplayView testID="total-distance">
      <DisplayText testID="total-distance-content">
        {totalDistanceInKilometers} m
      </DisplayText>
    </DisplayView>
  )
}
