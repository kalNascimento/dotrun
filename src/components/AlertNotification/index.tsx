import { Alert } from "react-native";

export const AlertNotification = (title: string, alertMessage: string) =>
    Alert.alert(
      title,
      alertMessage,
      [
        {
          text: 'ok',
          style: 'default',
        },
      ],
    );