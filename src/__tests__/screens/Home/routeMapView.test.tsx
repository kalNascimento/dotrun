import { render, screen } from "src/__tests__/test-utils/test-utils";
import { RouteMapView } from "src/screens/Home/RouteMapView";
import { ICoordinates } from "src/screens/Home/types";

const POSITION_HISTORY = [
  {
    latitude: 1000,
    longitude: 1001
  },
  {
    latitude: 1001,
    longitude: 1002
  },
  {
    latitude: 1002,
    longitude: 1003
  }
] as ICoordinates[];

const COORDINATE = {
  latitude: 1000,
  longitude: 1001
} as ICoordinates;

const COORDINATE_EMPTY = { } as ICoordinates;

describe('screens/Home/RouteMapView', () => {

  test('Should RouterMapView is rendered with mapView', async () => {
    render(
      <RouteMapView coordinate={COORDINATE} positionHistory={POSITION_HISTORY} />
    )

    const routerMapView = screen.getByTestId('route-map-view');
    const mapView = screen.getByTestId('map-view');

    expect(routerMapView).toBeOnTheScreen();
    expect(mapView).toBeOnTheScreen();
  });

  test('Should RouterMapView is rendered without mapView', async () => {
    render(
      <RouteMapView coordinate={COORDINATE_EMPTY} positionHistory={POSITION_HISTORY} />
    );

    const routerMapView = screen.getByTestId('route-map-view');

    expect(routerMapView.children.length).toBe(0);
  });
});