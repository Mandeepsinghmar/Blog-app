import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBXlZdzvlzxATKxuVQgB292SXTCBQ6Diws",
  authDomain: "blog-app-5793c.firebaseapp.com",
  projectId: "blog-app-5793c",
  storageBucket: "blog-app-5793c.appspot.com",
  messagingSenderId: "887435381544",
  appId: "1:887435381544:web:039ec47c4747d2e2595e1d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
