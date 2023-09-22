import { View } from 'react-native';
import { Controller } from 'react-hook-form';

import { ErrorText, Input, LabelText } from './styles';
import { theme } from '../../../theme/Theme';

import { CustomInputProps } from '../types';

export function CustomPasswordInput({
  label,
  control,
  name,
  rules,
  placeholder
}: CustomInputProps) {

  return (
    <View testID='custom-password-input'>
      <LabelText>{label}</LabelText>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              placeholder={placeholder}
              placeholderTextColor={theme.fontColor.placeholder}
              onChangeText={onChange}
              value={value}
              testID='custom-password-input-content'
              secureTextEntry
            />
            {
              error &&
              <ErrorText testID='custom-password-input-error-text'>{error?.message}</ErrorText>
            }
          </>
        )}
        rules={{
          required: 'Este campo é obrigatório',
          minLength: {
            value: 8,
            message: 'A senha deve ter pelo menos 8 caracteres',
          },
          ...rules
        }}
      />
    </View>
  );
}
