"use strict";

class Book {

    constructor(number, title, author, releaseYear, price, lastBorrowDate = null, lastBorrower = null) {
        if (isNaN(price)) {
            throw 'InvalidArgumentException';
        }

        let _Number = number;
        let _Title = title;
        let _Author = author;
        let _ReleaseYear = releaseYear;
        let _Price = price;
        let _LastBorrowDate = lastBorrowDate;
        let _LastBorrower = lastBorrower;
        let _Borrowed = lastBorrowDate != null && lastBorrower != null;

        Book.prototype.getNumber = () => _Number;
        Book.prototype.getTitle = () => _Title;
        Book.prototype.getAuthor = () => _Author;
        Book.prototype.getReleaseYear = () => _ReleaseYear;
        Book.prototype.getLastBorrowDate = () => _LastBorrowDate;
        Book.prototype.getLastBorrower = () => _LastBorrower;

        Book.prototype.setPrice = (newPrice) => {
            if (isNaN(newPrice)) {
                throw 'InvalidArgumentException';
            }
            _Price = newPrice;
        };
        Book.prototype.getPrice = () => _Price;

        Book.prototype.isAvailable = () => !_Borrowed;

        Book.prototype.lend = newBorrower => {
            if(_Borrowed) {
               throw 'BookUnavailableException'; 
            }
            _LastBorrowDate = Date.now();
            _LastBorrower = newBorrower;
            _Borrowed = true;
        };

        Book.prototype.return = () => {
            if(!_Borrowed) {
                throw 'BookAlreadyReturnedException';
            }
            _Borrowed = false;
        };
    }
}

module.exports = Book;