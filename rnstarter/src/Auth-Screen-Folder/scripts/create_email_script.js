import { auth } from "../../firebase_config";
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { error_text } from "../components/register_screen";

export async function create_email(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
    } catch (e) {
        console.log(e);
        if (e == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
            error_text = 'Girdiğiniz email ge.erli değildir.';
        }
    }
}