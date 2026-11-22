import { AnchorButton } from "@buttons/AnchorButton"
import { render } from "src/__tests__/test-utils/test-utils";
import { fireEvent, screen } from "@testing-library/react-native";
import { PlayIcon } from "@assets/icons";
import { Text } from "react-native";

jest.mock("@assets/icons/play.svg", () => 'PlayIcon');

describe('components/button/AnchorButton', () => {
  beforeEach(async () => {
    await render(
      <AnchorButton navigateTo="Login">
        <Text>Test Button</Text>
        <PlayIcon width='48' />
      </AnchorButton>
    );
  });

  test('Should Anchor button be rendered', () => {
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

describe('components/button/AnchorButton onPress', () => {
  test('Should call onPress when pressed', async () => {
    const onPress = jest.fn();

    await render(
      <AnchorButton onPress={onPress}>
        <Text>Sair</Text>
      </AnchorButton>
    );

    await fireEvent.press(screen.getByText('Sair'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});