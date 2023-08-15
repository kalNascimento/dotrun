import { StyleProp, ViewStyle } from "react-native";

export interface CustomButtonProps {
  onPress: () => void,
  style?: StyleProp<ViewStyle>
}