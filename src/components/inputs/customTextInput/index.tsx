import { View, Text } from 'react-native';
import { Input, LabelText } from './styles';
import { theme } from '../../../theme/Theme';

interface CustomTextInputProps {
  label: string
}

export function CustomTextInput({
  label
}: CustomTextInputProps) {

  return (
    <View>
      <LabelText>{ label }</LabelText>
      <Input
        placeholder="exemplo@exemplo.com.br"
        placeholderTextColor={theme.fontColor.text}
        keyboardType="email-address"
      />
    </View>
  );
}
