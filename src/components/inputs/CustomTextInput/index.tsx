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
    <View testID='custom-text-input'>
      <LabelText>{label}</LabelText>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              placeholder={placeholder}
              placeholderTextColor={theme.fontColor.placeholder}
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              testID='custom-text-input-content'
            />
            {
              error &&
              <ErrorText testID='custom-text-input-error-text'>{error?.message}</ErrorText>
            }
          </>
        )}
        rules={rules}
      />
    </View>
  );
}
