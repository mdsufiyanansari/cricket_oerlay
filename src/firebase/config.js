import { initializeApp } from "firebase/app";

import {
  getDatabase,
  ref,
  get,
  onValue,
  update,
} from "firebase/database";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { getAuth } from "firebase/auth";


// FIREBASE CONFIG
const firebaseConfig = {

  apiKey: "AIzaSyAJGUlIQmugfQcNLcYrYXMQoSiv1A7JQR8",

  authDomain:
    "cricketoverlay-a04f5.firebaseapp.com",

  databaseURL:
    "https://cricketoverlay-a04f5-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
    "cricketoverlay-a04f5",

  storageBucket:
    "cricketoverlay-a04f5.firebasestorage.app",

  messagingSenderId:
    "691907032643",

  appId:
    "1:691907032643:web:4885af5fc19282a6ee86f6",

};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);


// EXPORTS
export const db = getDatabase(app);

export const storage = getStorage(app);

export const auth = getAuth(app);


// UPDATE MATCH
export const updateMatch = async (
  matchData
) => {

  try {

    await update(
      ref(db, "match/live"),
      matchData
    );

    return {
      success: true,
    };

  } catch (error) {

    console.error(
      "Error updating match:",
      error
    );

    return {
      success: false,
      error,
    };

  }

};


// GET MATCH DATA
export const getMatchData = async () => {

  try {

    const snapshot = await get(
      ref(db, "match/live")
    );

    return snapshot.val() || null;

  } catch (error) {

    console.error(
      "Error fetching match:",
      error
    );

    return null;

  }

};


// REALTIME LISTENER
export const onMatchUpdate = (
  callback
) => {

  return onValue(
    ref(db, "match/live"),
    (snapshot) => {

      callback(snapshot.val());

    }
  );

};


// UPLOAD PLAYER IMAGE
export const uploadPlayerImage =
  async (file, playerName) => {

    try {

      const fileRef = storageRef(
        storage,
        `players/${playerName}-${Date.now()}`
      );

      await uploadBytes(
        fileRef,
        file
      );

      const url =
        await getDownloadURL(fileRef);

      return {
        success: true,
        url,
      };

    } catch (error) {

      console.error(
        "Error uploading player image:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };


// UPLOAD TEAM LOGO
export const uploadTeamLogo =
  async (file, teamName) => {

    try {

      const fileRef = storageRef(
        storage,
        `logos/${teamName}-${Date.now()}`
      );

      await uploadBytes(
        fileRef,
        file
      );

      const url =
        await getDownloadURL(fileRef);

      return {
        success: true,
        url,
      };

    } catch (error) {

      console.error(
        "Error uploading team logo:",
        error
      );

      return {
        success: false,
        error,
      };

    }

  };