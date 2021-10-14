import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import "firebase/compat/database"
import "firebase/compat/auth"
import "firebase/compat/storage"
const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyATuj1EWZQq6_MStCU-i__N94NEDzdageE",

    authDomain: "my-new-app-9eadd.firebaseapp.com",

    databaseURL: "https://my-new-app-9eadd-default-rtdb.firebaseio.com",

    projectId: "my-new-app-9eadd",

    storageBucket: "my-new-app-9eadd.appspot.com",

    messagingSenderId: "559047210466",

    appId: "1:559047210466:web:f966d79d5e0b920b2335bb"

  });
  // Initialize Firebase
  const db = firebaseApp.firestore()
  const db0 = firebaseApp.database()
  const storage=firebaseApp.storage()
  const auth = firebase.auth()
  
  export  {db,db0,auth,storage}