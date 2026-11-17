// S&A Kitchen: connection to Firebase (sign-in and shared data).
// The settings below are public by design. Your data is protected by sign-in and the security rules.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager, doc, collection, onSnapshot, setDoc, updateDoc, deleteDoc, addDoc, getDoc, deleteField } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBlFcx5OPCYQ8SSzq9gG2nGUAMwYxyqqA8",
  authDomain: "sa-kitchen.firebaseapp.com",
  projectId: "sa-kitchen",
  storageBucket: "sa-kitchen.firebasestorage.app",
  messagingSenderId: "781621592610",
  appId: "1:781621592610:web:ca573c4be7523001bcc07b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db;
try { db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }) }); }
catch (e) { db = initializeFirestore(app, {}); }

const ROOT = 'households/main/';
const ref = (path) => doc(db, ROOT + path);

window.Backend = {
  DEL: deleteField(),
  onAuth(cb) { return onAuthStateChanged(auth, (u) => cb(u ? { uid: u.uid, email: u.email } : null)); },
  signIn(email, pw) { return signInWithEmailAndPassword(auth, email, pw); },
  signUp(email, pw) { return createUserWithEmailAndPassword(auth, email, pw); },
  signOut() { return signOut(auth); },
  reset(email) { return sendPasswordResetEmail(auth, email); },
  check() {
    return getDoc(ref('meta/profiles')).then(() => true).catch((err) => {
      if (err && err.code === 'permission-denied') return false;
      throw err;
    });
  },
  sub(path, cb, onErr) { return onSnapshot(ref(path), (s) => cb(s.exists() ? s.data() : null), onErr); },
  subCol(path, cb, onErr) {
    return onSnapshot(collection(db, ROOT + path), (s) => cb(s.docs.map((d) => Object.assign({ id: d.id }, d.data()))), onErr);
  },
  set(path, data, merge) { return setDoc(ref(path), data, merge ? { merge: true } : undefined); },
  update(path, fields) { return updateDoc(ref(path), fields); },
  add(col, data) { return addDoc(collection(db, ROOT + col), data).then((r) => r.id); },
  del(path) { return deleteDoc(ref(path)); }
};
window.dispatchEvent(new Event('backend-ready'));
