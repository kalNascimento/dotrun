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

    expect(totalDistanceContent.children[0]).toEqual('0.00')
  });

  test('Should totalDistanceContent not equals', async () => {
    const POSITION_HISTORY = [
      { latitude: 1000, longitude: 1001 },
      { latitude: 1001, longitude: 1002 }
    ] as ICoordinates[];

    render(
      <TotalDistance positionHistory={POSITION_HISTORY} />
    );

    const totalDistanceContent = screen.getByTestId('total-distance-content');

    expect(totalDistanceContent.children[0]).not.toEqual('0.00')
  });
});