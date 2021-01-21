// import React from "react";

// const withAuthentication = (component) => {
//   const WithAuthentication = () => {
//     const [authUser, setAuthUser] = useState(
//       JSON.parse(localStorage.getItem("authUser"))
//     );
//     useEffect(() => {
//       const unsubscribe = auth.onAuthStateChanged(
//         (user) => {
//           const userRef = db.collection("users").doc(user.uid);
//           userRef
//             .get()
//             .then((doc) => {
//               if (doc.exists) {
//                 const userObject = { id: user.uid, ...doc.data() };
//                 setAuthUser(userObject);
//                 localStorage.setItem("authUser", JSON.stringify(userObject));
//               } else {
//                 console.log("No such document!");
//                 localStorage.removeItem("authUser");
//                 setAuthUser(null);
//               }
//             })
//             .catch((e) => {
//               console.log("Error getting document:", e);
//             });
//         },
//         () => {
//           localStorage.removeItem("authUser");
//           setAuthUser(null);
//         }
//       );
//       return unsubscribe;
//     }, []);
//   };

//   return <div></div>;
// };

// export default withAuthentication;
