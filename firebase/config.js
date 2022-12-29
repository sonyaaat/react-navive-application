
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDqIXhMGzVa-WAzcoaYKYuZQka5dKznoSI",
    authDomain: "publications-app1.firebaseapp.com",
    projectId: "publications-app1",
    storageBucket: "publications-app1.appspot.com",
    messagingSenderId: "763431171255",
    appId: "1:763431171255:web:89755d177233861cf94932",
    measurementId: "G-XQJZ4N91YY"
  };
  export default firebase.initializeApp(firebaseConfig);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export default initializeApp(firebaseConfig)