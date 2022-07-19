import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyASoNZ9WSVHNO_mJiJyWSqxZL4PWD3tDqI",
  authDomain: "whatsapp-clone-893ce.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-893ce.firebaseio.com",
  projectId: "whatsapp-clone-893ce",
  storageBucket: "whatsapp-clone-893ce.appspot.com",
  messagingSenderId: "140929858125",
  appId: "1:140929858125:web:bcd759cf6ec8813b97fa04",
  measurementId: "G-8BNQ39S9EP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;