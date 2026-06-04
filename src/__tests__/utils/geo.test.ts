import {
  calculateTotalDistanceInMeters,
  haversineDistanceInMeters,
  sanitizeRoute,
} from 'src/utils/geo';

describe('utils/geo', () => {
  test('calculates distance between two valid points with Haversine', () => {
    const distance = haversineDistanceInMeters(
      { latitude: -23.55052, longitude: -46.633308 },
      { latitude: -23.55152, longitude: -46.634308 }
    );

    expect(distance).toBeGreaterThan(100);
    expect(distance).toBeLessThan(200);
  });

  test('filters invalid or noisy route points', () => {
    const route = sanitizeRoute([
      { latitude: -23.55052, longitude: -46.633308 },
      { latitude: 1000, longitude: -46.633308 },
      { latitude: -23.55052, longitude: -46.633308 },
      { latitude: -23.55152, longitude: -46.634308, accuracy: 120 },
      { latitude: -23.55152, longitude: -46.634308 },
    ]);

    expect(route).toHaveLength(2);
  });

  test('calculates total route distance after sanitizing points', () => {
    const totalDistance = calculateTotalDistanceInMeters([
      { latitude: -23.55052, longitude: -46.633308 },
      { latitude: -23.55152, longitude: -46.634308 },
      { latitude: -23.55252, longitude: -46.635308 },
    ]);

    expect(totalDistance).toBeGreaterThan(250);
    expect(totalDistance).toBeLessThan(350);
  });
});
