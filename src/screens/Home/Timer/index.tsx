import { Text, View } from 'react-native';

interface TimerProps {
  elapsedTime: number;
}

export function Timer({
  elapsedTime
}: TimerProps) {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');

  return (
    <View testID="timer">
      <Text testID="timer-content" style={{ fontSize: 28, color: '#000' }}>
        {formattedTime}
      </Text>
    </View>
  );
}
