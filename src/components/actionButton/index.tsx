import { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";
import { theme } from "../../theme/Theme";

interface ActionButtonProps {
  onPress: () => void,
}

export function ActionButton({
  onPress,
  children
}: PropsWithChildren<ActionButtonProps>) {
  return (
    <ButtonView style={theme.shadow}>
      <TouchableHighlight onPress={onPress}>
        <ButtonContentView>
          <ButtonText>{ children }</ButtonText>
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
