{
    'use strict';

    const select = {
        templateOf: {
          book: "#template-book",
        },
        containerOf: {
            book: ".books-list"
        },
        book: {
            image: ".book__image"
        }
    }
    
    const classNames = {
        book: {
            favorite: "favorite",
        },
    };
    
    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
    };
    
    const app = {
        renderBooks: function() {
            dataSource.books.forEach(this.renderBook);
        },
        renderBook: function (bookData) {
            //generate HTML for current single book
            const generatedHTML = templates.book(bookData);
        
            //create element using utils createElementFromHTML
            const domElement = utils.createDOMFromHTML(generatedHTML);
        
            //find books container
            const booksContainer = document.querySelector(select.containerOf.book);
        
            //add element to container
            booksContainer.appendChild(domElement);
        },
        favoriteBooks: [],
        initActions: function () {
            const allBooksLinks = document.querySelectorAll(select.book.image);
            console.log('allBooksLinks', allBooksLinks);

            allBooksLinks.forEach((currentBookLink) => {
                currentBookLink.addEventListener('dblclick', () => {
                    const dataId = currentBookLink.getAttribute('data-id');

                    //if (currentBookLink.classList.contains(classNames.book.favorite)) {

                    if (this.favoriteBooks.includes(dataId)) {
                        const index = this.favoriteBooks.findIndex((bookId) => bookId === dataId);
                        this.favoriteBooks.splice(index, 1);
                    } else {
                        this.favoriteBooks.push(dataId);
                    }

                    currentBookLink.classList.toggle(classNames.book.favorite);

                    console.error('this.favoriteBooks', this.favoriteBooks);
                });
            });
        },
        init: function() {
            this.renderBooks();
            this.initActions();
        }
    }

    app.init();
}