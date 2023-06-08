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
        },
        filters: {
            section: ".filters"
        }
    }
    
    const classNames = {
        book: {
            favorite: "favorite",
            hidden: "hidden"
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
        filters: [],
        initActions: function () {
            const booksContainer = document.querySelector(select.containerOf.book);

            // add/remove from favourites functionality
            booksContainer.addEventListener('dblclick', (event) => {
                const currentBookLink = event.target.offsetParent;
                const dataId = currentBookLink.getAttribute('data-id');

                if (this.favoriteBooks.includes(dataId)) {
                    const index = this.favoriteBooks.findIndex((bookId) => bookId === dataId);
                    this.favoriteBooks.splice(index, 1);
                } else {
                    this.favoriteBooks.push(dataId);
                }

                currentBookLink.classList.toggle(classNames.book.favorite);
            });

            //filters functionality
            const filtersSection = document.querySelector(select.filters.section);
            filtersSection.addEventListener('click', (event) => {
                const target = event.target;

                if(target.tagName === 'INPUT' && target.type === 'checkbox' && target.getAttribute('name') === 'filter') {
                    const filterName = target.getAttribute('value');
                    if (target.checked) {
                        this.filters.push(filterName);
                    } else {
                        const index = this.filters.findIndex(f => f === filterName);
                        this.filters.splice(index, 1);
                    }
                }

                this.applyFilter();
            });

        },
        applyFilter: function() {
            const allBooksEl = document.querySelectorAll(select.book.image);
            for (let bookEl of allBooksEl) {
                const dataId = bookEl.getAttribute('data-id');
                const bookDetails = dataSource.books.find(b => b.id === +dataId).details;
                const bookCategories = this.getBookCategories(bookDetails);   
                
                if (this.shouldHideBook(bookCategories)) {
                    bookEl.classList.add(classNames.book.hidden);
                } else {
                    bookEl.classList.remove(classNames.book.hidden);
                }
            }
        },
        getBookCategories: function(bookDetails) {
            const categories = [];
            
            if(bookDetails.adults) {
                categories.push('adults');
            }

            if(bookDetails.nonFiction) {
                categories.push('nonFiction');
            }

            return categories;
        },
        shouldHideBook: function(bookCategories) {
            return this.filters.some((filterName) => bookCategories.includes(filterName));
        },
        init: function() {
            this.renderBooks();
            this.initActions();
        }
    }

    app.init();
}