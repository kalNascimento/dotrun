import { render, screen } from "src/__tests__/test-utils/test-utils";
import { RouteMarker } from "src/screens/Home/RouteMarker";
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

describe('screens/Home/RouteMarker', () => {

  test('Should RouteMarker is rendered with children', async () => {
    render(
      <RouteMarker coordinate={COORDINATE} positionHistory={POSITION_HISTORY} />
    );

    const routerMapView = screen.queryByTestId('router-marker');

    expect(routerMapView?.children.length).toBe(2);
  });
});