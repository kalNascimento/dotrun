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
  test('Should Home is rendered', async () => {
      const home = screen.getByTestId('home-screen');

      expect(home).toBeOnTheScreen();
  });

  test('Should Home is rendered with RouteMapView', async () => {
      const routerMapView = screen.getByTestId('route-map-view');

      expect(routerMapView).toBeOnTheScreen();
  });

  test('Should Home is rendered with TotalDistance', async () => {
      const totalDistance = screen.getByTestId('total-distance');

      expect(totalDistance).toBeOnTheScreen();
  });

  test('Should Home is rendered with Timer', async () => {
      const timer = screen.getByTestId('timer');

      expect(timer).toBeOnTheScreen();
  });
});