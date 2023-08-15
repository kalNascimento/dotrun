import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKER,
  FIREBASE_MESSAGING_SEND_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId:  FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKER,
  messagingSenderId: FIREBASE_MESSAGING_SEND_ID,
  appId:  FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };