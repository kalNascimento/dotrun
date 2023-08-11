import { View, Text } from 'react-native';
import { Input, LabelText } from './styles';
import { theme } from '../../../theme/Theme';

interface CustomTextInputProps {
  label: string
}

export function CustomPasswordInput({
  label
}: CustomTextInputProps) {

  return (
    <View>
      <LabelText>{ label }</LabelText>
      <Input
        placeholder="********"
        placeholderTextColor={theme.fontColor.text}
        onChangeText={(t) => console.log(t)}
      />
    </View>
  );
}
