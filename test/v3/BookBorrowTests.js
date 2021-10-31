var expect = require('chai').expect;
var Book = require('../../src/v3/entities/Book');
var BookBorrow = require('../../src/v3/entities/BookBorrow');
var DateUtils = require('./utils/DateUtils');
var LibraryUtils = require('./utils/LibraryUtils');

describe('book-borrow-tests', function()
{
    let bookBorrow;
    let book;
    let dueDate;

    beforeEach(function() {
        book = LibraryUtils.CreateValidBook();
        dueDate = DateUtils.WithAddedDays(new Date(), 4);
        bookBorrow = new BookBorrow(new Date(), "Borrower1", new Date(dueDate));
        book.lend(bookBorrow);
    });

    it('should update due date when prolonging book borrow', function() {
        let prolongBy = 10;
        let newDueDate = DateUtils.WithAddedDays(dueDate, prolongBy);

        bookBorrow.prolong(prolongBy);
        expect(bookBorrow.getDueDate()).to.eql(newDueDate);
    });

    it('should set as returned when return is called', function() {
        bookBorrow.return();
        expect(bookBorrow.isReturned()).to.eql(true);
    })
});