// Wait for the page to fully load DOM content
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('add-book-form');

    // Execute submit button
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

// Get a reference to the form
const addBookForm = document.getElementById('add-book-form');

// Add an event listener for the form submit event
addBookForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from being submitted by default

    // Get values from the input fields: title, author, year, and completion status
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = Number(document.getElementById('year').value);
    const isComplete = document.getElementById('isComplete').checked;
    const id = new Date().getTime();
    const book = {
        id,
        title,
        author,
        year,
        isComplete,
        isFavorite: false,
        rating: 0,
    };

    // Perform logic to save the book (e.g., save to local storage or a database)

    // Show an alert dialog when a book is successfully added
    window.alert(`Book "${title}" by ${author} in ${year} has been successfully added to your bookshelf.`);

    // Clear the form after adding the book
    addBookForm.reset();

    // Save the book to local storage
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    // Clear the form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isComplete').checked = false;

    // Display the books
    displayBooks();
});

// Function to display books in the appropriate containers
function displayBooks() {
    const favoriteList = document.getElementById('favorite-list');
    const notCompletedList = document.getElementById('not-completed-list');
    const completedList = document.getElementById('completed-list');
    favoriteList.innerHTML = '';
    notCompletedList.innerHTML = '';
    completedList.innerHTML = '';

    let books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach((book) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.year})`;

        // Star rating system
        const ratingContainer = document.createElement('span');
        ratingContainer.classList.add('rating-container');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            if (i <= book.rating) {
                star.textContent = '\u2605'; // Filled star
            } else {
                star.textContent = '\u2606'; // Empty star
            }
            star.addEventListener('click', () => {
                rateBook(book.id, i);
            });
            ratingContainer.appendChild(star);
        }
        li.appendChild(ratingContainer);

        // Add space below using CSS
        const spacer = document.createElement('div');
        spacer.style.marginBottom = '10px'; // Adjust the desired spacing as needed
        li.appendChild(spacer);

        // Remove from favorite button
        if (book.isFavorite) {
            const removeFromFavoriteButton = document.createElement('button');
            removeFromFavoriteButton.textContent = 'Remove from Favorite';
            // Add CSS styles using style properties
            removeFromFavoriteButton.style.backgroundColor = '#f12544'; // Change background color
            removeFromFavoriteButton.style.color = 'white'; // Change text color
            removeFromFavoriteButton.style.border = 'none'; // Remove border
            removeFromFavoriteButton.style.padding = '10px 20px'; // Add padding
            removeFromFavoriteButton.style.marginRight = '10px'; // Add margin right
            removeFromFavoriteButton.style.marginTop = '10px'; // Add margin top
            removeFromFavoriteButton.style.borderRadius = '10px'; // Add border radius
            removeFromFavoriteButton.style.cursor = 'pointer'; // Change cursor to pointer
            removeFromFavoriteButton.addEventListener('click', () => {
                book.isFavorite = false;
                localStorage.setItem('books', JSON.stringify(books));
                displayBooks();
            });

            li.appendChild(removeFromFavoriteButton);
        }

        // Mark as complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = book.isComplete ? 'Mark as Not Completed' : 'Mark as Complete';

        // Add CSS styles using style properties
        completeButton.style.backgroundColor = '#14a86f'; // Change background color
        completeButton.style.color = 'white'; // Change text color
        completeButton.style.border = 'none'; // Remove border
        completeButton.style.padding = '10px 20px'; // Add padding
        completeButton.style.marginRight = '10px'; // Add margin right
        completeButton.style.marginTop = '10px'; // Add margin top
        completeButton.style.borderRadius = '10px'; // Add border radius
        completeButton.style.cursor = 'pointer'; // Change cursor to pointer
        completeButton.addEventListener('click', () => {
            book.isComplete = !book.isComplete;
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
        });

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        // Add CSS styles using style properties
        removeButton.style.backgroundColor = '#f12544'; // Change background color
        removeButton.style.color = 'white'; // Change text color
        removeButton.style.border = 'none'; // Remove border
        removeButton.style.padding = '10px 20px'; // Add padding
        removeButton.style.margin = '10px'; // Add margin
        removeButton.style.borderRadius = '10px'; // Add border radius
        removeButton.style.cursor = 'pointer'; // Change cursor to pointer
        removeButton.addEventListener('click', () => {
            // Show a confirmation dialog before removing the book
            const isConfirmed = confirm('Are you sure you want to remove this book?');
            if (isConfirmed) {
                // Remove the book from the list
                books = books.filter((b) => b.id !== book.id);
                localStorage.setItem('books', JSON.stringify(books));
                displayBooks();

                // Show a success message using an alert
                alert('The book has been successfully removed from the list.');
            }
        });

        li.appendChild(completeButton);
        li.appendChild(removeButton);

        if (book.isFavorite) {
            favoriteList.appendChild(li);
        } else if (book.isComplete) {
            completedList.appendChild(li);
        } else {
            notCompletedList.appendChild(li);
        }

        // Add to favorite button
        if (book.isComplete && !book.isFavorite) {
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'Add to Favorite';
            // Add CSS styles using style properties
            favoriteButton.style.backgroundColor = '#14a86f'; // Change background color
            favoriteButton.style.color = 'white'; // Change text color
            favoriteButton.style.border = 'none'; // Remove border
            favoriteButton.style.padding = '10px 20px'; // Add padding
            favoriteButton.style.marginRight = '10px'; // Add margin right
            favoriteButton.style.marginTop = '10px'; // Add margin top
            favoriteButton.style.borderRadius = '10px'; // Add border radius
            favoriteButton.style.cursor = 'pointer'; // Change cursor to pointer
            favoriteButton.addEventListener('click', () => {
                book.isFavorite = true;
                localStorage.setItem('books', JSON.stringify(books));
                displayBooks();
            });

            li.appendChild(favoriteButton);
        }
    });
}

// Function to search books by title
function searchBooks() {
    const searchText = document.getElementById('search-title').value.trim().toLowerCase();
    const books = JSON.parse(localStorage.getItem('books')) || [];

    const searchResultsContainer = document.createElement('ul'); // Create a new list for search results
    searchResultsContainer.id = 'search-results-list';

    if (searchText === '') {
        // If the search input is empty, do nothing
        return;
    }

    books.forEach((book) => {
        if (book.title.toLowerCase() === searchText) {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (${book.year})`;
            searchResultsContainer.appendChild(li);
        }
    });

    // Replace the existing search results list with the new one
    const existingSearchResults = document.getElementById('search-results-list');
    const searchContainer = document.querySelector('.search-container');
    if (existingSearchResults) {
        searchContainer.removeChild(existingSearchResults);
    }
    searchContainer.appendChild(searchResultsContainer);
}

// Function to handle book rating
function rateBook(bookId, rating) {
    let books = JSON.parse(localStorage.getItem('books')) || [];

    books = books.map((book) => {
        if (book.id === bookId) {
            book.rating = rating;
        }
        return book;
    });

    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

// Display books when the page loads
displayBooks();
