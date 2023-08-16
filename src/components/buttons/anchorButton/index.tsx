import React, { PropsWithChildren } from "react";
import { TouchableHighlight, View } from "react-native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonView } from "./styles";
import { theme } from "../../../theme/Theme";

export function AnchorButton({
  onPress,
  style,
  children
}: PropsWithChildren<CustomButtonProps>) {
  return (
    <ButtonView style={style}>
      <TouchableHighlight 
        onPress={onPress}
        activeOpacity={1}
        underlayColor="#025A3A">
        <ButtonContentView>
          { children }
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
