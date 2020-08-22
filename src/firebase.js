import firabase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnvZgRXatg3z6cKVmbJgUfTbDATfllM1c",
  authDomain: "whatsappclone-17153.firebaseapp.com",
  databaseURL: "https://whatsappclone-17153.firebaseio.com",
  projectId: "whatsappclone-17153",
  storageBucket: "whatsappclone-17153.appspot.com",
  messagingSenderId: "343664633135",
  appId: "1:343664633135:web:917760f26cfd529a02edda",
  measurementId: "G-KDENVQJR7S",
};

const firabaseApp = firabase.initializeApp(firebaseConfig);
const db = firabaseApp.firestore();
const auth = firabase.auth();
const provider = new firabase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
