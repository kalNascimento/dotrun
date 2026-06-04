import { render, screen } from "src/__tests__/test-utils/test-utils";
import { TotalDistance } from "src/screens/Home/TotalDistance";
import { ICoordinates } from "src/screens/Home/types";

describe('screens/Home/TotalDistance', () => {

  test('Should TotalDistance is rendered', async () => {
    const POSITION_HISTORY = [] as ICoordinates[];

    render(
      <TotalDistance positionHistory={POSITION_HISTORY} />
    );

    const totalDistance = screen.getByTestId('total-distance');
    const totalDistanceContent = screen.getByTestId('total-distance-content');

    expect(totalDistance).toBeTruthy();
    expect(totalDistanceContent).toBeTruthy();
  });

  test('Should totalDistanceContent equals', async () => {
    const POSITION_HISTORY = [] as ICoordinates[];

    render(
      <TotalDistance positionHistory={POSITION_HISTORY} />
    );

    const totalDistanceContent = screen.getByTestId('total-distance-content');

    expect(totalDistanceContent).toHaveTextContent('0.00 m')
  });

  test('Should totalDistanceContent not equals', async () => {
    const POSITION_HISTORY = [
      { latitude: -23.55052, longitude: -46.633308 },
      { latitude: -23.55152, longitude: -46.634308 }
    ] as ICoordinates[];

    render(
      <TotalDistance positionHistory={POSITION_HISTORY} />
    );

    const totalDistanceContent = screen.queryByTestId('total-distance-content');

    expect(totalDistanceContent).not.toHaveTextContent('0.00 m')
  });
});
