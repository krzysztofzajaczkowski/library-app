export interface GetBookDto
{
    number: number;
    title: string;
    author: string;
    releaseYear: number;
    price: number;
    lastBorrowDate: number | null;
    lastBorrower: string | null;
    available: boolean;
}