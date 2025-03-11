// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Configurazione Firebase (sostituisci con il tuo codice)
<script type="module">

  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  const firebaseConfig = {

    apiKey: "AIzaSyDMIQ2mNryPdNMOPb6MtY8Qb62styvie54",

    authDomain: "adminlogin-352a2.firebaseapp.com",

    projectId: "adminlogin-352a2",

    storageBucket: "adminlogin-352a2.firebasestorage.app",

    messagingSenderId: "1057661852147",

    appId: "1:1057661852147:web:4536d9a36ad1dd5c7c9a86"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

</script>

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Lista di email autorizzate come admin
const adminEmails = ["TUA_EMAIL@gmail.com"];  // Sostituisci con il tuo indirizzo email

// Funzione di login con Google
function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            // Controlla se l'utente è un admin autorizzato
            if (adminEmails.includes(user.email)) {
                console.log("Accesso Admin riuscito:", user.email);
                document.getElementById('adminPanel').classList.remove('hidden');
                document.getElementById('loginButton').classList.add('hidden');
            } else {
                console.warn("Accesso negato per:", user.email);
                alert("Non sei autorizzato ad accedere all'area admin.");
                logout();  // Se non è admin, disconnette subito l'utente
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
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('loginButton').classList.remove('hidden');
    }).catch((error) => {
        console.error("Errore di logout:", error);
    });
}

// Collega le funzioni ai bottoni
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('logoutButton').addEventListener('click', logout);
