import { Request, Response } from "express";
import { AddBookDto, UpdateBookDto } from "@libraryapp/contract";
import { getBookRepository } from "../infrastructure/dependency-injection/dependency-injection";
import { IBookRepository } from "../repositories/IBookRepository";

interface BookNumberParams {
    bookNumber: number;
}


export class BookService
{
    private bookRepository: IBookRepository;

    constructor(bookRepository: IBookRepository = getBookRepository()) {
        this.bookRepository = bookRepository;
    }

    AddBook = (req: Request<unknown, unknown, AddBookDto>, res: Response) => {
        this.bookRepository.Add(req.body).then(
            (number) => res.status(201).json(number),
            (err) => res.status(400).json(err)
        );
    }


    GetAllBooks = (req: Request, res: Response) => {
        this.bookRepository.GetAll().then(
            (books) => {
                return res.status(200).json(books);
            },
            (err) => {
                return res.status(400).json(err);
            }
        );
    }


    GetBookByNumber = (req: Request<BookNumberParams>, res: Response) => {
        this.bookRepository.GetByNumber(req.params.bookNumber).then(
            (book) => {
                return res.status(200).json(book);
            },
            (err) => {
                return res.status(404).json(err);
            }
        );
    }


    UpdateBook = (req: Request<BookNumberParams, unknown, UpdateBookDto>, res: Response) => {
        if(req.params.bookNumber != req.body.number) {
            res.status(400).json({
                error: "Book number mismatch"
            });
            return;
        }
        this.bookRepository.Update(req.body).then(
            () => res.status(200).json(),
            (err) => res.status(404).json(err)
        );
    }


    DeleteBook = (req: Request<BookNumberParams>, res: Response) => {
        this.bookRepository.Delete(req.params.bookNumber).then(
            () => res.status(204).json(),
            (err) => res.status(404).json(err)
        );
    }

}
