import { View, Text } from 'react-native';

import { CustomButton } from '@buttons/CustomButton';
import { LoggedHeader } from 'src/components/LoggedHeader';

import { TotalDistance } from './TotalDistance';
import { RouteMapView } from './RouteMapView';
import { Timer } from './Timer';

import {
  ContainerButtonView,
  ContainerView
} from "./styles";

import {
  PauseIcon,
  PlayIcon,
  StopIcon
} from '@assets/icons';
import { AlertNotification } from 'src/components/AlertNotification';
import { useRunTracking } from '@hooks/use-run-tracking.hook';

export function Home() {
  const {
    currentCoordinate,
    elapsedTime,
    route,
    start,
    pause,
    stop,
  } = useRunTracking();

  const startBackgroundUpdate = async () => {
    try {
      await start();
    } catch (error) {
      AlertNotification('Erro ao iniciar', error instanceof Error ? error.message : 'Não foi possível iniciar a corrida');
    }
  };

  const stopBackgroundUpdate = async () => {
    try {
      await stop();
      AlertNotification('Aviso', 'Rastreio em segundo plano foi desativado');
    } catch (error) {
      AlertNotification('Erro ao parar', error instanceof Error ? error.message : 'Não foi possível parar a corrida');
    }
  };

  const pauseBackgroundUpdate = async () => {
    try {
      await pause();
      AlertNotification('Aviso', 'Rastreio em segundo plano foi pausado');
    } catch (error) {
      AlertNotification('Erro ao pausar', error instanceof Error ? error.message : 'Não foi possível pausar a corrida');
    }
  };

  return (
    <>
      <LoggedHeader />
      <ContainerView testID='home-screen'>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Timer elapsedTime={elapsedTime}></Timer>
          <TotalDistance positionHistory={route} />
        </View>
        <RouteMapView coordinate={currentCoordinate} positionHistory={route} />
        <ContainerButtonView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomButton onPress={stopBackgroundUpdate} style={{ width: '42%' }}>
              <Text>Parar</Text>
              <StopIcon width="32" />
            </CustomButton>
            <CustomButton onPress={pauseBackgroundUpdate} style={{ width: '42%' }}>
              <Text>Pausar</Text>
              <PauseIcon width="32" />
            </CustomButton>
          </View>
          <CustomButton onPress={startBackgroundUpdate}>
            <Text>Iniciar</Text>
            <PlayIcon width="32" />
          </CustomButton>
        </ContainerButtonView>
      </ContainerView>
    </>
  );
}
