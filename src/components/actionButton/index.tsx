import { PropsWithChildren } from "react";
import { StyleProp, TouchableHighlight, ViewStyle } from "react-native";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";
import { theme } from "../../theme/Theme";

interface ActionButtonProps {
  onPress: () => void,
  style?: StyleProp<ViewStyle>
}

export function ActionButton({
  onPress,
  style,
  children
}: PropsWithChildren<ActionButtonProps>) {
  return (
    <ButtonView style={[theme.shadow, style]}>
      <TouchableHighlight onPress={onPress}>
        <ButtonContentView>
          <ButtonText>{ children }</ButtonText>
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
