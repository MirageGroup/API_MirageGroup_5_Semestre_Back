import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAlqBplUXMYQOhocAMaIHiij-os0L7GHMA",
  authDomain: "api5-2.firebaseapp.com",
  databaseURL: "https://api5-2-default-rtdb.firebaseio.com",
  projectId: "api5-2",
  storageBucket: "api5-2.appspot.com",
  messagingSenderId: "313613866484",
  appId: "1:313613866484:web:5539df405944f0672915a1",
  measurementId: "G-NCPLHH0H4L"
}

export const app = initializeApp(firebaseConfig)
