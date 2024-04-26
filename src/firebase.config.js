import {getApp, getApps, initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAlaykVzh52BRkWYOYXCZX2Y1Fmq3khO0k", 
    authDomain: "food90-fec3b.firebaseapp.com", 
    databaseURL: "https://food90-fec3b-default-rtdb.firebaseio.com", 
    projectId: "food90-fec3b", 
    storageBucket: "food90-fec3b.appspot.com", 
    messagingSenderId: "874288199641", 
    appId: "1:874288199641:web:60b2d576a5cdda7ec4cbc8", 
    measurementId: "G-WS8VDWS510"
  };
  
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore,storage}