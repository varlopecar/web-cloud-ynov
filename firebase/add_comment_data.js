import app from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export const createComment = async (text, createdBy, postRef) => {
  try {
    // Add the document to the collection
    const newDocRef = await addDoc(collection(db, 'comments'), {
      text, createdBy, date: new Date(), postRef
    });

    // Log the document ID
    console.log('New document added with ID:', newDocRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
