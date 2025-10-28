import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBAAmwqQ_X96aCL3iFwrpSc7JxrO32WaiY",
    authDomain: "pelicanpoint-a3087.firebaseapp.com",
    projectId: "pelicanpoint-a3087",
    storageBucket: "pelicanpoint-a3087.appspot.com",
    messagingSenderId: "551865495912",
    appId: "1:551865495912:web:95e35bf225684c27e866dd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };