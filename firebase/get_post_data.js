import '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const db = getFirestore();

export const getPostData = async (): SetStateAction<never[]> => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    let res = querySnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    return res;
}