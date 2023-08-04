import { PropsWithChildren } from "react";
import { TouchableHighlight, StyleSheet } from "react-native";

import { ButtonContentView, ButtonText, ButtonView } from "./styles";

interface ActionButtonProps {
  onPress: () => void,
}

export function ActionButton({
  onPress,
  children
}: PropsWithChildren<ActionButtonProps>) {
  return (
    <ButtonView style={styles.buttonShadow}>
      <TouchableHighlight onPress={onPress}>
        <ButtonContentView>
          <ButtonText>{ children }</ButtonText>
        </ButtonContentView>
      </TouchableHighlight>
    </ButtonView>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2
  }
})
