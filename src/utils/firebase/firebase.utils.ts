import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
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
  User,
  UserCredential,
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

export type PomodoroData = {
  userId: string;
  startTime: Date;
  endTime: Date | null;
  cycles: number;
  workMinutes: number;
  displayDate: string;
  createdAt: Date;
  totalWorkTime: number;
};

export type UserData = {
  displayName: string;
  email: string;
  createdAt: Date;
  photoURL?: string;
};

export type RankingData = {
  userId: string;
  totalWorkingMinutes: number;
  photoURL: string;
  displayName: string;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const usersRef = collection(db, "users");
const pomodorosRef = collection(db, "pomodoros");

export const createUserDocumentFromForm = async (
  displayName: string,
  email: string,
  userCredential: UserCredential
): Promise<DocumentSnapshot<UserData>> => {
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
  return userSnapshot as DocumentSnapshot<UserData>;
};

export const createUserDocumentFromAuth = async (
  userCredential: UserCredential
): Promise<DocumentSnapshot<DocumentData>> => {
  const userDocRef = doc(usersRef, userCredential.user.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      const { displayName, email, photoURL } = userCredential.user;
      const createdAt = new Date();
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        photoURL,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  return userSnapshot;
};

export const authSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const authSignUpWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserDocumentFromForm(displayName, email, userCredential);
  return userCredential.user;
};

export const authWithGoogle = async (): Promise<UserCredential> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  createUserDocumentFromAuth(userCredential);

  return userCredential;
};

export const authSignOut = async (): Promise<void> => {
  await signOut(auth);
};

export const createPomodoroDocument = async (
  user: User,
  workMinutes: number
): Promise<DocumentReference> => {
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
    userId: user.uid,
    startTime: new Date(),
    endTime: null,
    cycles: 0,
    workMinutes,
    displayDate: formatDate(),
    createdAt: new Date(),
  });

  return docRef;
};

export const updatePomodoroDocument = async (
  documentReference: DocumentReference,
  cycles: number | undefined
) => {
  const updateData: { endTime: Date; cycles?: number } = {
    endTime: new Date(),
  };

  if (cycles !== undefined) {
    updateData.cycles = cycles;
  }

  await updateDoc(documentReference, updateData);
};

export const deletePomodoroDocument = async (
  documentReference: DocumentReference
): Promise<void> => {
  await deleteDoc(documentReference);
};

const getStartTimestamp = (reportType: string): Date => {
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

export const fetchReportData = async (
  userCredential: User,
  reportType: string
): Promise<PomodoroData[]> => {
  const startTimestamp = getStartTimestamp(reportType);

  const q = query(
    pomodorosRef,
    where("userId", "==", userCredential.uid),
    where("createdAt", ">=", startTimestamp),
    orderBy("createdAt", "asc")
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      userId: docData.userId,
      startTime: docData.startTime.toDate(),
      endTime: docData.endTime ? docData.endTime.toDate() : null,
      cycles: docData.cycles,
      workMinutes: docData.workMinutes,
      displayDate: docData.displayDate,
      createdAt: docData.createdAt.toDate(),
    } as PomodoroData;
  });

  return data as PomodoroData[];
};

export const fetchRankingData = async (): Promise<RankingData[]> => {
  const q = query(pomodorosRef);
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  const userTotals = {};

  data.forEach((pomodoroData) => {
    const { userId, cycles, workMinutes } = pomodoroData as PomodoroData;
    const totalWorkingMinutes = cycles * workMinutes;

    if (userTotals[userId]) {
      userTotals[userId].totalWorkingMinutes += totalWorkingMinutes;
    } else {
      userTotals[userId] = {
        userId,
        totalWorkingMinutes,
      };
    }
  });

  const rankingData: Array<{
    userId: string;
    totalWorkingMinutes: number;
    photoURL: string;
    displayName: string;
  }> = [];

  for (const userId in userTotals) {
    const userDocRef = doc(usersRef, userId);
    const userSnapshot = await getDoc(userDocRef);
    const userData = userSnapshot.data();

    if (userData) {
      const { displayName, photoURL } = userData as {
        displayName: string;
        photoURL: string;
      };

      rankingData.push({
        ...userTotals[userId],
        photoURL,
        displayName,
      });
    }
  }

  rankingData.sort((a, b) => b.totalWorkingMinutes - a.totalWorkingMinutes);

  return rankingData.slice(0, 10);
};
