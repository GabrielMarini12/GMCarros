import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOZkXJzuH_mMHSc_d3l16xzHG6yqaRX0M",
  authDomain: "gmcarros-b08b0.firebaseapp.com",
  projectId: "gmcarros-b08b0",
  storageBucket: "gmcarros-b08b0.appspot.com",
  messagingSenderId: "656443950781",
  appId: "1:656443950781:web:5c3481c3acd6d30c2299d4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
