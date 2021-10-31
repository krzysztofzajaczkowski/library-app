var Book = require('../../../src/v3/entities/Book');
var BookBorrow = require('../../../src/v3/entities/BookBorrow');
var Library = require('../../../src/v3/entities/Library');
var DateUtils = require('./DateUtils');

class LibraryUtils {
    static CreateValidBook(number = 1, title = "Title", author = "Author", releaseYear = 2021, price = 25.55) {
        return new Book(number, title, author, releaseYear, price);
    }

    static CreateBookBorrow(borrowDate, borrowerName, days) {
        return new BookBorrow(borrowDate, borrowerName, DateUtils.WithAddedDays(borrowDate, days));
    }
}

module.exports = LibraryUtils;