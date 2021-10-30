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

        this.getNumber = () => _Number;
        this.getTitle = () => _Title;
        this.getAuthor = () => _Author;
        this.getReleaseYear = () => _ReleaseYear;
        this.getLastBorrowDate = () => _LastBorrowDate;
        this.getLastBorrower = () => _LastBorrower;

        this.setPrice = (newPrice) => {
            if (isNaN(newPrice)) {
                throw 'InvalidArgumentException';
            }
            _Price = newPrice;
        };
        this.getPrice = () => _Price;

        this.isAvailable = () => !_Borrowed;

        this.lend = newBorrower => {
            if(_Borrowed) {
               throw 'BookUnavailableException'; 
            }
            _LastBorrowDate = Date.now();
            _LastBorrower = newBorrower;
            _Borrowed = true;
        };

        this.return = () => {
            if(!_Borrowed) {
                throw 'BookAlreadyReturnedException';
            }
            _Borrowed = false;
        };
    }
}

module.exports = Book;