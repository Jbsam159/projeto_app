import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRXUvqWopYo-_oPCBvVUEfhM-0Pyo_PZs",
  authDomain: "getapet-58819.firebaseapp.com",
  projectId: "getapet-58819",
  storageBucket: "getapet-58819.appspot.com",
  messagingSenderId: "479555233364",
  appId: "1:479555233364:web:598e292040c4915bc02fc1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
