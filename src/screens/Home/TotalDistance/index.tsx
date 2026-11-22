import { useMemo } from 'react';

import type { RunCoordinate } from 'src/services/runTrackingStorage';
import { calculateTotalDistanceInMeters } from 'src/utils/geo';

import { DisplayText, DisplayView } from "./styles";

interface TotalDistanceProps {
  positionHistory: RunCoordinate[]
}

export function TotalDistance({
  positionHistory
}: TotalDistanceProps) {
  // A Home re-renderiza a cada segundo por causa do cronômetro; a distância
  // só é recalculada quando a rota muda.
  const totalDistanceInMeters = useMemo(
    () => calculateTotalDistanceInMeters(positionHistory).toFixed(2),
    [positionHistory]
  );

  return (
    <DisplayView testID="total-distance">
      <DisplayText testID="total-distance-content">
        {totalDistanceInMeters} m
      </DisplayText>
    </DisplayView>
  )
}
