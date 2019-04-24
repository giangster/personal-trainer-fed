import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2MNRJkQ7guC_EyvqBwOcnrAC31rJ_Vpo",
  authDomain: "personal-training-fed.firebaseapp.com",
  databaseURL: "https://personal-training-fed.firebaseio.com",
  projectId: "personal-training-fed",
  storageBucket: "personal-training-fed.appspot.com",
  messagingSenderId: "853730234014"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
