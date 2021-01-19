import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
// import firebase from "firebase/app";

const AppContext = React.createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [editMode, setEditMode] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});

  const [showCreateModal, setShowCreateModal] = useState(false);

  //   Auth API
  async function signup(username, email, password) {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(`Signup Success with: ${result.user.uid}`);
        return db.collection("users").doc(result.user.uid).set({
          username: username,
          photoUrl:
            "https://miro.medium.com/max/790/1*reXbWdk_3cew69RuAUbVzg.png",
        });
      })
      .catch((e) => {
        setError(e.message);
      });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function signInWithGoogle() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return auth.signInWithPopup(provider);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setCurrentUser(null);
      } else {
        const userRef = db.collection("users").doc(user.uid);
        userRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setCurrentUser({ id: user.uid, ...doc.data() });
            } else {
              console.log("No such document!");
              setCurrentUser(null);
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  // Event API
  async function addOrEditEvent(event) {
    setError("");
    if (currentUser != null) {
      if (!editMode) {
        return db
          .collection("users")
          .doc(currentUser.id)
          .collection("events")
          .add(event);
      } else {
        // Update (Get Event By Id)
        // const docRef = await db
        //   .collection("users")
        //   .doc(currentUser.id)
        //   .collection("events")
        //   .doc(event.id)
        //   .get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       return docRef.set({
        //         eventTitle: event.eventTitle,
        //       });
        //     } else {
        //       console.log("No such document!");
        //     }
        //   })
        //   .catch((e) => {
        //     console.error("Error adding document: ", e);
        //   });
      }
    } else {
      setError("Please Authenticate");
    }
  }
  function getAllEvents() {
    return (
      db
        .collection("users")
        .doc(currentUser.id)
        // .doc("yV82QYzPrlXR9Pg8iEw1Xv9HX1p2")
        .collection("events")
        .get()
    );
  }

  // States
  const value = {
    currentUser,
    error,
    setError,
    signup,
    login,
    logout,
    signInWithGoogle,
    editMode,
    setEditMode,
    addOrEditEvent,
    showCreateModal,
    setShowCreateModal,
    currentEvent,
    setCurrentEvent,
    allEvents,
    getAllEvents,
    setAllEvents,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
}
