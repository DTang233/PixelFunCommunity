import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdAqHhcyJ7ldXK7X7ykM3fPeWLvNgLfKY",
  authDomain: "pixelfun-8f53a.firebaseapp.com",
  databaseURL: "https://pixelfun-8f53a.firebaseio.com",
  projectId: "pixelfun-8f53a",
  storageBucket: "pixelfun-8f53a.appspot.com",
  messagingSenderId: "38316071653",
  appId: "1:38316071653:ios:64bafc170abedb1a41d20c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
