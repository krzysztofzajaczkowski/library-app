var expect = require('chai').expect;
var Book = require('../../src/v3/entities/Book');
var BookBorrow = require('../../src/v3/entities/BookBorrow');
var DateUtils = require('./utils/DateUtils');
var LibraryUtils = require('./utils/LibraryUtils');

describe('book-tests', function()
{
    let bookValues = {
        number: 1,
        title: 'Title1',
        author: 'Author1',
        releaseYear: 2021,
        price: 20.55
    };
    let book;
    let bookBorrow;
    let dueDate;

    beforeEach(function() {
        book = new Book(bookValues.number, bookValues.title, bookValues.author, bookValues.releaseYear, bookValues.price);
        dueDate = DateUtils.WithAddedDays(new Date(), 4);
        bookBorrow = new BookBorrow(new Date(), "Borrower1", new Date(dueDate));
    })

    it('should return undefined when accessing number field', function() {
        expect(book.number).to.eql(undefined);
    });

    it('should return undefined when accessing title field', function() {
        expect(book.title).to.eql(undefined);
    });

    it('should return undefined when accessing author field', function() {
        expect(book.author).to.eql(undefined);
    });

    it('should return undefined when accessing releaseYear field', function() {
        expect(book.releaseYear).to.eql(undefined);
    });

    it('should return undefined when accessing price field', function() {
        expect(book.price).to.eql(undefined);
    });

    it('should return undefined when accessing lastBorrowDate field', function() {
        expect(book.lastBorrowDate).to.eql(undefined);
    });

    it('should return undefined when accessing lastBorrower field', function() {
        expect(book.lastBorrower).to.eql(undefined);
    });

    it('should return undefined when accessing borrowed field', function() {
        expect(book.borrowed).to.eql(undefined);
    });

    it('should return value used in constructor when calling getNumber', function() {
        expect(book.getNumber()).to.eql(bookValues.number);
    });

    it('should return value used in constructor when calling getTitle', function() {
        expect(book.getTitle()).to.eql(bookValues.title);
    });

    it('should return value used in constructor when calling getAuthor', function() {
        expect(book.getAuthor()).to.eql(bookValues.author);
    });

    it('should return value used in constructor when calling getReleaseYear', function() {
        expect(book.getReleaseYear()).to.eql(bookValues.releaseYear);
    });

    it('should return value used in constructor when calling getPrice', function() {
        expect(book.getPrice()).to.eql(bookValues.price);
    });

    it('should return true when calling isAvailable on book that was not lent', function() {
        expect(book.isAvailable()).to.eql(true);
    });

    it('should return false when calling isAvailable on book that was lent', function() {
        book.lend(bookBorrow);

        expect(book.isAvailable()).to.eql(false);
    })

    it('should return null when calling getLastBorrowDate on book that was not initially lent', function() {
        expect(book.getLastBorrowDate()).to.eql(null);
    });

    it('should return null when calling getLastBorrower on book that was not initially lent', function() {
        expect(book.getLastBorrower()).to.eql(null);
    });

    it('should update price to new value when calling setPrice', function() {
        let newPrice = 55.42;
        book.setPrice(newPrice);
        expect(book.getPrice()).to.eql(newPrice)
    });

    it('should throw "InvalidArgumentException" when updating price with not a number', function() {
        expect(() => {
            book.setPrice('NewValue');
        })
        .to.throw('InvalidArgumentException');
    });

    it('should throw "BookAlreadyReturnedException" when trying to return a book that is not lent', function() {
        expect(() =>
            book.return()
        )
        .to.throw('BookAlreadyReturnedException');
    });

    it('should return undefined when trying to access "prototype" field', function() {
        expect(book.prototype).to.eql(undefined);
    });

    it('should return undefined when trying to access "constructor._prototype" field', function() {
        expect(book.constructor._prototype).to.eql(undefined);
    });

    it('should return value set in new prototype field when calling field in existing object', function() {
        let testValue = "TestValue";
        Book.prototype.newField = testValue
        expect(book.newField).to.eql(testValue);
    });

    it('should change book to unavailable when calling lend', function() {
        book.lend(bookBorrow);

        expect(book.isAvailable()).to.eql(false);
    });

    it('should throw "BookUnavailableException" when trying to lend a book that was already lent', function() {
        book.lend(bookBorrow);

        expect(() => 
            book.lend(bookBorrow)
        )
        .to.throw('BookUnavailableException');
    });

    it('should change last borrower when calling lend', function() {
        book.lend(bookBorrow);

        expect(book.getLastBorrower()).to.eql(bookBorrow.getBorrowerName());
    });

    it('should set last borrow date when calling lend', function() {
        book.lend(bookBorrow);

        expect(book.getLastBorrowDate()).to.not.eql(null);
    });

    it('should update book availability when lent book is returned', function() {
        book.lend(bookBorrow);
        book.return();
        expect(book.isAvailable()).to.eql(true);
    });

    it('should append book borrow to borrows when calling lend', function() {
        book.lend(bookBorrow);

        let [lastBorrow] = book.getAllBorrows().slice(-1);
        expect(lastBorrow).to.eql(bookBorrow);
    });

    it('should append book borrow to returns when calling return', function() {
        book.lend(bookBorrow);
        book.return();

        let [lastBorrow] = book.getAllReturns().slice(-1);
        expect(lastBorrow).to.eql(bookBorrow);
    });

    it('should return false when calling isOverdue on book that last borrow is not overdue', function() {
        book.lend(bookBorrow);

        expect(book.isOverdue()).to.eql(false);
    });

    it('should return true when calling isOverdue on book that last borrow is overdue', function() {
        let borrowDate = DateUtils.WithAddedDays(new Date(), - 10);
        let dueDate = DateUtils.WithAddedDays(new Date(), - 2);
        let overdueBookBorrow = new BookBorrow(borrowDate, "Borrower2", dueDate);

        book.lend(overdueBookBorrow);

        expect(book.isOverdue()).to.eql(true);
    });

    it('should throw "BookNotBorrowedException" when prolonging book that is not borrowed', function() {
        expect(() => 
        book.prolong()
        )
        .to.throw('BookNotBorrowedException');
                
    });

    it('should update last borrow due date when prolonging book', function() {
        book.lend(bookBorrow);
        let prolongBy = 10;
        let newDueDate = DateUtils.WithAddedDays(dueDate, prolongBy);

        book.prolong(prolongBy);

        let [lastBorrow] = book.getAllBorrows().slice(-1);
        expect(lastBorrow.getDueDate()).to.eql(newDueDate);
    });

    it('should return today when calling expectedAvailabilityDate and book is available', function() {
        let availabilityDate = DateUtils.DateOnly(book.expectedAvailabilityDate());
        let today = DateUtils.DateOnly(new Date());

        expect(availabilityDate).to.eql(today);
    });

    it('should return due date when calling expectAvailabilityDate and book is borrowed', function() {
        book.lend(bookBorrow);
        let availabilityDate = DateUtils.DateOnly(book.expectedAvailabilityDate());

        expect(availabilityDate).to.eql(DateUtils.DateOnly(dueDate));
    });

    it('should set book as available when returned', function() {
        book.lend(bookBorrow);
        book.return();

        expect(book.isAvailable()).to.eql(true);
    });

    it('should set last book borrow as returned when book is returned', function() {
        book.lend(bookBorrow);
        book.return();

        let [lastBorrow] = book.getAllBorrows().slice(-1);
        expect(lastBorrow.isReturned()).to.eql(true);
    })
});