import type { RunCoordinate } from 'src/services/runTrackingStorage';

const EARTH_RADIUS_IN_METERS = 6371000;
const MIN_DISTANCE_BETWEEN_POINTS_IN_METERS = 1;
const MAX_ACCEPTABLE_ACCURACY_IN_METERS = 80;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function isValidCoordinate(point?: Partial<RunCoordinate> | null) {
  if (!point) {
    return false;
  }

  const { latitude, longitude, accuracy } = point;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return false;
  }

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return false;
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return false;
  }

  if (typeof accuracy === 'number' && accuracy > MAX_ACCEPTABLE_ACCURACY_IN_METERS) {
    return false;
  }

  return true;
}

export function haversineDistanceInMeters(startPoint: RunCoordinate, endPoint: RunCoordinate) {
  const latitudeDistance = toRadians(endPoint.latitude - startPoint.latitude);
  const longitudeDistance = toRadians(endPoint.longitude - startPoint.longitude);

  const startLatitude = toRadians(startPoint.latitude);
  const endLatitude = toRadians(endPoint.latitude);

  const a =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);

  return EARTH_RADIUS_IN_METERS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function sanitizeRoute(points: RunCoordinate[]) {
  return points.reduce<RunCoordinate[]>((route, point) => {
    if (!isValidCoordinate(point)) {
      return route;
    }

    const normalizedPoint = {
      ...point,
      timestamp: point.timestamp ?? Date.now(),
    };

    const previousPoint = route[route.length - 1];

    if (
      previousPoint &&
      haversineDistanceInMeters(previousPoint, normalizedPoint) < MIN_DISTANCE_BETWEEN_POINTS_IN_METERS
    ) {
      return route;
    }

    return [...route, normalizedPoint];
  }, []);
}

export function calculateTotalDistanceInMeters(points: RunCoordinate[]) {
  const route = sanitizeRoute(points);

  return route.reduce((totalDistance, point, index) => {
    if (index === 0) {
      return totalDistance;
    }

    return totalDistance + haversineDistanceInMeters(route[index - 1], point);
  }, 0);
}
