import type { RunCoordinate } from 'src/services/runTrackingStorage';
import { calculateTotalDistanceInMeters } from 'src/utils/geo';

import { DisplayText, DisplayView } from "./styles";

interface RouteMapViewProps {
  positionHistory: RunCoordinate[]
}

export function TotalDistance({
  positionHistory
}: RouteMapViewProps) {
  const totalDistanceInMeters = calculateTotalDistanceInMeters(positionHistory).toFixed(2);

  return (
    <DisplayView testID="total-distance">
      <DisplayText testID="total-distance-content">
        {totalDistanceInMeters} m
      </DisplayText>
    </DisplayView>
  )
}
