import Book from '.';
import { expect } from 'chai';
import { it } from 'mocha';

describe('book-tests', function()
{
    const bookValues = {
        number: 1,
        title: 'Title1',
        author: 'Author1',
        releaseYear: 2021,
        price: 20.55
    };
    let book : Book;

    beforeEach(function() {
        book = new Book(bookValues.number, bookValues.title, bookValues.author, bookValues.releaseYear, bookValues.price);
    })

    it('should throw when trying to access private _number field', function() {
        expect(() =>
            eval(`
                expect(book._number).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _title field', function() {
        expect(() =>
            eval(`
                expect(book._title).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _author field', function() {
        expect(() =>
            eval(`
                expect(book._title).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _releaseYear field', function() {
        expect(() =>
            eval(`
                expect(book._releaseYear).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _price field', function() {
        expect(() =>
            eval(`
                expect(book._price).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _lastBorrowDate field', function() {
        expect(() =>
            eval(`
                expect(book._lastBorrowDate).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _lastBorrower field', function() {
        expect(() =>
            eval(`
                expect(book._latBorrower).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should throw when trying to access private _borrowed field', function() {
        expect(() =>
            eval(`
                expect(book._borrowed).to.eql(undefined);
                `
            )).to.throw();
    });

    it('should return value used in constructor when calling number', function() {
        expect(book.number).to.eql(bookValues.number);
    });

    it('should return value used in constructor when calling title', function() {
        expect(book.title).to.eql(bookValues.title);
    });

    it('should return value used in constructor when calling author', function() {
        expect(book.author).to.eql(bookValues.author);
    });

    it('should return value used in constructor when calling releaseYear', function() {
        expect(book.releaseYear).to.eql(bookValues.releaseYear);
    });

    it('should return value used in constructor when calling price', function() {
        expect(book.price).to.eql(bookValues.price);
    });

    it('should return true when calling isAvailable on book that was not initially lent', function() {
        expect(book.isAvailable).to.eql(true);
    });

    it('should return null when calling lastBorrowDate on book that was not initially lent', function() {
        expect(book.lastBorrowDate).to.eql(null);
    });

    it('should return null when calling lastBorrower on book that was not initially lent', function() {
        expect(book.lastBorrower).to.eql(null);
    });

    it('should update price to new value when setting price', function() {
        const newPrice = 55.42;
        book.price = newPrice;
        expect(book.price).to.eql(newPrice)
    });

    it('should throw "InvalidArgumentException" when updating price with not a number', function() {
        expect(() =>
            eval(
                `
                book.price = 'NewValue';
                `
            ))
        .to.throw('InvalidArgumentException');
    });

    it('should change book to unavailable when calling lend', function() {
        book.lend('Borrower');

        expect(book.isAvailable).to.eql(false);
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
        const borrower = 'Borrower1';
        book.lend(borrower);

        expect(book.lastBorrower).to.eql(borrower);
    });

    it('should set last borrow date when calling lend', function() {
        const borrower = 'Borrower1';
        book.lend(borrower);

        expect(book.lastBorrowDate).to.not.eql(null);
    });

    it('should update book availability when lent book is returned', function() {
        book.lend('Borrower1');
        book.return();
        expect(book.isAvailable).to.eql(true);
    });

    // it('should return undefined when trying to access "prototype" field', function() {
    //     expect(book.prototype).to.eql(undefined);
    // })

    // it('should return undefined when trying to access "constructor._prototype" field', function() {
    //     expect(book.constructor._prototype).to.eql(undefined);
    // })

    // it('should return value set in new prototype field when calling field in existing object', function() {
    //     let testValue = "TestValue";
    //     Book.prototype.newField = testValue
    //     expect(book.newField).to.eql(testValue);
    // })
});
