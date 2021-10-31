"use strict";
var BookBorrow = require('./BookBorrow');

class Book {

    constructor(number, title, author, releaseYear, price) {
        if (isNaN(price)) {
            throw 'InvalidArgumentException';
        }

        let _number = number;
        let _title = title;
        let _author = author;
        let _releaseYear = releaseYear;
        let _price = price;
        let _lastBorrowDate = null;
        let _lastBorrower = null;
        let _borrowed = false;
        let _borrows = [];
        let _returns = [];

        this.getNumber = () => _number;
        this.getTitle = () => _title;
        this.getAuthor = () => _author;
        this.getReleaseYear = () => _releaseYear;
        this.getLastBorrowDate = () => _lastBorrowDate;
        this.getLastBorrower = () => _lastBorrower;
        this.getAllBorrows = () => [..._borrows];
        this.getAllReturns = () => [..._returns];

        this.setPrice = (newPrice) => {
            if (isNaN(newPrice)) {
                throw 'InvalidArgumentException';
            }
            _price = newPrice;
        };
        this.getPrice = () => _price;

        this.isAvailable = () => !_borrowed;

        this.getLastBorrow = () => {
            let [lastBorrow] = _borrows.slice(-1);
            return lastBorrow;
        }

        this.isOverdue = () => {
            if (!_borrowed) {
                return false;
            }

            let [lastBorrow] = _borrows.slice(-1);
            if (lastBorrow) {
                return lastBorrow.isOverdue();
            }
            return false;
        }
        this.expectedAvailabilityDate = () => {
            if (!_borrowed) {
                return new Date();
            }

            let [lastBorrow] = _borrows.slice(-1);
            if (lastBorrow) {
                return lastBorrow.getDueDate();
            }
            return new Date();
        }
        this.getCurrentHolder = () => {
            if (!_borrowed) {
                return null;
            }

            let [lastBorrow] = _borrows.slice(-1);
            if (lastBorrow) {
                return lastBorrow.getBorrowerName();
            }

            return null;
        }
        this.prolong = (days = 14) => {
            if(!_borrowed) {
                throw 'BookNotBorrowedException';
            }
            let [lastBorrow] = _borrows.slice(-1);
            if (lastBorrow) {
                lastBorrow.prolong(days);
            }
        }

        this.lend = (bookBorrow) => {
            if(_borrowed) {
                throw 'BookUnavailableException'; 
             }
             _lastBorrowDate = new Date();
             _lastBorrower = bookBorrow.getBorrowerName();
             _borrowed = true;
             _borrows.push(bookBorrow);
        }

        this.return = () => {
            if(!_borrowed) {
                throw 'BookAlreadyReturnedException';
            }
            _borrowed = false;
            let [lastBorrow] = _borrows.slice(-1);
            lastBorrow.return();
            _returns.push(lastBorrow);
        };

        // this.lend = (newBorrower, days) => {
        //     if(_borrowed) {
        //        throw 'BookUnavailableException'; 
        //     }
        //     _lastBorrowDate = new Date();
        //     _lastBorrower = newBorrower;
        //     _borrowed = true;
        //     let dueDate = new Date();
        //     dueDate.setDate(dueDate.getDate() + days);
        //     let bookBorrow = new BookBorrow(this, _lastBorrowDate, newBorrower, dueDate);
        //     _borrows.push(bookBorrow);
        // };

        
    }
}

module.exports = Book;