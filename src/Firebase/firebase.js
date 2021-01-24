import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const config = {
  apiKey: "AIzaSyB-ovvTHyugbMcaOh2m5WmrH41K8cslumQ",
  authDomain: "event-countdwon.firebaseapp.com",
  projectId: "event-countdwon",
  storageBucket: "event-countdwon.appspot.com",
  messagingSenderId: "58867007839",
  appId: "1:58867007839:web:ee1a45aebb6e72511836ea",
  measurementId: "G-PZ9RLVC8DZ",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.fieldValue = app.firestore.FieldValue;
  }

  //   Auth API ************************************
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  log = () => {
    console.log("works");
  };

  // User API
  addUserToDb = (username, userId) =>
    this.db.collection("users").doc(userId).set({
      username: username,
      avatarUrl:
        "https://cultureamp.design/static/a489d86dba895745f93a8d1268fe713f/avatar.svg",
    });

  user = (uid) => this.db.doc(`users/${uid}`);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data();
            authUser = {
              id: authUser.uid,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  uploadAvatarImage = (imageAsFile) =>
    this.storage.ref(`avatarImages/${imageAsFile.name}`).put(imageAsFile);

  getAvatarImageUrl = (imageAsFile) =>
    this.storage.ref(`avatarImages`).child(imageAsFile.name).getDownloadURL();

  updateAvatarUrl = (avatarUrl, uid) =>
    this.db.collection("users").doc(uid).update({ avatarUrl: avatarUrl });

  //   Event API ************************************
  uploadBackGroundImage = (imageAsFile) =>
    this.storage.ref(`backgroundImages/${imageAsFile.name}`).put(imageAsFile);

  getBackgroundImageUrl = (imageAsFile) =>
    this.storage
      .ref(`backgroundImages`)
      .child(imageAsFile.name)
      .getDownloadURL();

  getAllEvents = (uid) =>
    this.db
      .collection("users")
      .doc(uid)
      .collection("events")
      .orderBy("createdAt", "desc")
      .get();

  addEvent = (event, uid) =>
    this.db.collection("users").doc(uid).collection("events").add(event);

  deleteEvent = (userId, eventId) =>
    this.db
      .collection("users")
      .doc(userId)
      .collection("events")
      .doc(eventId)
      .delete();

  updateEvent = (eventId, updatedData, uid) =>
    this.db
      .collection("users")
      .doc(uid)
      .collection("events")
      .doc(eventId)
      .update(updatedData);
}

export default Firebase;
