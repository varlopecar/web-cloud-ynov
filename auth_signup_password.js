import "./firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up successfully", user);
        return user;
    } catch (error) {
        console.error("Error signing up:", error);
        return error;
    }
}