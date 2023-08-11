import React, { PropsWithChildren } from "react";
import { StyleProp, TouchableHighlight, View, Text, ViewStyle } from "react-native";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";
import { theme } from "../../../theme/Theme";

interface ActionButtonProps {
  onPress: () => void,
  style?: StyleProp<ViewStyle>
}

export function OutlineActionButton({
  onPress,
  style,
  children
}: PropsWithChildren<ActionButtonProps>) {
  return (
    <ButtonView style={[style]}>
      <TouchableHighlight 
        onPress={onPress}
        activeOpacity={0.75}
        underlayColor={theme.colors.gray}>
        <ButtonContentView>
          <ButtonText>{children}</ButtonText>
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
