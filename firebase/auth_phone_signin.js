import app from "../firebaseConfig";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth();
console.log("Auth: ", auth);

export const signin = async (phoneNumber) => {
    try {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("Recaptcha response: ", response);
            },
            'expired-callback': () => {
                console.log("Recaptcha expired");
            }
        });
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        window.confirmationResult = confirmationResult;
        return confirmationResult;
    } catch (error) {
        console.error(error);
        return error;
    }
}