import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjF16WEbFuJLYC7cDgNwvtMTAt7XTrYHo",
  authDomain: "isecon-ee0a6.firebaseapp.com",
  projectId: "isecon-ee0a6",
  storageBucket: "isecon-ee0a6.appspot.com",
  messagingSenderId: "673028947501",
  appId: "1:673028947501:web:fd22614f779df9f7f4c2a4",
  measurementId: "G-13ZP4X94PC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
