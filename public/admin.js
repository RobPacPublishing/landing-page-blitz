import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const db = getFirestore();
    const provider = new GoogleAuthProvider();

    const loginBtn = document.getElementById('google-login');
    const adminPanel = document.getElementById('admin-panel');
    const logoutBtn = document.getElementById('logout-btn');

    const checkAdmin = async (user) => {
        try {
            const adminRef = doc(db, "admins", user.uid);
            const adminDoc = await getDoc(adminRef);
            return adminDoc.exists();
        } catch (error) {
            console.error("Errore verifica admin:", error);
            return false;
        }
    };

    const updateUI = async (user) => {
        if (user) {
            const isAdmin = await checkAdmin(user);
            adminPanel.style.display = isAdmin ? 'block' : 'none';
            loginBtn.style.display = 'none';
        } else {
            adminPanel.style.display = 'none';
            loginBtn.style.display = 'block';
        }
    };

    loginBtn.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Errore login:", error);
        }
    });

    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Errore logout:", error);
        }
    });

    onAuthStateChanged(auth, updateUI);
});
