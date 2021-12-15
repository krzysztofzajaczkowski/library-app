export class Book {
    private _number: number;
    private _title: string;
    private _author: string;
    private _releaseYear: number;
    private _price!: number;
    private _borrowed: boolean;
    private _lastBorrowDate: number | null;
    private _lastBorrower: string | null;

    constructor(number: number, title: string, author: string, releaseYear: number, price: number) {
        

        this._number = number;
        this._title = title;
        this._author = author;
        this._releaseYear = releaseYear;
        this.price = price;
        this._lastBorrowDate = null;
        this._lastBorrower = null;
        this._borrowed = false;
    }

    get number(): number {
        return this._number;
    };

    get title(): string {
        return this._title;
    };

    get author(): string {
        return this._author;
    };

    get releaseYear(): number {
        return this._releaseYear;
    };

    get price(): number {
        return this._price;
    };

    get isAvailable(): boolean {
        return !this._borrowed;
    };

    get lastBorrowDate(): number | null {
        return this._lastBorrowDate;
    };

    get lastBorrower(): string | null {
        return this._lastBorrower;
    };

    set price(newPrice: number) {
        if (isNaN(newPrice) || newPrice < 0) {
            throw 'InvalidArgumentException';
        }
        this._price = newPrice;
    }

    lend(newBorrower: string) {
        if(this._borrowed) {
            throw 'BookUnavailableException'; 
        }

        this._lastBorrowDate = Date.now();
        this._lastBorrower = newBorrower;
        this._borrowed = true;
    }

    return() {
        if(!this._borrowed) {
            throw 'BookAlreadyReturnedException';
        }

        this._borrowed = false;
    };
}