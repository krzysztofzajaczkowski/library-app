var Book = require('../../../src/v3/entities/Book');
var BookBorrow = require('../../../src/v3/entities/BookBorrow');
var Library = require('../../../src/v3/entities/Library');

class DateUtils {
    static WithAddedDays(date, numberOfDays) {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numberOfDays);
        return newDate;
    }

    static DateOnly(date) {
        let newDate = new Date(date);
        newDate.setHours(0,0,0,0);
        return newDate;
    }
}

module.exports = DateUtils;