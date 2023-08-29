import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import { CustomButton } from '@buttons/CustomButton';

import {
  ExplanatoryText,
  PermissionConsentText,
  ContainerView
} from './styles';

import { auth } from '@configs/firebase';

const ForegroundRequestText = (requestButton: React.ReactNode) => {
  return (
    <>
      <ExplanatoryText>
        Para que a marcação de percurso funcione corretamente,
        é necessário dar permissão de localização em primeiro.
      </ExplanatoryText>
      <PermissionConsentText>
        Permitir que .RUN use localização em primeiro plano?
      </PermissionConsentText>
      {requestButton}
    </>
  )
}

const BackgroundRequestText = (requestButton: React.ReactNode) => {
  return (
    <>
      <ExplanatoryText>
        Para que a marcação de percurso funcione corretamente,
        é necessário dar permissão de localização em primeiro e segundo plano
      </ExplanatoryText>
      <PermissionConsentText>
        Permitir que .RUN use localização em segundo plano?
      </PermissionConsentText>
      {requestButton}
    </>
  )
}

export function RequestLocationPermission() {
  const [backgroundPermission, requestBackgroundPermission] = Location.useBackgroundPermissions();
  const [foregroundPermission, requestForegroundPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation();

  const logout = () => {
    auth.signOut();
    navigation.navigate('Auth' as never);
  }

  useEffect(() => {
    const requestBackgroundPermission = async () => {
      if (backgroundPermission?.status == 'granted') {
        navigation.navigate('Home' as never)
      }
    }
    requestBackgroundPermission();
  }, [foregroundPermission, backgroundPermission]);

  return (
    <ContainerView>
      {
        !foregroundPermission?.granted &&
        ForegroundRequestText(
          <CustomButton
            style={{ width: '100%' }}
            onPress={() => requestForegroundPermission()}>
            Permitir
          </CustomButton>
        )
      }
      {
        foregroundPermission?.granted &&
        !backgroundPermission?.granted &&
        BackgroundRequestText(
          <CustomButton
            style={{ width: '100%' }}
            onPress={() => requestBackgroundPermission()}>
            Permitir
          </CustomButton>
        )
      }

      <CustomButton
        style={{ width: '100%' }}
        onPress={() => logout()}>
        Cancelar
      </CustomButton>
    </ContainerView>
  );
}
