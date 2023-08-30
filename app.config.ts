import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: '.run',
  name: '.run',
  version: '0.2.0',
  orientation: 'portrait',
  icon: "./assets/images/icon.png",
  userInterfaceStyle: 'light',
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#007A4F"
  },
  plugins: [
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Permitir que $(PRODUCT_NAME) use sua localização.",
        isAndroidBackgroundLocationEnabled: true
      }
    ]
  ],
  assetBundlePatterns: [
    "**/*"
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
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "FOREGROUND_SERVICE",
      "ACCESS_BACKGROUND_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.FOREGROUND_SERVICE",
      "android.permission.ACCESS_BACKGROUND_LOCATION"
    ],
  },
  extra: {
    eas: {
      projectId: "225b8a72-e8c8-4762-9f62-95196a5e4e87"
    }
  }
});