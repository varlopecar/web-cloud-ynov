import "../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadToFirebase = async (uri, name) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = await uploadBytes(imageRef, theBlob);

    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
};