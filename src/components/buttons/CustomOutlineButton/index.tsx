import React, { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonView } from "./styles";
import { ButtonText } from "@buttons/styles";

import { theme } from "@theme/Theme";

export function CustomOutlineButton({
  onPress,
  style,
  children
}: PropsWithChildren<CustomButtonProps>) {
  return (
    <ButtonView style={[style]} testID="custom-outline-button">
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
