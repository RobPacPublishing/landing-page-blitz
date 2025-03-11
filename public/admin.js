// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMIQ2mNryPdNMOPb6MtY8Qb62styvie54",
    authDomain: "adminlogin-352a2.firebaseapp.com",
    projectId: "adminlogin-352a2",
    storageBucket: "adminlogin-352a2.firebasestorage.app",
    messagingSenderId: "1057661852147",
    appId: "1:1057661852147:web:4536d9a36ad1dd5c7c9a86"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Lista di email autorizzate come admin
const adminEmails = ["robpacpublishing@gmail.com"];  // Sostituisci con il tuo indirizzo email

// Funzione di login con Google
function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            // Controlla se l'utente è un admin autorizzato
            if (adminEmails.includes(user.email)) {
                console.log("Accesso Admin riuscito:", user.email);
                showAdminPanel();
            } else {
                console.warn("Accesso negato per:", user.email);
                alert("Non sei autorizzato ad accedere all'area admin.");
                logout();
            }
        })
        .catch((error) => {
            console.error("Errore di login:", error);
            alert("Errore durante il login!");
        });
}

// Funzione di logout
function logout() {
    signOut(auth).then(() => {
        console.log("Logout effettuato");
        showLoginButton();
    }).catch((error) => {
        console.error("Errore di logout:", error);
    });
}

// Ascolta i cambiamenti di autenticazione
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (adminEmails.includes(user.email)) {
            console.log("Utente già autenticato:", user.email);
            showAdminPanel();
        } else {
            console.warn("Utente non autorizzato:", user.email);
            logout();
        }
    } else {
        showLoginButton();
    }
});

// Mostra il pannello admin e nasconde il bottone di login
function showAdminPanel() {
    document.getElementById('adminPanel').classList.remove('hidden');
    document.getElementById('loginButton').classList.add('hidden');
}

// Mostra il bottone di login e nasconde il pannello admin
function showLoginButton() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('loginButton').classList.remove('hidden');
}

// Collega le funzioni ai bottoni
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('logoutButton').addEventListener('click', logout);

