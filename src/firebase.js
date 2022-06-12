import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyCPyoGczT62mz0w9PvN8QcZrkkc1h9f0Y0",
    authDomain: "social-chat-f8389.firebaseapp.com",
    databaseURL: "http://social-chat-f8389.firebaseio.com",
    projectId: "social-chat-f8389",
    storageBucket: "social-chat-f8389.appspot.com",
    messagingSenderId: "319968838114",
    appId: "1:319968838114:web:bef06a65b15c506090f9bb",
    measurementId: "G-GWBL0K5BCQ"
});

// Initialize Firebase
const db = firebase.firestore();

export { app, db };