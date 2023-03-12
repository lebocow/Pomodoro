import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9CA7ecx9OwmunbFK9JhOcdObGhPv20TY",
  authDomain: "pomodoro-cef9c.firebaseapp.com",
  projectId: "pomodoro-cef9c",
  storageBucket: "pomodoro-cef9c.appspot.com",
  messagingSenderId: "654785427791",
  appId: "1:654785427791:web:a1976c0273bb744fbd6d3a",
  measurementId: "G-DLNY9E0DKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const createUserDocumentFromForm = async (
  displayName,
  email,
  userCredential
) => {
  const userDocRef = doc(db, "users", userCredential.user.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  return userSnapshot;
};

export const authSignInWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const authSignUpWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserDocumentFromForm(displayName, email, userCredential);
  return userCredential.user;
};

export const authWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential;
};

export const authSignOut = async () => {
  await signOut(auth);
};
