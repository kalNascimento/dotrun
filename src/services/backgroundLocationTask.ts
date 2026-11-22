import type { LocationObject } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import {
  appendRoutePoints,
  LOCATION_TASK_NAME,
  locationToRoutePoint,
} from './runTrackingStorage';

TaskManager.defineTask<{ locations?: LocationObject[] }>(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.warn('Erro no rastreamento em segundo plano:', error.message);
    return;
  }

  const locations = data?.locations ?? [];
  await appendRoutePoints(locations.map(locationToRoutePoint));
});
