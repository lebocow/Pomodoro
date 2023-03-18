import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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

const usersRef = collection(db, "users");
const pomodorosRef = collection(db, "pomodoros");

export const createUserDocumentFromForm = async (
  displayName,
  email,
  userCredential
) => {
  const userDocRef = doc(usersRef, userCredential.user.uid);
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

export const createUserDocumentFromAuth = async (userCredential) => {
  const userDocRef = doc(usersRef, userCredential.user.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = userCredential.user;
      const createdAt = new Date();
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
  createUserDocumentFromAuth(userCredential);

  return userCredential;
};

export const authSignOut = async () => {
  await signOut(auth);
};

export const createPomodoroDocument = async (userCredential, workMinutes) => {
  const formatDate = () => {
    const date = new Date();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  };

  const docRef = await addDoc(pomodorosRef, {
    userId: userCredential.uid,
    startTime: new Date(),
    endTime: null,
    cycles: 0,
    workMinutes,
    displayDate: formatDate(),
    createdAt: new Date(),
  });

  return docRef;
};

export const updatePomodoroDocument = async (documentReference, cycles) => {
  const updateData = {
    endTime: new Date(),
  };

  if (cycles !== undefined) {
    updateData.cycles = cycles;
  }

  await updateDoc(documentReference, updateData);
};

export const deletePomodoroDocument = async (documentReference) => {
  await deleteDoc(documentReference);
};

const getStartTimestamp = (reportType) => {
  const now = new Date();
  const startTimestamp = new Date(now);

  switch (reportType) {
    case "Daily":
      startTimestamp.setHours(0, 0, 0, 0);
      break;
    case "Weekly":
      const dayOfWeek = now.getDay();
      const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      startTimestamp.setDate(diff);
      startTimestamp.setHours(0, 0, 0, 0);
      break;
    case "Monthly":
      startTimestamp.setDate(1);
      startTimestamp.setHours(0, 0, 0, 0);
      break;
    case "Yearly":
      startTimestamp.setMonth(0, 1);
      startTimestamp.setHours(0, 0, 0, 0);
    default:
      break;
  }

  return startTimestamp;
};

export const fetchReportData = async (userCredential, reportType) => {
  const startTimestamp = getStartTimestamp(reportType);

  const q = query(
    pomodorosRef,
    where("userId", "==", userCredential.uid),
    where("createdAt", ">=", startTimestamp),
    orderBy("createdAt", "asc")
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data;
};

export const fetchRankingData = async () => {
  const q = query(pomodorosRef, orderBy("workMinutes", "desc"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data;
};
