import '../firebaseConfig'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth();
console.log(auth);

export const signin = async (phoneNumber) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            console.log("recaptcha allowed")
            console.log(response)
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...

            console.log("recaptcha not allowed")
            console.log("expired-callback")
        }
    });
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult)
            return confirmationResult;
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("SMS not sent")
            console.log(error);
        });
};