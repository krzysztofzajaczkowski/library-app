import Book from "../entities";
import { IBookRepository } from "./IBookRepository";
import * as fs from "fs";
import { promisify } from "util";
import { GetBookDto, UpdateBookDto, AddBookDto } from "../dtos";

export class FileBookRepository implements IBookRepository {
    private fileStorePath: string;

    constructor(fileStorePath: string) {
        this.fileStorePath = fileStorePath;
    }

    InitializeStore(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            promisify(fs.stat)(this.fileStorePath)
                .then(
                    () => {
                        resolve();
                    },
                    (err) => {
                        console.log(`Creating data store at: ${this.fileStorePath}`);
                        promisify(fs.mkdir)(this.fileStorePath, { recursive: true });
                        resolve();
                    }
                )
        });
    }

    GetByNumber(bookNumber: number): Promise<GetBookDto | undefined> {
        return new Promise((resolve, reject) => {
            promisify(fs.stat)(`${this.fileStorePath}/${bookNumber}.json`)
                .then(
                    () => {
                        const readFile = promisify(fs.readFile)(`${this.fileStorePath}/${bookNumber}.json`, { encoding: 'utf8'})
                        readFile.then(
                            (data) => resolve(JSON.parse(data)),
                            (err) => reject(err)
                        );
                    },
                    (err) => {
                        reject({
                            error: "Book does not exist"
                        });
                    }
                )
        });
    }
    GetAll(): Promise<GetBookDto[]> {
        return new Promise((resolve, reject) => {
            promisify(fs.readdir)(`${this.fileStorePath}`)
            .then((files) => {
                console.log('Mapping fileNames to paths');
                return files.map(fileName => `${this.fileStorePath}/${fileName}`);
            })
            .then(filePaths => {
                console.log('Mapping filePaths to read promises');
                return filePaths.map(path => promisify(fs.readFile)(path, { encoding: 'utf8'}));
            })
            .then(promises => {
                console.log('Chaning to Promise.all');
                return Promise.all(promises);
            })
            .then(data => {
                console.log('Resolving all');
                resolve(data.map(book => JSON.parse(book)))
            });
        });
    }
    Add(bookDto: AddBookDto): Promise<number> {
        return this.GetAll().then(
            books => {
                let maxNumber: number | undefined;
                if(books === undefined || books.length === 0) {
                    maxNumber = 1;
                }
                else {
                    maxNumber = books.reduce((acc, book) => acc.number > book.number ? acc : book).number + 1;
                }

                let book = new Book(maxNumber, bookDto.title, bookDto.author, bookDto.releaseYear, bookDto.price);
                return new Promise((resolve, reject) => {
                    const writeFile = promisify(fs.writeFile)(`${this.fileStorePath}/${book.number}.json`, JSON.stringify({
                        number: book.number,
                        title: book.title,
                        author: book.author,
                        releaseYear: book.releaseYear,
                        price: book.price,
                        lastBorrowDate: book.lastBorrowDate,
                        lastBorrower: book.lastBorrower,
                        available: book.isAvailable
                    }), { encoding: 'utf8' });
                    writeFile.then(() => {
                        resolve(book.number);
                        return;
                    },
                    (err) => reject(err));
                })
            }
        )
    }
    Update(bookDto: UpdateBookDto): Promise<void> {
        return new Promise((resolve, reject) => {
            promisify(fs.stat)(`${this.fileStorePath}/${bookDto.number}.json`)
                .then(
                    () => {
                        const readFile = promisify(fs.readFile)(`${this.fileStorePath}/${bookDto.number}.json`, { encoding: 'utf8'})
                        readFile.then((data) => {
                            let updatedBook = {
                                ...JSON.parse(data),
                                ...bookDto
                            }
                            const writeFile = promisify(fs.writeFile)(`${this.fileStorePath}/${bookDto.number}.json`, JSON.stringify(updatedBook), { encoding: 'utf8' });
                            writeFile.then(() => {
                                resolve();
                            },
                            (err) => reject(err));
                        },
                        (err) => reject(err));
                    },
                    (err) => {
                        reject({
                            error: "Book does not exist"
                        });
                    }
                )
        });
    }
    Delete(bookNumber: number): Promise<void> {
        return new Promise((resolve, reject) => {
            promisify(fs.stat)(`${this.fileStorePath}/${bookNumber}.json`)
                .then(
                    () => {
                        const readFile = promisify(fs.unlink)(`${this.fileStorePath}/${bookNumber}.json`)
                        readFile.then(
                            () => resolve(),
                            (err) => reject(err)
                        );
                    },
                    (err) => {
                        reject({
                            error: "Book does not exist"
                        });
                    }
                )
        });
    }

}