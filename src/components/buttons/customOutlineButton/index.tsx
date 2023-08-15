import React, { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";
import { theme } from "../../../theme/Theme";

export function CustomOutlineButton({
  onPress,
  style,
  children
}: PropsWithChildren<CustomButtonProps>) {
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
