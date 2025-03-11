// Admin Authentication
const ADMIN_PASSWORD = 'admin123'; // In production, use a more secure method
let isAdmin = false;

function showAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'block';
}

function login() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('adminLoginModal').style.display = 'none';
        toggleAdminPanel(true);
        loadAdminSettings();
    } else {
        alert('Invalid password');
    }
}

function toggleAdminPanel(show) {
    document.getElementById('adminPanel').classList.toggle('hidden', !show);
}

// File Handling with Image Compression
function handleFileUpload(file, callback, maxWidth = 800) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions while maintaining aspect ratio
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress image to JPEG with reduced quality
            const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
            callback(compressedImage);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Settings Management with Storage Optimization
function loadAdminSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    
    if (settings.logo) document.getElementById('siteLogo').src = settings.logo;
    if (settings.banner) document.getElementById('heroBanner').src = settings.banner;
    if (settings.slogan) {
        document.getElementById('heroSlogan').textContent = settings.slogan;
        document.getElementById('sloganText').value = settings.slogan;
    }
    if (settings.fontFamily) {
        document.documentElement.style.setProperty('--font-family', settings.fontFamily);
        document.getElementById('fontFamily').value = settings.fontFamily;
    }
    if (settings.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        document.getElementById('primaryColor').value = settings.primaryColor;
    }
    if (settings.footerText) {
        document.getElementById('siteFooter').innerHTML = settings.footerText;
        document.getElementById('footerText').value = settings.footerText;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Logo Upload
    document.getElementById('logoUpload').addEventListener('change', (e) => {
        if (e.target.files[0]) {
            handleFileUpload(e.target.files[0], (result) => {
                document.getElementById('siteLogo').src = result;
                saveSettings('logo', result);
            }, 400); // Smaller max width for logo
        }
    });

    // Banner Upload
    document.getElementById('bannerUpload').addEventListener('change', (e) => {
        if (e.target.files[0]) {
            handleFileUpload(e.target.files[0], (result) => {
                document.getElementById('heroBanner').src = result;
                saveSettings('banner', result);
            }, 1200); // Larger max width for banner
        }
    });

    // Slogan Update
    document.getElementById('sloganText').addEventListener('change', (e) => {
        const slogan = e.target.value;
        document.getElementById('heroSlogan').textContent = slogan;
        saveSettings('slogan', slogan);
    });

    // Font Family Update
    document.getElementById('fontFamily').addEventListener('change', (e) => {
        const fontFamily = e.target.value;
        document.documentElement.style.setProperty('--font-family', fontFamily);
        saveSettings('fontFamily', fontFamily);
    });

    // Color Update
    document.getElementById('primaryColor').addEventListener('change', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--primary-color', color);
        saveSettings('primaryColor', color);
    });

    // Load initial settings
    loadAdminSettings();
});

function saveSettings(key, value) {
    try {
        const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
        settings[key] = value;
        localStorage.setItem('adminSettings', JSON.stringify(settings));
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('Storage limit reached. Try removing some books or using smaller images.');
        } else {
            console.error('Error saving settings:', error);
        }
    }
}

function updateFooter() {
    const footerText = document.getElementById('footerText').value;
    document.getElementById('siteFooter').innerHTML = footerText;
    saveSettings('footerText', footerText);
}