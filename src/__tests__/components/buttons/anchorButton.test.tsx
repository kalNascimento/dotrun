import { AnchorButton } from "@buttons/AnchorButton"
import { render } from "src/__tests__/test-utils/test-utils";
import { screen } from "@testing-library/react-native";
import { PlayIcon } from "@assets/icons";
import { Text } from "react-native";

jest.mock("@assets/icons/play.svg", () => 'PlayIcon')

describe('components/button/AnchorButton', () => {

  beforeEach(() => {
    render(
      <AnchorButton onPress={() => 'button OK'}>
        <Text>Test Button</Text>
        <PlayIcon width='48' />
      </AnchorButton>
    );
  });

  test('Should Anchor button contain text', () => {
    const anchorButton = screen.getByTestId('anchor-button');

    expect(anchorButton).toHaveTextContent('Test Button');
  });

  test('Should Anchor button contain icon', () => {
    const anchorButton = screen.getByTestId('anchor-button');

    expect(anchorButton.children[1]).toHaveProp('width', '48');
  });
});