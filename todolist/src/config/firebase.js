import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDAhPBoGnff-8dEkWDG1yxa_0_LfqrszVI",
    authDomain: "todolist-f813a.firebaseapp.com",
    databaseURL: "https://todolist-f813a.firebaseio.com",
    projectId: "todolist-f813a",
    storageBucket: "todolist-f813a.appspot.com",
    messagingSenderId: "800553814905",
    appId: "1:800553814905:web:e9635325e64710d3f3bda8",
    measurementId: "G-KYTQ6YFP6Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const db = firebase.database();
export const auth = firebase.auth();
export const messaging = firebase.messaging();
export default firebase;