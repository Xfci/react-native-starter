import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import 'firebase/messaging';

const firebaseConfig = {
    //...
};

const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, ref, get, set, onValue, sendEmailVerification };
