// Book Class - represents a book object created by user
class Book {
    //constructor method will run every time we instantiate a book
    constructor(bookTitle, bookAuthor, pages, isRead) {
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.pages = pages;
        this.isRead = isRead;
    }

}
// UI Class - Handle UI tasks
class UI {
    static displayBooks() {

        const books = Store.getBooks();

        // Loop through array of books and add each book to the table list
        books.forEach(bookObject => UI.addBookToList(bookObject));
    }

    static addBookToList(bookObject) {
        //create a row to place inside the tbody
        const bookContainer = document.querySelector('.book-container');

        //now create a table row element <tr>
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        //add columns to the <tr> tag
        bookItem.innerHTML = `
        <div class="Title">${bookObject.bookTitle}</div>
            <div class="Title">${bookObject.bookAuthor}</div>
            <div class="Title">${bookObject.pages}</div>
            <div class="Read">${bookObject.isRead}</div>
            <button class="read-button">READ</button>
            <button class="delete-button">X</button>
        `;

        bookContainer.appendChild(bookItem);
    }

    //clear and reset fields on the form when submit is pressed
    static clearFormFields() {
        document.querySelector('#book-title').value = '';
        document.querySelector('#book-author').value = '';
        document.querySelector('#book-pages').value = '';
        document.querySelector('#toggleButton').value = '✘';
        document.querySelector('#toggleButton').style.background = 'red';

    }

    static deleteBookFromList(targetElement) {
        if (targetElement.classList.contains('delete-button')) {
            //get parent of the delete button
            targetElement.parentElement.remove();
        }
    }

    static displayAlert(message, alertType) {
        const alert = document.querySelector('.alert');

        if (alertType !== 'danger') {
            alert.innerText = '';
            alert.innerText = message;
            alert.style.background = 'green';
            alert.style.display = 'flex';
        } else {
            alert.innerText = '';
            alert.innerText = message;
            alert.style.background = 'red';
            alert.style.display = 'flex'
        }

        //Vanish the alert in 3.5 seconds
        setTimeout(() => alert.style.display = 'none', 3500);

    }

}
// Storage Class: Handles storage
class Store {
    //make the methods static to make them useable without having to instantiate the store class
    static getBooks() {
        //You can only store strings into local storage so you have to stringify before adding to local storage and vice versa. (parse when you pull it out)
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        //Return the books ARRAY of bookObjects 
        return books;
    }

    static addBook(bookObject) {
        const books = Store.getBooks();

        //Push the new bookObject onto the booksARRAY
        books.push(bookObject);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(bookTitle, bookAuthor) {

        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.bookTitle === bookTitle && book.bookAuthor === bookAuthor) {
                books.splice(index, 1);
            }
        });

        //Reset local storage with the removed book
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event - Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add book
document.querySelector('.book-form').addEventListener('submit', (e) => {

    //Firstly, prevent the default submit action of the submit button
    e.preventDefault();

    //Get all book forms values
    const bookTitle = document.querySelector('#book-title');
    const bookAuthor = document.querySelector('#book-author');
    const bookPages = document.querySelector('#book-pages');
    let bookIsRead = document.querySelector('#toggleButton');

    //Validate
    if (bookTitle.value === '' || bookAuthor.value === '' || bookPages.value === '' || !isNumeric(bookPages.value)) {
        UI.displayAlert('Please fill in all fields.', 'danger');
        return;
    } else {
        //Instantiate/create a new book object
        const newBook = new Book(`Title: ${bookTitle.value}`, `Author: ${bookAuthor.value}`, `Pages: ${bookPages.value}`, `Read: ${bookIsRead.value}`);

        //Simply add new book to the UI
        UI.addBookToList(newBook);

        //Add book to storage
        Store.addBook(newBook);

        //Clear and reset fields
        UI.clearFormFields();

        UI.displayAlert('Success! Book added', 'success');

    }

});

// Event - Remove book
document.querySelector('.book-container').addEventListener('click', e => {
    UI.deleteBookFromList(e.target);

    if (e.target.classList.contains('delete-button')) {
        let title = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        let author = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        Store.removeBook(title, author);
        //Remove book alert
        UI.displayAlert('Book removed', 'success');
    }



});

//Toggle button function
function buttonToggle() {
    var toggle = document.getElementById("toggleButton");
    if (toggle.value == "✔") {
        toggle.value = "✘";
        toggle.style.background = 'red';

    } else if (toggle.value == "✘") {
        toggle.value = "✔";
        toggle.style.background = 'green';
    }
}

function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

//Read button update 
document.querySelector('.book-container').addEventListener('click', e => {
    let title = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    let author = e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;

    if (e.target.classList.contains('read-button')) {
        let booksArray = Store.getBooks();

        booksArray.forEach(bookObject => {
            if (title === bookObject.bookTitle && author === bookObject.bookAuthor) {
                if (bookObject.isRead == "Read: ✔") {
                    bookObject.isRead = "Read: ✘";

                } else if (bookObject.isRead == "Read: ✘") {
                    bookObject.isRead = "Read: ✔";
                }

                console.log(bookObject.isRead)
            }
        });
        //update local storage with the new booksArray of book objects
        localStorage.setItem('books', JSON.stringify(booksArray));
        //refresh page with updated read boolean
        location.reload();
    }

});