import { getAuth, signInWithPopup, GithubAuthProvider} from "firebase/auth";

const provider = new GithubAuthProvider();
const auth = getAuth();

export const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in with Github successfully", user);

        return user;
    } catch (error) {
        console.error("Error signing in with Github:", error);
        return error;
    }
}
