import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();
const verifier = window.recaptchaVerifier;

export const signin = async (phoneNumber) => {
    try {
        console.log("Phone number: ", phoneNumber);
        console.log("Verifier: ", verifier);
        console.log("Auth: ", auth);
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);

        console.log(confirmationResult);

        return confirmationResult;
    } catch (error) {
        console.error(error);
    }
}