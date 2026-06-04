import { render, screen } from "src/__tests__/test-utils/test-utils";
import { RouteMapView } from "src/screens/Home/RouteMapView";
import { ICoordinates } from "src/screens/Home/types";

const POSITION_HISTORY = [
  {
    latitude: -23.55052,
    longitude: -46.633308
  },
  {
    latitude: -23.55152,
    longitude: -46.634308
  },
  {
    latitude: -23.55252,
    longitude: -46.635308
  }
] as ICoordinates[];

const COORDINATE = {
  latitude: -23.55052,
  longitude: -46.633308
} as ICoordinates;

const COORDINATE_EMPTY = { } as ICoordinates;

describe('screens/Home/RouteMapView', () => {

  test('Should RouterMapView is rendered with mapView', async () => {
    render(
      <RouteMapView coordinate={COORDINATE} positionHistory={POSITION_HISTORY} />
    )

    const routerMapView = screen.queryByTestId('route-map-view');
    const mapView = screen.queryByTestId('map-view');

    expect(routerMapView).toBeOnTheScreen();
    expect(mapView).toBeOnTheScreen();
  });

  test('Should RouterMapView is rendered without mapView', async () => {
    render(
      <RouteMapView coordinate={COORDINATE_EMPTY} positionHistory={POSITION_HISTORY} />
    );

    const routerMapView = screen.queryByTestId('route-map-view');

    expect(routerMapView?.children.length).toBe(0);
  });
});
