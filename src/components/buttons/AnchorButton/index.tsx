import { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonView } from "./styles";
import { theme } from "@theme/Theme";

export function AnchorButton({
  navigateTo,
  style,
  children
}: PropsWithChildren<CustomButtonProps>) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <ButtonView style={style}>
      <TouchableHighlight 
        onPress={() => navigation.navigate(navigateTo as never)}
        activeOpacity={1}
        underlayColor={theme.colors.primary.hover}>
        <ButtonContentView testID='anchor-button'>
          { children }
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
