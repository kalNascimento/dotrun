import { AnchorButton } from "@buttons/AnchorButton"
import { render } from "src/__tests__/test-utils/test-utils";
import { fireEvent, screen } from "@testing-library/react-native";
import { PlayIcon } from "@assets/icons";
import { Text } from "react-native";


jest.mock("@assets/icons/play.svg", () => 'PlayIcon');

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return { useNavigate: mockNavigate }
})

describe('components/button/AnchorButton', () => {
  beforeEach(() => {
    render(
      <AnchorButton navigateTo="auth">
        <Text>Test Button</Text>
        <PlayIcon width='48' />
      </AnchorButton>
    );
  });

  test('Should Anchor button contain text', () => {
    const anchorButton = screen.getByTestId('anchor-button');

    expect(anchorButton).toBeOnTheScreen();
  });

  test('Should Anchor button contain text', () => {
    const anchorButtonContent = screen.getByTestId('anchor-button-content');

    expect(anchorButtonContent).toHaveTextContent('Test Button');
  });

  test('Should Anchor button contain icon', () => {
    const anchorButtonContent = screen.queryByTestId('anchor-button-content');

    expect(anchorButtonContent?.children[1]).toHaveProp('width', '48');
  });
});