import { ExpoConfig, ConfigContext } from 'expo/config';

// O Expo CLI já carrega o .env automaticamente ao ler este arquivo.
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'dotrun',
  name: 'dotrun',
  version: '0.2.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#007A4F'
      }
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Permitir que $(PRODUCT_NAME) use sua localização.',
        locationWhenInUsePermission: 'Permitir que $(PRODUCT_NAME) use sua localização enquanto o app estiver aberto.',
        isAndroidBackgroundLocationEnabled: true,
        isAndroidForegroundServiceEnabled: true
      }
    ]
  ],
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.starttech.dotrun',
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#007A4F',
    },
    package: 'com.starttech.dotrun',
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    permissions: [
      'ACCESS_COARSE_LOCATION',
      'ACCESS_FINE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION',
      'FOREGROUND_SERVICE',
      'FOREGROUND_SERVICE_LOCATION'
    ],
  },
  extra: {
    eas: {
      projectId: '225b8a72-e8c8-4762-9f62-95196a5e4e87'
    }
  }
});
