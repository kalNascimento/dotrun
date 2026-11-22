import { PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomButtonProps } from "../types";

import { ButtonContentView, ButtonView } from "./styles";
import { theme } from "@theme/Theme";

export function AnchorButton({
  onPress,
  navigateTo,
  style,
  children
}: PropsWithChildren<CustomButtonProps>) {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress?.();

    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <ButtonView style={style} testID='anchor-button'>
      <TouchableHighlight
        onPress={handlePress}
        activeOpacity={1}
        underlayColor={theme.colors.primary.hover}>
        <ButtonContentView testID='anchor-button-content'>
          { children }
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}
