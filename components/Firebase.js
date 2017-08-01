import React from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBshI0DN8DmkDTGiq7_Wj1cBAsYnjCtfkk",
    authDomain: "chore-share.firebaseapp.com",
    databaseURL: "https://chore-share.firebaseio.com",
    projectId: "chore-share",
    storageBucket: "chore-share.appspot.com",
    messagingSenderId: "607979940389"
};

firebase.initializeApp(firebaseConfig);