// Book and Category Management
let books = JSON.parse(localStorage.getItem('books') || '[]');
let categories = JSON.parse(localStorage.getItem('categories') || '[]');

function addCategory() {
    const categoryInput = document.getElementById('newCategory');
    const category = categoryInput.value.trim();
    
    if (category && !categories.includes(category)) {
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));
        updateCategorySelects();
        categoryInput.value = '';
    }
}

function updateCategorySelects() {
    const categoryFilter = document.getElementById('categoryFilter');
    const bookCategory = document.getElementById('bookCategory');
    
    // Clear existing options
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    bookCategory.innerHTML = '<option value="">Select Category</option>';
    
    // Add categories to both selects
    categories.forEach(category => {
        categoryFilter.add(new Option(category, category));
        bookCategory.add(new Option(category, category));
    });
}

function addBook() {
    const coverInput = document.getElementById('bookCover');
    const title = document.getElementById('bookTitle').value;
    const description = document.getElementById('bookDescription').value;
    const amazonLink = document.getElementById('amazonLink').value;
    const category = document.getElementById('bookCategory').value;

    if (!coverInput.files[0] || !title || !description || !amazonLink) {
        alert('Please fill in all fields');
        return;
    }

    handleFileUpload(coverInput.files[0], (coverImage) => {
        const book = {
            id: Date.now(),
            cover: coverImage,
            title,
            description,
            amazonLink,
            category
        };

        try {
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
            
            // Clear form
            coverInput.value = '';
            document.getElementById('bookTitle').value = '';
            document.getElementById('bookDescription').value = '';
            document.getElementById('amazonLink').value = '';
            document.getElementById('bookCategory').value = '';
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                books.pop(); // Remove the book that couldn't be saved
                alert('Storage limit reached. Try removing some books or using smaller images.');
            } else {
                console.error('Error saving book:', error);
            }
        }
    }, 600); // Max width of 600px for book covers
}

function displayBooks(filterCategory = '') {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';

    const filteredBooks = filterCategory
        ? books.filter(book => book.category === filterCategory)
        : books;

    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-description">${book.description}</p>
                <a href="${book.amazonLink}" target="_blank" class="amazon-button">
                    Buy on Amazon
                </a>
                ${isAdmin ? `
                    <button onclick="deleteBook(${book.id})" class="delete-button">
                        Delete
                    </button>
                ` : ''}
            </div>
        `;
        bookGrid.appendChild(bookCard);
    });
}

function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
}

function filterBooks() {
    const category = document.getElementById('categoryFilter').value;
    displayBooks(category);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCategorySelects();
    displayBooks();
});