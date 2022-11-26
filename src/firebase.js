// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
 getAuth}
 from "firebase/auth";
import { getStorage } from "firebase/storage"; */
import { initializeApp } from "firebase/app";
//import firebase from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
//import {} from 'firebase/initializeApp';
//import 'firebase/storage';
//import {} from 'firebase/auth';
//import firestore from 'firebase/firestore';
// {initializeApp, auth, storage} from 
 const firebaseConfig = {
 // const firebaseConfig = {
   apiKey: "AIzaSyCjp1xWVrp7oGyxeArlmooUpksvFHFnvmE",
   authDomain: "instagram-clone-77162.firebaseapp.com",
   databaseURL: "https://instagram-clone-77162-default-rtdb.firebaseio.com",
   projectId: "instagram-clone-77162",
   storageBucket: "instagram-clone-77162.appspot.com",
   messagingSenderId: "291936164087",
   appId: "1:291936164087:web:fa2e71b602466bba39dbf2",
   measurementId: "G-N8KBC2F62F"
 };

 const app = initializeApp(firebaseConfig);
  const db= getFirestore();
  const auth = getAuth();
  const storage = getStorage();
  //const app = initializeApp(firebaseConfig);
  //const db = getFirestore(app);
  //const auth = getAuth();
  //const storage = getStorage(app);
  export { db, auth, storage };

 // export default db;