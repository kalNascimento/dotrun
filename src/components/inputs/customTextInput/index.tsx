import { View } from 'react-native';
import { Controller } from 'react-hook-form';

import { ErrorText, Input, LabelText } from './styles';
import { theme } from '../../../theme/Theme';

import { CustomInputProps } from '../types';

export function CustomTextInput({
  label,
  control,
  name,
  rules,
  placeholder,
}: CustomInputProps) {

  return (
    <View>
      <LabelText>{label}</LabelText>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              placeholder={placeholder}
              placeholderTextColor={theme.fontColor.text}
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
            {
              error &&
              <ErrorText>{error?.message}</ErrorText>
            }
          </>
        )}
        rules={rules}
      />
    </View>
  );
}
