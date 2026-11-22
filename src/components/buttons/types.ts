import { StyleProp, ViewStyle } from "react-native";

import type { RootStackParamList } from "src/routes/types";

export interface CustomButtonProps {
  onPress?: () => void,
  navigateTo?: keyof RootStackParamList,
  style?: StyleProp<ViewStyle>
}
