import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1S9VCmrS6eaZvx_mLXzgl73wa8baPuP0",
  authDomain: "react-firebase-blog-app-28249.firebaseapp.com",
  projectId: "react-firebase-blog-app-28249",
  storageBucket: "react-firebase-blog-app-28249.appspot.com",
  messagingSenderId: "141567946778",
  appId: "1:141567946778:web:4567fa0e25fe45670121a3",
};

firebase.initializeApp(firebaseConfig);
const { FieldValue } = firebase.firestore;
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope("bio");
// provider.addScope("backgroundImage");
// provider.addScope("websiteUrl");
// provider.addScope("Location");
// provider.addScope("CurrentlyLearning");
// provider.addScope("Skills");
// provider.addScope("Work");
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, provider, FieldValue, storage, timestamp };
