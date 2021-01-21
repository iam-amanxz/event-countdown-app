import React, { useContext, useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    setCurrentUser(JSON.parse(localStorage.getItem("authUser")));
    console.log("authUser", currentUser);

    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        const userRef = db.collection("users").doc(user.uid);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userObject = { id: user.uid, ...doc.data() };
              setCurrentUser(userObject);
              localStorage.setItem("authUser", JSON.stringify(userObject));
              console.log("authUser", currentUser);
            } else {
              console.log("No such document!");
              localStorage.removeItem("authUser");
              setCurrentUser(null);
              console.log("authUser", currentUser);
            }
          })
          .catch((e) => {
            setError(e);
            console.log("Error getting document:", e);
          });
      },
      () => {
        localStorage.removeItem("authUser");
        setCurrentUser(null);
        console.log("authUser", currentUser);
      }
    );
    setLoading(false);
    return unsubscribe;
  }, []);

  // Event API
  async function addEvent(event) {
    setError("");
    if (currentUser != null) {
      return db
        .collection("users")
        .doc(currentUser.id)
        .collection("events")
        .add(event);
    } else {
      setError("Please Authenticate");
    }
  }
  function getAllEvents() {
    return db
      .collection("users")
      .doc(currentUser.id)
      .collection("events")
      .orderBy("createdAt", "desc")
      .get();
  }
  const fetchAllEvents = async () => {
    try {
      let events = [];
      await getAllEvents()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() });
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
      setAllEvents(events);
      setCurrentEvent(events[0]);
    } catch (e) {
      console.log(e);
    }
  };

  function deleteEvent() {
    return db
      .collection("users")
      .doc(currentUser.id)
      .collection("events")
      .doc(currentEvent.id)
      .delete();
  }

  function uploadBackgroundImage(imageAsFile) {
    return storage
      .ref(
        `backgroundImages/${currentUser.id}/${currentEvent.id}/${imageAsFile.name}`
      )
      .put(imageAsFile);
  }

  // States
  const value = {
    uploadBackgroundImage,
    currentUser,
    error,
    deleteEvent,
    setError,
    signup,
    login,
    logout,
    signInWithGoogle,
    editMode,
    setEditMode,
    addEvent,
    showCreateModal,
    setShowCreateModal,
    currentEvent,
    setCurrentEvent,
    allEvents,
    getAllEvents,
    setAllEvents,
    fetchAllEvents,
    showDeleteModal,
    setShowDeleteModal,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
}
