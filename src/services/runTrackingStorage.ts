import AsyncStorage from '@react-native-async-storage/async-storage';

import { sanitizeRoute } from 'src/utils/geo';

export type RunTrackingStatus = 'idle' | 'running' | 'paused';

export interface RunCoordinate {
  latitude: number;
  longitude: number;
  timestamp?: number;
  accuracy?: number | null;
}

export interface RunTrackingSession {
  status: RunTrackingStatus;
  startedAt: number | null;
  elapsedBeforePause: number;
  pausedAt: number | null;
}

export const LOCATION_TASK_NAME = 'BACKGROUND_TRACKING';

export const IDLE_RUN_SESSION: RunTrackingSession = {
  status: 'idle',
  startedAt: null,
  elapsedBeforePause: 0,
  pausedAt: null,
};

const ROUTE_STORAGE_KEY = '@dotrun:active-route';
const SESSION_STORAGE_KEY = '@dotrun:active-session';

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function getRoutePoints(): Promise<RunCoordinate[]> {
  const storedRoute = await AsyncStorage.getItem(ROUTE_STORAGE_KEY);
  return sanitizeRoute(parseJson<RunCoordinate[]>(storedRoute, []));
}

export async function saveRoutePoints(points: RunCoordinate[]) {
  await AsyncStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(sanitizeRoute(points)));
}

export async function appendRoutePoints(points: RunCoordinate[]) {
  if (!points.length) {
    return getRoutePoints();
  }

  const currentRoute = await getRoutePoints();
  const nextRoute = sanitizeRoute([...currentRoute, ...points]);
  await AsyncStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(nextRoute));

  return nextRoute;
}

export async function clearRoutePoints() {
  await AsyncStorage.removeItem(ROUTE_STORAGE_KEY);
}

export async function getRunSession(): Promise<RunTrackingSession> {
  const storedSession = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
  const session = parseJson<RunTrackingSession>(storedSession, IDLE_RUN_SESSION);

  return {
    ...IDLE_RUN_SESSION,
    ...session,
  };
}

export async function saveRunSession(session: RunTrackingSession) {
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function clearRunSession() {
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}
