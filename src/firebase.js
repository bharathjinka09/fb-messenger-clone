import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAO39t-rUj2kF6rPWKC4uwLDUxITxRXrwc",
  authDomain: "fb-messenger-clone-68787.firebaseapp.com",
  databaseURL: "https://fb-messenger-clone-68787.firebaseio.com",
  projectId: "fb-messenger-clone-68787",
  storageBucket: "fb-messenger-clone-68787.appspot.com",
  messagingSenderId: "458310203504",
  appId: "1:458310203504:web:fc86681d5c80092775dcb5",
  measurementId: "G-MZQ30710PG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();

export default db;