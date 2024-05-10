import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAorIHjsWS6uKf9zXaJWmxFsfss3v_7ojM",
  authDomain: "web-cloud-ynov-cf825.firebaseapp.com",
  projectId: "web-cloud-ynov-cf825",
  storageBucket: "web-cloud-ynov-cf825.appspot.com",
  messagingSenderId: "935739998409",
  appId: "1:935739998409:web:52d370a02c6886cf4a4d18",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app);

export { auth, app };
