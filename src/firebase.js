import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBbTSwlWsPQPEhc-63K0gF6WXaW2SMGHOU",
  authDomain: "linkedin-clone-7ac2b.firebaseapp.com",
  projectId: "linkedin-clone-7ac2b",
  storageBucket: "linkedin-clone-7ac2b.appspot.com",
  messagingSenderId: "924850544719",
  appId: "1:924850544719:web:4f7670af35ab9f66560a3a",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
