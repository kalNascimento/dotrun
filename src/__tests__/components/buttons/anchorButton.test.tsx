import { AnchorButton } from "@buttons/AnchorButton"
import { render } from "src/__tests__/test-utils/test-utils";
import { screen } from "@testing-library/react-native";

describe('components/button/AnchorButton', () => {
  
  test('test', async () => {
    render(<AnchorButton onPress={() => 'button OK'}>Test Button</AnchorButton>);
    const button = await screen.findByTestId('anchor-button');

    expect(button).toHaveTextContent('Test Button');
  });
});