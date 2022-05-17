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
        const StoredBooks = [{
            bookTitle: 'One',
            bookAuthor: 'John Doe',
            pages: 500,
            isRead: false
        }];

        const books = StoredBooks;

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
        <div class="Title">Title: ${bookObject.bookTitle}</div>
            <div class="Title">Author: ${bookObject.bookAuthor}</div>
            <div class="Title">Pages: ${bookObject.pages}</div>
            <div class="Read">Read: ${bookObject.isRead}</div>
            <button>X</button>
        `;

        bookContainer.appendChild(bookItem);
    }

}
// Storage Class: Handles storage

// Event - Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add book
document.querySelector('.book-form').addEventListener('submit', (e) => {

    //Firstly, prevent the default submit action of the submit button
    e.preventDefault();

    //Get all book forms values
    const bookTitle = document.querySelector('#book-title').value;
    const bookAuthor = document.querySelector('#book-author').value;
    const bookPages = document.querySelector('#book-pages').value;
    let bookIsRead = document.querySelector('.switch-input').value;

    let isRead = false;
    if (bookIsRead.toLowerCase() == 'on')
        isRead = true;
    else
        isRead = false;

    //Instantiate/create a new book object
    const newBook = new Book(bookTitle, bookAuthor, bookPages, isRead);

    //Simply add new book to the UI
    UI.addBookToList(newBook);
});

// Event - Remove book