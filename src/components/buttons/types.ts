import { StyleProp, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export interface CustomButtonProps {
  onPress: () => void,
  style?: StyleProp<ViewStyle>
}