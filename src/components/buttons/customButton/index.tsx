import React, { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";
import { theme } from "../../../theme/Theme";

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
        underlayColor="#025A3A">
        <ButtonContentView>
          <ButtonText>{ children }</ButtonText>
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
