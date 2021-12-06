import Book from "../entities";
import { IBookRepository } from "./IBookRepository";
import { GetBookDto, UpdateBookDto, AddBookDto } from "../dtos";

export class InMemoryBookRepository implements IBookRepository {
    private books: Book[];
    private number: number;

    constructor() {
        this.books = new Array<Book>();
        this.number = 1;
    }

    GetByNumber(bookNumber: number): Promise<GetBookDto | undefined> {
        return new Promise((resolve, reject) => {
            let book = this.books.find(book => book.number === bookNumber);
            if (book === undefined) {
                reject;
                return;
            }

            resolve({
                number: book.number,
                title: book.title,
                author: book.author,
                releaseYear: book.releaseYear,
                price: book.price,
                lastBorrowDate: book.lastBorrowDate,
                lastBorrower: book.lastBorrower,
                available: book.isAvailable
            });
        });
    }
    GetAll(): Promise<GetBookDto[]> {
        return new Promise((resolve, reject) => {
            console.log("GetAll in InMemoryBookRepository");
            if (this.books === undefined) {
                console.log("Books list is undefined");
                reject;
            }

            console.log("Resolving InMemoryBookRepository.GetAll");
            resolve(this.books.map(b => {
                return {
                    number: b.number,
                    title: b.title,
                    author: b.author,
                    releaseYear: b.releaseYear,
                    price: b.price,
                    lastBorrowDate: b.lastBorrowDate,
                    lastBorrower: b.lastBorrower,
                    available: b.isAvailable
                }
            }));
        });
    }
    Add(bookDto: AddBookDto): Promise<number> {
        let book = new Book(this.number++, bookDto.title, bookDto.author, bookDto.releaseYear, bookDto.price);
        return new Promise((resolve, reject) => {
            this.books.push(book);
            resolve(book.number);
        });
    }
    Update(bookDto: UpdateBookDto): Promise<void> {
        return new Promise((resolve, reject) => {
            let idx = this.books.findIndex(book => book.number === bookDto.number);
            if (idx === -1) {
                reject;
            }

            let book = this.books[idx];
            let updatedBook = new Book(book.number, bookDto.title, bookDto.author, bookDto.releaseYear, bookDto.price);

            this.books.splice(idx, 1, updatedBook);

            resolve();
        });
    }
    Delete(bookNumber: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let idx = this.books.findIndex(book => book.number === bookNumber);
            if (idx === -1) {
                reject;
            }

            this.books.splice(idx, 1);

            resolve();
        });
    }

}