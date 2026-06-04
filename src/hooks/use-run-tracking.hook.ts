import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import * as Location from 'expo-location';

import { theme } from '@theme/Theme';
import {
  appendRoutePoints,
  clearRoutePoints,
  getRoutePoints,
  getRunSession,
  IDLE_RUN_SESSION,
  LOCATION_TASK_NAME,
  RunCoordinate,
  RunTrackingSession,
  RunTrackingStatus,
  saveRunSession,
} from 'src/services/runTrackingStorage';

const ACCURACY = Location.Accuracy.Highest;
const TIME_INTERVAL = 5000;
const DISTANCE_INTERVAL = 5;
const DEFAULT_POSITION = 1;

function locationToRoutePoint(location: Location.LocationObject): RunCoordinate {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    accuracy: location.coords.accuracy,
    timestamp: location.timestamp ?? Date.now(),
  };
}

function getElapsedTime(session: RunTrackingSession) {
  if (session.status !== 'running' || !session.startedAt) {
    return session.elapsedBeforePause;
  }

  return session.elapsedBeforePause + Date.now() - session.startedAt;
}

export function useRunTracking() {
  const [route, setRoute] = useState<RunCoordinate[]>([]);
  const [currentCoordinate, setCurrentCoordinate] = useState<RunCoordinate | null>(null);
  const [status, setStatus] = useState<RunTrackingStatus>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);

  const sessionRef = useRef<RunTrackingSession>(IDLE_RUN_SESSION);
  const foregroundSubscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const syncStoredTracking = useCallback(async () => {
    const [storedRoute, storedSession] = await Promise.all([
      getRoutePoints(),
      getRunSession(),
    ]);

    sessionRef.current = storedSession;
    setRoute(storedRoute);
    setStatus(storedSession.status);
    setElapsedTime(getElapsedTime(storedSession));

    const lastRoutePoint = storedRoute[storedRoute.length - 1];
    if (lastRoutePoint) {
      setCurrentCoordinate(lastRoutePoint);
      return;
    }

    const location = await Location.getLastKnownPositionAsync({});
    setCurrentCoordinate({
      latitude: location?.coords.latitude ?? DEFAULT_POSITION,
      longitude: location?.coords.longitude ?? DEFAULT_POSITION,
      accuracy: location?.coords.accuracy,
      timestamp: location?.timestamp ?? Date.now(),
    });
  }, []);

  const stopForegroundWatch = useCallback(() => {
    foregroundSubscriptionRef.current?.remove();
    foregroundSubscriptionRef.current = null;
  }, []);

  const startForegroundWatch = useCallback(async () => {
    stopForegroundWatch();

    foregroundSubscriptionRef.current = await Location.watchPositionAsync(
      {
        accuracy: ACCURACY,
        distanceInterval: DISTANCE_INTERVAL,
        timeInterval: TIME_INTERVAL,
      },
      async (location) => {
        const routePoint = locationToRoutePoint(location);
        const nextRoute = await appendRoutePoints([routePoint]);

        setRoute(nextRoute);
        setCurrentCoordinate(nextRoute[nextRoute.length - 1] ?? routePoint);
      }
    );
  }, [stopForegroundWatch]);

  const ensureBackgroundPermission = useCallback(async () => {
    const foregroundPermission = await Location.getForegroundPermissionsAsync();
    if (!foregroundPermission.granted) {
      const requestedForegroundPermission = await Location.requestForegroundPermissionsAsync();
      if (!requestedForegroundPermission.granted) {
        throw new Error('Permissão de localização em primeiro plano negada');
      }
    }

    const backgroundPermission = await Location.getBackgroundPermissionsAsync();
    if (!backgroundPermission.granted) {
      const requestedBackgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (!requestedBackgroundPermission.granted) {
        throw new Error('Permissão de localização em segundo plano negada');
      }
    }
  }, []);

  const start = useCallback(async () => {
    await ensureBackgroundPermission();

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }

    const currentSession = sessionRef.current;
    const isResuming = currentSession.status === 'paused';

    if (!isResuming) {
      await clearRoutePoints();
      setRoute([]);
    }

    const nextSession: RunTrackingSession = {
      status: 'running',
      startedAt: Date.now(),
      elapsedBeforePause: isResuming ? currentSession.elapsedBeforePause : 0,
      pausedAt: null,
    };

    await saveRunSession(nextSession);
    sessionRef.current = nextSession;
    setStatus('running');
    setElapsedTime(getElapsedTime(nextSession));

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: ACCURACY,
      deferredUpdatesDistance: DISTANCE_INTERVAL,
      deferredUpdatesInterval: TIME_INTERVAL,
      deferredUpdatesTimeout: TIME_INTERVAL,
      pausesUpdatesAutomatically: false,
      foregroundService: {
        notificationTitle: 'dotRUN em atividade',
        notificationBody: 'Rastreando sua corrida em segundo plano',
        notificationColor: theme.colors.primary.main,
        killServiceOnDestroy: false,
      },
    });
  }, [ensureBackgroundPermission]);

  const pause = useCallback(async () => {
    const currentSession = sessionRef.current;
    if (currentSession.status !== 'running') {
      return;
    }

    const elapsedBeforePause = getElapsedTime(currentSession);

    const nextSession: RunTrackingSession = {
      status: 'paused',
      startedAt: null,
      elapsedBeforePause,
      pausedAt: Date.now(),
    };

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }

    stopForegroundWatch();
    await saveRunSession(nextSession);
    sessionRef.current = nextSession;
    setStatus('paused');
    setElapsedTime(elapsedBeforePause);
  }, [stopForegroundWatch]);

  const stop = useCallback(async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }

    stopForegroundWatch();
    await clearRoutePoints();
    await saveRunSession(IDLE_RUN_SESSION);

    sessionRef.current = IDLE_RUN_SESSION;
    setRoute([]);
    setStatus('idle');
    setElapsedTime(0);
  }, [stopForegroundWatch]);

  useEffect(() => {
    syncStoredTracking();

    return () => {
      stopForegroundWatch();
    };
  }, [syncStoredTracking, stopForegroundWatch]);

  useEffect(() => {
    if (status !== 'running') {
      stopForegroundWatch();
      return;
    }

    startForegroundWatch();

    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime(sessionRef.current));
    }, 1000);

    return () => clearInterval(interval);
  }, [startForegroundWatch, status, stopForegroundWatch]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        syncStoredTracking();
      }
    });

    return () => subscription.remove();
  }, [syncStoredTracking]);

  return useMemo(
    () => ({
      route,
      currentCoordinate,
      status,
      elapsedTime,
      isRunning: status === 'running',
      isPaused: status === 'paused',
      start,
      pause,
      stop,
      syncStoredTracking,
    }),
    [currentCoordinate, elapsedTime, pause, route, start, status, stop, syncStoredTracking]
  );
}
