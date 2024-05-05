import "../firebaseConfig";
import { getDoc, doc, getFirestore } from "firebase/firestore";
const db = getFirestore();

export const getOnePostData = async (id) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.log("No such document!");
    }
}