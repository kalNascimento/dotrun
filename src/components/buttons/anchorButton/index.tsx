import React, { PropsWithChildren } from "react";
import { StyleProp, TouchableHighlight, View, Text, ViewStyle } from "react-native";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";
import { theme } from "../../../theme/Theme";

interface ActionButtonProps {
  onPress: () => void,
  style?: StyleProp<ViewStyle>
}

export function AnchorButton({
  onPress,
  style,
  children
}: PropsWithChildren<ActionButtonProps>) {
  return (
    <ButtonView style={[theme.shadow, style]}>
      <TouchableHighlight 
        onPress={onPress}
        activeOpacity={1}
        underlayColor="#025A3A">
        <View>
          { children }
        </View>
      </TouchableHighlight>
    </ButtonView>
  );
}
