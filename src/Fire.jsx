
import firebase from 'firebase'

const  firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyDQgVaqEYcU5SZVQZ9ZkZFoDm0VfXstn80",
  authDomain: "shopiumx.firebaseapp.com",
  projectId: "shopiumx",
  storageBucket: "shopiumx.appspot.com",
  messagingSenderId: "133860360461",
  appId: "1:133860360461:web:d3c8d72848805afc5ff044",
  measurementId: "G-QSHVD9CVZ2"
});

const db= firebaseApp.firestore()
const Fire = firebaseApp
export  {db, Fire}
