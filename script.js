const myLibrary = [];

let id = 0;

function Book(title, author, hasRead) {
    this.title = title;
    this.author = author;
    this.hasRead = Boolean(hasRead);
    this.id = id++;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showLibrary() {
    let cards = document.createElement('div');
    cards.classList.add('cards');

    for(book of myLibrary) {
        let card = document.createElement('div');
        card.classList.add('card');

        let bookId = document.createElement('p');
        bookId.classList.add('bookId');
        bookId.textContent = book.id;

        let title = document.createElement('p');
        title.classList.add('title');
        title.textContent = book.title;

        let author = document.createElement('p');
        author.classList.add('author');
        author.textContent = book.author;

        let hasRead = document.createElement('p');
        hasRead.classList.add('hasRead');
        hasRead.textContent = book.hasRead ? 'read' : 'not yet read';

        let toggleRead = document.createElement('button');
        toggleRead.classList.add('toggle-read');
        toggleRead.textContent = 'Toggle read';

        let deleteBook = document.createElement('button');
        deleteBook.classList.add('delete-book');
        deleteBook.textContent = 'delete book';

        card.appendChild(bookId);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(hasRead);
        card.appendChild(toggleRead);
        card.appendChild(deleteBook);

        cards.appendChild(card);
    }

    const library = document.querySelector('.library');
    if(library.firstChild) {
        library.removeChild(library.firstChild);
    }
    
    library.appendChild(cards);

    const deleteButtons = document.querySelectorAll('.delete-book');
    for(deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', deleteBook);
    }

    const toggleReadButtons = document.querySelectorAll('.toggle-read');
    for(toggleReadButton of toggleReadButtons) {
        toggleReadButton.addEventListener('click', toggleRead);
    }

}

const dialog = document.querySelector('dialog');
const showDialog = document.querySelector('dialog + button');

const newTitle = document.querySelector('dialog #new-title');
const newAuthor = document.querySelector('dialog #new-author');
const newHasRead = document.querySelector('dialog #has-read');

const addBook = document.querySelector('dialog button');

showDialog.addEventListener('click', () => {
    dialog.showModal();
})

let deleteButtons = document.querySelectorAll('.delete-book');

addBook.addEventListener('click', (event) => {
    let newBook = new Book(newTitle.value, newAuthor.value, newHasRead.checked);
    myLibrary.push(newBook);
    showLibrary();
    newTitle.value = '';
    newAuthor.value = '';
    newHasRead.checked = false;

    event.preventDefault();
    dialog.close();
})

function deleteBook(event) {
    const deleteId = parseInt(event.target.parentElement.firstChild.textContent);
    const deleteIndex = myLibrary.indexOf(myLibrary.find(element => element.id === deleteId));
    myLibrary.splice(deleteIndex,1);

    showLibrary();
}

function toggleRead(event) {
    const toggleId = parseInt(event.target.parentElement.firstChild.textContent);
    const toggleIndex = myLibrary.indexOf(myLibrary.find(element => element.id === toggleId));
    myLibrary[toggleIndex].hasRead = !myLibrary[toggleIndex].hasRead;

    showLibrary();
}