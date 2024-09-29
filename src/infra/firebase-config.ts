import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import * as dotenv from 'dotenv'

dotenv.config()

const API_KEY_FIREBASE: any = process.env.API_KEY_FIREBASE;
const AUTH_DOMAIN: any = process.env.AUTH_DOMAIN;
const DATABASE_URL: any = process.env.DATABASE_URL;
const PROJECT_ID: any = process.env.PROJECT_ID;
const STORAGE_BUCKET: any = process.env.STORAGE_BUCKET;
const MESSAGING_SEND_ID: any = process.env.MESSAGING_SEND_ID;
const APP_ID: any = process.env.APP_ID;
const MEASUREMENT_ID: any = process.env.MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SEND_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
