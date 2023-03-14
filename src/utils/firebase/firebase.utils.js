import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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
} from "firebase/firestore";

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
  const docRef = await addDoc(pomodorosRef, {
    userId: userCredential.uid,
    startTime: new Date(),
    endTime: null,
    cycles: 0,
    workMinutes,
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

// export const createUserData = async () => {
//   const userRef = doc(db, "users", "2355ds1");
//   const pomodorosRef = collection(userRef, "pomodoros");

//   try {
//     await setDoc(userRef, {
//       createdAt: new Date("March 11, 2023 2:25:16 PM UTC+2"),
//       displayName: "Ursachianu Alex",
//       email: "tzmic1@gmail.com",
//     });

//     const year = new Date().getFullYear().toString();
//     const yearRef = doc(pomodorosRef, year);

//     // await setDoc(yearRef, {});

//     const marchRef = doc(yearRef, "months", "March");
//     const aprilRef = doc(yearRef, "months", "April");

//     // await setDoc(marchRef, {});
//     // await setDoc(aprilRef, {});

//     const marchTasksRef = collection(marchRef, "tasks");
//     const aprilTasksRef = collection(aprilRef, "tasks");

//     await addDoc(marchTasksRef, {
//       start_time: new Date("March 11, 2023 10:00:00 AM UTC+2"),
//       end_time: new Date("March 11, 2023 10:25:00 AM UTC+2"),
//       duration: 150,
//     });

//     await addDoc(marchTasksRef, {
//       start_time: new Date("March 11, 2023 10:30:00 AM UTC+2"),
//       end_time: new Date("March 11, 2023 10:55:00 AM UTC+2"),
//       duration: 150,
//     });

//     await addDoc(aprilTasksRef, {
//       start_time: new Date("April 1, 2023 9:00:00 AM UTC+2"),
//       end_time: new Date("April 1, 2023 9:25:00 AM UTC+2"),
//       duration: 150,
//     });

//     await addDoc(aprilTasksRef, {
//       start_time: new Date("April 1, 2023 9:30:00 AM UTC+2"),
//       end_time: new Date("April 1, 2023 9:55:00 AM UTC+2"),
//       duration: 150,
//     });
//   } catch (error) {
//     console.error("Error creating user data", error);
//   }
// };

// // createUserData();

// export const getUserData = async () => {
//   const userRef = doc(db, "users", "2355ds1");
//   const userDoc = await getDoc(userRef);
//   const userData = userDoc.exists() ? userDoc.data() : {};

//   const year = new Date().getFullYear().toString();
//   const pomodorosRef = collection(userRef, "pomodoros");
//   const yearRef = doc(pomodorosRef, year);
//   const yearDoc = await getDoc(yearRef);
//   const yearData = yearDoc.exists() ? yearDoc.data() : {};

//   const monthDocs = await getDocs(collection(yearRef, "months"));

//   const data = {
//     createdAt: userData.createdAt,
//     displayName: userData.displayName,
//     email: userData.email,
//     pomodoros: {},
//   };

//   // Construct an array of promises for each month's tasks
//   const taskPromises = monthDocs.docs.map(async (monthDoc) => {
//     const monthData = monthDoc.data();
//     const tasksDocs = collection(monthDoc.ref, "tasks");
//     const taskDocsSnapshot = await tasksDocs.get();

//     const tasks = taskDocsSnapshot.docs.map((taskDoc) => {
//       const taskData = taskDoc.data();
//       return taskData;
//     });

//     // Return an object with the month ID and tasks array
//     return {
//       monthId: monthData.id,
//       tasks: tasks,
//     };
//   });

//   // Wait for all the task promises to resolve
//   const tasksData = await Promise.all(taskPromises);

//   // Construct the pomodoros object using the tasks data
//   tasksData.forEach((taskMonthData) => {
//     data.pomodoros[taskMonthData.monthId] = {
//       tasks: taskMonthData.tasks,
//     };
//   });

//   return data;
// };

// const data = await getUserData();
// console.log(data);

// await addDoc(pomodorosRef, {
//   userId: "2355ds1",
//   startTime: new Date(),
//   endTime: null,
//   duration: null,
//   createdAt: new Date(),
// });

// const data = query(tasksRef, orderBy("starTime", "asc"));
// getDocs(data)
//   .then((querySnapshot) => {
//     console.log(querySnapshot.empty);
//     if (querySnapshot.empty) {
//       console.log("The 'tasks' subcollection is empty");
//     } else {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, "=>", doc.data());
//       });
//     }
//   })
//   .catch((error) => {
//     console.error("Error getting documents:", error);
//   });

// const usersRef = collection(db, "users");

// Query the "users" collection to get the last document reference
// const data = query(usersRef, orderBy("createdAt", "desc"));
// getDocs(data)
//   .then((querySnapshot) => {
//     if (querySnapshot.empty) {
//       console.log("The collection is empty");
//     } else {
//       console.log(querySnapshot);
//       const lastDocRef = querySnapshot.docs[0].ref;
//       console.log("The last document reference is:", lastDocRef.path);
//     }
//   })
//   .catch((error) => {
//     console.error("Error getting documents:", error);
//   });

// await addDoc(tasksRef, {
//   startTime: new Date(),
//   endTime: "asta e ultimul",
//   duration: null,
//   completedTasks: [],
//   test: {},
// });

// updateDoc(taskDocRef, {
//   startTime: new Date(),
//   endTime: "acu 5 minute",
// });

// const usersRef = collection(db, "users");
// const usersQuerySnapshot = await getDocs(usersRef);

// usersQuerySnapshot.forEach((doc) => {
//   console.log(`${doc.id}`);
//   console.log(doc.data());
// });

// const tasksQuerySnapshop = await getDocs(tasksRef);
// tasksQuerySnapshop.forEach((doc) => {
//   console.log(`${doc.id}`);
//   console.log(doc.data());
// });

// const pomodorosRef = doc(usersRef, "2023", "months");
// const pomodorosSnap = await getDoc(pomodorosRef);

// if (pomodorosSnap.exists()) {
//   console.log("Pomodoros data:", pomodorosSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// const tasksRef = collection(
//   db,
//   "users",
//   "2355ds1",
//   "pomodoros",
//   "2023",
//   "months",
//   "April",
//   "tasks"
// );
// const tasksSnapshot = await getDocs(tasksRef);

// tasksSnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });
