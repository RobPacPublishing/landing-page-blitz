import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Configura Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMIQ2mNryPdNMOPb6MtY8Qb62styvie54",
    authDomain: "adminlogin-352a2.firebaseapp.com",
    projectId: "adminlogin-352a2",
    storageBucket: "adminlogin-352a2.appspot.com",
    messagingSenderId: "1057661852147",
    appId: "1:1057661852147:web:4536d9a36ad1dd5c7c9a86"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const adminPanel = document.getElementById("admin-panel");

loginButton?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Utente autenticato:", result.user.email);
        })
        .catch((error) => {
            console.error("Errore di login:", error.message);
        });
});

logoutButton?.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("Utente disconnesso");
        })
        .catch((error) => {
            console.error("Errore nel logout:", error.message);
        });
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Utente autenticato:", user.email);
        loginButton.style.display = "none";
        logoutButton.style.display = "block";

        // Controlla se l'utente è admin
        const userRef = doc(db, "admins", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists() && userSnap.data().isAdmin) {
            adminPanel.style.display = "block";
        } else {
            adminPanel.style.display = "none";
        }
    } else {
        console.log("Nessun utente autenticato");
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
        adminPanel.style.display = "none";
    }
});
console.log("Firebase caricato:", auth);

