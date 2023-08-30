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
import { CustomOutlineButton } from '@buttons/CustomOutlineButton';

const ForegroundRequestText = (requestButton: React.ReactNode) => {
  return (
    <>
      <ExplanatoryText>
        Para podermos fazer da marcação de percursos, solicitamos permissão de acesso à localização em primeiro plano. 
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
        Para podermos fazer da marcação de percursos mesmo com a tela do aparelho desligada, 
        solicitamos permissão de acesso à localização em segundo plano. Selecione a opção 
        "Permitir o tempo todo"
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
    if (foregroundPermission?.granted) {
      if (backgroundPermission?.granted) {
        navigation.navigate('Home' as never)
      }
    }
  }, [foregroundPermission, backgroundPermission]);

  return (
    <ContainerView>
      {
        !foregroundPermission?.granted &&
        ForegroundRequestText(
          <CustomOutlineButton
            style={{ width: '100%' }}
            onPress={() => requestForegroundPermission()}>
            Permitir
          </CustomOutlineButton>
        )
      }
      {
        foregroundPermission?.granted &&
        !backgroundPermission?.granted &&
        BackgroundRequestText(
          <CustomOutlineButton
            style={{ width: '100%' }}
            onPress={() => requestBackgroundPermission()}>
            Permitir
          </CustomOutlineButton>
        )
      }
      {
        foregroundPermission?.granted &&
        backgroundPermission?.granted &&
        <ExplanatoryText>
          Aguarde...
        </ExplanatoryText>
      }

      <CustomOutlineButton
        style={{ width: '100%' }}
        onPress={() => logout()}>
        Sair
      </CustomOutlineButton>
    </ContainerView>
  );
}
