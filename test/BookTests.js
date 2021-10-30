var expect = require('chai').expect;
var Book = require('../src/entities/Book');

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

    beforeEach(function() {
        book = new Book(bookValues.number, bookValues.title, bookValues.author, bookValues.releaseYear, bookValues.price);
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

    it('should return true when calling isAvailable on book that was not initially lent', function() {
        expect(book.isAvailable()).to.eql(true);
    });

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

    it('should change book to unavailable when calling lend', function() {
        book.lend('Borrower');

        expect(book.isAvailable()).to.eql(false);
    });

    it('should throw "BookUnavailableException" when trying to lend a book that was already lent', function() {
        book.lend('Borrower');

        expect(() => 
            book.lend('Borrower2')
        )
        .to.throw('BookUnavailableException');
    });

    it('should throw "BookAlreadyReturnedException" when trying to return a book that is not lent', function() {
        expect(() =>
            book.return()
        )
        .to.throw('BookAlreadyReturnedException');
    });

    it('should change last borrower when calling lend', function() {
        let borrower = 'Borrower1';
        book.lend(borrower);

        expect(book.getLastBorrower()).to.eql(borrower);
    });

    it('should set last borrow date when calling lend', function() {
        let borrower = 'Borrower1';
        book.lend(borrower);

        expect(book.getLastBorrowDate()).to.not.eql(null);
    });

    it('should update book availability when lent book is returned', function() {
        book.lend('Borrower1');
        book.return();
        expect(book.isAvailable()).to.eql(true);
    });
});