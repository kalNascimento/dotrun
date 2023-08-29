import React, { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonView } from "./styles";
import { ButtonText } from "@buttons/styles";

import { theme } from "@theme/Theme";

export function CustomButton({
  onPress,
  style,
  children
}: PropsWithChildren<CustomButtonProps>) {
  return (
    <ButtonView style={[theme.shadow, style]}>
      <TouchableHighlight 
        onPress={onPress}
        activeOpacity={1}
        underlayColor={theme.colors.primary.hover}>
        <ButtonContentView>
          <ButtonText>{ children }</ButtonText>
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
