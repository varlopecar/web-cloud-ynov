import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "../firebaseConfig";

const db = getFirestore(app);

export const getCommentsForPost = async (postId: string) => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where("postRef", "==", postId));
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((doc) => {
        comments.push(doc.data());
    });
    return comments;
};