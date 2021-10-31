"use strict";
var BookBorrow = require('./BookBorrow');
var Book = require('./Book');

class Library {
    constructor(books) {
        let _books = [...books];

        this.getAllBooks = () => [..._books];
        this.addBook = (book) => _books.push(book);
        this.countBorrowedBooks = () => _books.filter((b) => !b.isAvailable()).length;
        this.getAllOverdueBooks = () => _books.filter((e) => e.isOverdue());
        this.getAvailableBooks = () => _books.filter((b) => b.isAvailable());
        
        this.isBookAvailable = (title) => {
            var book = _books.find((b) => b.getTitle().toLowerCase() === title.toLowerCase());
            if(!book) {
                return false;
            }

            return book.isAvailable();
        };

        this.getExpectedAvailabilityDateForTitle = (title) => {
            var book = _books.find((b) => b.getTitle().toLowerCase() === title.toLowerCase());
            if(!book) {
                return null;
            }

            return book.expectedAvailabilityDate();
        };

        this.getMostPopular = (count = 10) => _books.sort((x, y) => y.getAllBorrows().length - x.getAllBorrows().length).slice(0, count);
    }
}

module.exports = Library;