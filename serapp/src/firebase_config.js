import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import 'firebase/messaging';

const firebaseConfig = {
    /*
    apiKey: "AIzaSyATFDa-m2MiTrB06R2sSwMUue3Y3yy446E",
    authDomain: "serapp-9cfe3.firebaseapp.com",
    databaseURL: "https://serapp-9cfe3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "serapp-9cfe3",
    storageBucket: "serapp-9cfe3.firebasestorage.app",
    messagingSenderId: "105119013227",
    appId: "1:105119013227:web:6b70a3e2ce7d3bd41f142e",
    measurementId: "G-1ETYH8NY17"
    */
};

const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, ref, get, set, onValue, sendEmailVerification };
