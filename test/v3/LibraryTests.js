var expect = require('chai').expect;
var Book = require('../../src/v3/entities/Book');
var BookBorrow = require('../../src/v3/entities/BookBorrow');
var Library = require('../../src/v3/entities/Library');
var DateUtils = require('./utils/DateUtils');
var LibraryUtils = require('./utils/LibraryUtils');

describe('library-tests', function()
{
    let library;
    let cleanCode;
    let learnAureInAMonthOfLunches;
    let cSharpInDepthFourthEdition;
    let bookBorrow;
    let dueDate;

    beforeEach(function() {
        cleanCode = new Book(1, 'Clean Code: A handbook of Agile Software Craftmanship', 'Robert C. Martin', 2008, 41.68);
        learnAureInAMonthOfLunches = new Book(2, 'Learn Azure in a Month of Lunches', 'Iain Fouldsv', 2018, 27.49);
        cSharpInDepthFourthEdition = new Book(3, 'C# in Depth, Fourth Edition', 'Jon Skeet', 2019, 27.49);
        dueDate = DateUtils.WithAddedDays(new Date(), 4);
        bookBorrow = new BookBorrow(new Date(), "Borrower1", dueDate);
        library = new Library([
            cleanCode,
            learnAureInAMonthOfLunches,
            cSharpInDepthFourthEdition
        ]);
    });

    it('should return 0 when calling countBorrowedBooks and no books are borrowed', function() {
        var numberOfBorrowedBooks = library.countBorrowedBooks();
        expect(numberOfBorrowedBooks).to.eql(0);
    });

    it('should return number of borrowed books when calling countBorrowedBooks', function() {
        cleanCode.lend(bookBorrow);
        learnAureInAMonthOfLunches.lend(bookBorrow);

        var numberOfBorrowedBooks = library.countBorrowedBooks();

        expect(numberOfBorrowedBooks).to.eql(2);
    });

    it('should return empty array when calling getAllOverdueBooks and no books are overdue', function() {
        cleanCode.lend(bookBorrow);

        var overdueBooks = library.getAllOverdueBooks();

        expect(overdueBooks.length).to.eql(0);
    });

    it('should return array of overdue books when calling getAllOverdueBooks', function() {
        var overdueBookBorrow = LibraryUtils.CreateBookBorrow(new Date(), 'Borrower2', -3);
        cleanCode.lend(overdueBookBorrow);
        learnAureInAMonthOfLunches.lend(overdueBookBorrow);

        var overdueBooks = library.getAllOverdueBooks();

        expect(overdueBooks).to.have.members([
            cleanCode,
            learnAureInAMonthOfLunches
        ]);
    });

    it('should return true when calling isBookAvailable and book is available', function() {
        let isAvailable = library.isBookAvailable(cSharpInDepthFourthEdition.getTitle());

        expect(isAvailable).to.eql(true);
    });

    it('should return false when calling isBookAvailable and book is borrowed', function() {
        cSharpInDepthFourthEdition.lend(bookBorrow);
        let isAvailable = library.isBookAvailable(cSharpInDepthFourthEdition.getTitle());

        expect(isAvailable).to.eql(false);
    });

    it('should return today date when calling getExpectedAvailabilityDateForTitle and book is available', function() {
        let today = DateUtils.DateOnly(new Date());
        let expectedDate = DateUtils.DateOnly(library.getExpectedAvailabilityDateForTitle(cleanCode.getTitle()));
        
        expect(expectedDate).to.eql(today);
    });

    it('should return due date of last borrow when calling getExpectedAvailabilityDateForTitle and book is borrowed', function() {
        learnAureInAMonthOfLunches.lend(bookBorrow);

        let expectedDate = library.getExpectedAvailabilityDateForTitle(learnAureInAMonthOfLunches.getTitle());
        
        expect(expectedDate).to.eql(bookBorrow.getDueDate());
    })

    it('should return books in descending order by number of borrows when calling mostPopular', function() {
        cSharpInDepthFourthEdition.lend(bookBorrow);
        cSharpInDepthFourthEdition.return();
        cSharpInDepthFourthEdition.lend(bookBorrow);
        learnAureInAMonthOfLunches.lend(bookBorrow);

        let size = 3;
        let mostPopular = library.getMostPopular(size);

        expect(mostPopular).to.have.all.members([
            cSharpInDepthFourthEdition,
            learnAureInAMonthOfLunches,
            cleanCode
        ]);
    });
});