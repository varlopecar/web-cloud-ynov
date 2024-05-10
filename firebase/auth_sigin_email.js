import '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
export const signinwithmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            throw error;
        });
}