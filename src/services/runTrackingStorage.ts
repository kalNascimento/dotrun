import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LocationObject } from 'expo-location';

import { appendSanitizedPoints, sanitizeRoute } from 'src/utils/geo';

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

export function saveRoutePoints(points: RunCoordinate[]) {
  return enqueueWrite(() =>
    AsyncStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(sanitizeRoute(points)))
  );
}

// A task de segundo plano e o watch de primeiro plano gravam na mesma chave.
// Encadear as escritas evita que um "ler → modificar → gravar" sobrescreva
// o outro e perca pontos.
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueueWrite<T>(operation: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(operation, operation);
  writeQueue = result.catch(() => undefined);
  return result;
}

export function appendRoutePoints(points: RunCoordinate[]) {
  return enqueueWrite(async () => {
    // A rota gravada já foi sanitizada; aqui só os pontos novos são validados.
    const storedRoute = await AsyncStorage.getItem(ROUTE_STORAGE_KEY);
    const currentRoute = parseJson<RunCoordinate[]>(storedRoute, []);

    if (!points.length) {
      return currentRoute;
    }

    const nextRoute = appendSanitizedPoints(currentRoute, points);

    if (nextRoute.length !== currentRoute.length) {
      await AsyncStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(nextRoute));
    }

    return nextRoute;
  });
}

export function locationToRoutePoint(location: LocationObject): RunCoordinate {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    accuracy: location.coords.accuracy,
    timestamp: location.timestamp ?? Date.now(),
  };
}

export function clearRoutePoints() {
  return enqueueWrite(() => AsyncStorage.removeItem(ROUTE_STORAGE_KEY));
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
