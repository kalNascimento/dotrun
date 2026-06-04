import { act, renderHook } from '@testing-library/react-hooks';

import { useRunTracking } from '@hooks/use-run-tracking.hook';
import { LOCATION_TASK_NAME } from 'src/services/runTrackingStorage';

const asyncStorage: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => Promise.resolve(asyncStorage[key] ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    asyncStorage[key] = value;
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    delete asyncStorage[key];
    return Promise.resolve();
  }),
}));

jest.mock('expo-location', () => ({
  Accuracy: {
    Highest: 6,
  },
  getForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  getBackgroundPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  requestBackgroundPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  hasStartedLocationUpdatesAsync: jest.fn(() => Promise.resolve(false)),
  stopLocationUpdatesAsync: jest.fn(() => Promise.resolve()),
  startLocationUpdatesAsync: jest.fn(() => Promise.resolve()),
  watchPositionAsync: jest.fn(() => Promise.resolve({ remove: jest.fn() })),
  getLastKnownPositionAsync: jest.fn(() => Promise.resolve({
    coords: {
      latitude: -23.55052,
      longitude: -46.633308,
      accuracy: 10,
    },
    timestamp: 1000,
  })),
}));

describe('hooks/useRunTracking', () => {
  beforeEach(() => {
    Object.keys(asyncStorage).forEach((key) => delete asyncStorage[key]);
    jest.clearAllMocks();
  });

  test('starts, pauses and stops run tracking', async () => {
    const Location = jest.requireMock('expo-location');
    const { result, unmount } = renderHook(() => useRunTracking());

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.start();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toBe('running');
    expect(Location.startLocationUpdatesAsync).toHaveBeenCalledWith(
      LOCATION_TASK_NAME,
      expect.objectContaining({
        foregroundService: expect.objectContaining({
          notificationTitle: 'dotRUN em atividade',
        }),
      })
    );
    expect(Location.watchPositionAsync).toHaveBeenCalled();

    await act(async () => {
      await result.current.pause();
    });

    expect(result.current.status).toBe('paused');

    await act(async () => {
      await result.current.stop();
    });

    expect(result.current.status).toBe('idle');

    unmount();
  });
});
