const select = {
    templateOf: {
      book: "#template-book",
    },
    containerOf: {
        book: ".books-list"
    }
}

const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
};

function renderBooks() {
    dataSource.books.forEach(renderBook);
}

function renderBook(bookData) {
    //generate HTML for current single book
    const generatedHTML = templates.book(bookData);

    //create element using utils createElementFromHTML
    const domElement = utils.createDOMFromHTML(generatedHTML);

    //find books container
    const booksContainer = document.querySelector(select.containerOf.book);

    //add element to container
    booksContainer.appendChild(domElement);
}

renderBooks();