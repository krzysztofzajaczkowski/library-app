"use strict";

class BookBorrow {
    constructor(borrowDate, borrowerName, dueDate) {
        // let _book = book;
        let _borrowDate = borrowDate;
        let _borrowerName = borrowerName;
        let _dueDate = dueDate;
        let _returned = false;

        // this.getBook = () => _book;
        this.getBorrowDate = () => _borrowDate;
        this.getBorrowerName = () => _borrowerName;
        this.getDueDate = () => _dueDate;
        this.isReturned = () => _returned;
        this.isOverdue = () => _dueDate < new Date();

        this.return = () => {
            _returned = true
        };

        this.prolong = (days = 14) => {
            _dueDate.setDate(_dueDate.getDate() + days);
        }
    }
}

module.exports = BookBorrow;