import { useState } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer'

import { theme } from '../../../theme/Theme';
import { DisplayText } from './styles';

interface TimerProps {
  isTimerStart: boolean;
  resetTimer: boolean;
}

export function Timer({
  isTimerStart,
  resetTimer
}: TimerProps) {

  return (
    <View style={{flexDirection: 'row'}}>
      <Stopwatch laps start={isTimerStart} reset={resetTimer} options={options} />
      <DisplayText>s</DisplayText>
    </View>
  )
}

const options = {
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold
  },
};