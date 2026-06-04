import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import {
  appendRoutePoints,
  LOCATION_TASK_NAME,
  RunCoordinate,
} from './runTrackingStorage';

function locationToRoutePoint(location: Location.LocationObject): RunCoordinate {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    accuracy: location.coords.accuracy,
    timestamp: location.timestamp ?? Date.now(),
  };
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.warn('Erro no rastreamento em segundo plano:', error.message);
    return;
  }

  const locations = (data as any)?.locations ?? [];
  const routePoints = locations.map(locationToRoutePoint);

  await appendRoutePoints(routePoints);
});
