import { AddBookDto } from "../dtos/AddBookDto";
import { GetBookDto } from "../dtos/GetBookDto";
import { UpdateBookDto } from "../dtos/UpdateBookDto";

export interface IBookRepository
{
    GetByNumber(bookNumber: number): Promise<GetBookDto | undefined>;
    GetAll() : Promise<GetBookDto[]>;
    Add(bookDto: AddBookDto): Promise<number>;
    Update(bookDto: UpdateBookDto): Promise<void>;
    Delete(bookNumber: number): Promise<void>;
}