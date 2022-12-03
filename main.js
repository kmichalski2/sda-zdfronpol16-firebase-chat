import "./style.css";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config";
import { collection, getFirestore } from "firebase/firestore";
import { initSendForm, initChat } from "./chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { redirectTo } from "./auth/login";
import { initAuth } from "./auth/auth";
import { initProfileForm, displayAvatar } from "./auth/profile";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const messagesColection = collection(database, "messages");
const auth = getAuth(app);
const storage = getStorage(app);

initAuth(auth);

onAuthStateChanged(auth, (user) => {
  const securedPages = ["/index.html", "/"];
  const currentPathname = location.pathname;

  if (securedPages.includes(currentPathname) && !user) {
    redirectTo("/auth/login.html");
  }

  if (user) {
    console.log(user);

    initProfileForm(user, storage);
    displayAvatar(user);
    initSendForm(messagesColection, user);
    initChat(messagesColection);
  }
});
