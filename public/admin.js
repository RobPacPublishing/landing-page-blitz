// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMIQ2mNryPdNMOPb6MtY8Qb62styvie54",
    authDomain: "adminlogin-352a2.firebaseapp.com",
    projectId: "adminlogin-352a2",
    storageBucket: "adminlogin-352a2.appspot.com", // Fix del dominio
    messagingSenderId: "1057661852147",
    appId: "1:1057661852147:web:4536d9a36ad1dd5c7c9a86"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Lista di email autorizzate come admin
const adminEmails = ["robpacpublishing@gmail.com"]; // Assicurati che sia il tuo vero indirizzo email

// Controlla lo stato dell'autenticazione
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (adminEmails.includes(user.email)) {
            document.getElementById('adminPanel').classList.remove('hidden');
            document.getElementById('loginButton').classList.add('hidden');
        } else {
            logout();
        }
    } else {
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('loginButton').classList.remove('hidden');
    }
});

// Funzione di login con Google
function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            if (adminEmails.includes(user.email)) {
                console.log("Accesso Admin riuscito:", user.email);
            } else {
                alert("Non sei autorizzato ad accedere all'area admin.");
                logout();
            }
        })
        .catch((error) => {
            console.error("Errore di login:", error.message);
            alert("Errore durante il login! Verifica la console per dettagli.");
        });
}

// Funzione di logout
function logout() {
    signOut(auth).then(() => {
        console.log("Logout effettuato");
    }).catch((error) => {
        console.error("Errore di logout:", error.message);
    });
}

// Collega le funzioni ai bottoni, verifica prima che esistano
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    if (loginButton) {
        loginButton.addEventListener('click', login);
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

