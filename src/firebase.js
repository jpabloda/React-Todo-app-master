import firebase from "firebase";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgai-Q9U-Mhi8GWIvePtBQ3hbrqGtexCE",
  authDomain: "todo-30f0d.firebaseapp.com",
  databaseURL: "https://todo-30f0d-default-rtdb.firebaseio.com",
  projectId: "todo-30f0d",
  storageBucket: "todo-30f0d.appspot.com",
  messagingSenderId: "35537129092",
  appId: "1:35537129092:web:7394b6e6dcfd2d4ed97cd1",
  measurementId: "G-2H0FBSHF0B"
});
// Initialize Firebase
const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default db;
