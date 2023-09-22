import { render, screen, waitFor } from "src/__tests__/test-utils/test-utils";
import { Home } from "src/screens/Home";

jest.mock('@configs/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn()
  }
}));

jest.mock("@assets/icons/logout.svg", () => 'LogoutIcon')
jest.mock("@assets/icons/person.svg", () => 'PersonIcon')
jest.mock("@assets/icons/square.svg", () => 'StopIcon')
jest.mock("@assets/icons/pause.svg", () => 'PauseIcon')
jest.mock("@assets/icons/play.svg", () => 'PlayIcon')
jest.mock("@assets/icons/dotRUN.svg", () => 'LogoIcon')

describe('screens/Home', () => {

  beforeEach(async () => {
    await waitFor(() => {
      render(<Home />);
    })
  })
  test('Should Home is rendered', () => {
      const home = screen.queryByTestId('home-screen');

      expect(home).toBeOnTheScreen();
  });

  test('Should Home is rendered with RouteMapView', () => {
      const routerMapView = screen.queryByTestId('route-map-view');

      expect(routerMapView).toBeOnTheScreen();
  });

  test('Should Home is rendered with TotalDistance', () => {
      const totalDistance = screen.queryByTestId('total-distance');

      expect(totalDistance).toBeOnTheScreen();
  });

  test('Should Home is rendered with Timer', () => {
      const timer = screen.queryByTestId('timer');

      expect(timer).toBeOnTheScreen();
  });

  test('Should Home is rendered 6 CustomButtons', () => {
      const button = screen.queryAllByTestId('custom-button');

      expect(button.length).toHaveLength(6);
  });
});