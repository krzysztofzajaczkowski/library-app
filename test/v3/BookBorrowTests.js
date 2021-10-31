var expect = require('chai').expect;
var Book = require('../../src/v3/entities/Book');
var BookBorrow = require('../../src/v3/entities/BookBorrow');

describe('book-borrow-tests', function()
{
    let bookValues = {
        number: 1,
        title: 'Title1',
        author: 'Author1',
        releaseYear: 2021,
        price: 20.55
    };
    let bookBorrow;
    let book;
    let dueDate;

    beforeEach(function() {
        book = new Book(bookValues.number, bookValues.title, bookValues.author, bookValues.releaseYear, bookValues.price);
        dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 4);
        bookBorrow = new BookBorrow(new Date(), "Borrower1", new Date(dueDate));
        book.lend(bookBorrow);
    });

    it('should update due date when prolonging book borrow', function() {
        let prolongBy = 10;
        let newDueDate = new Date(dueDate);
        newDueDate.setDate(newDueDate.getDate() + prolongBy);

        bookBorrow.prolong(prolongBy);
        expect(bookBorrow.getDueDate()).to.eql(newDueDate);
    });

    it('should set as returned when return is called', function() {
        bookBorrow.return();
        expect(bookBorrow.isReturned()).to.eql(true);
    })
});