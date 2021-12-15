import { FileBookRepository } from "../../repositories/FileBookRepository";
import { IBookRepository } from "../../repositories/IBookRepository";
// import { InMemoryBookRepository } from "../../repositories/InMemoryBookRepository";
import { BookService } from "../../services/BookService";
import config from '../../config';

// let singletonBookRepository = new InMemoryBookRepository();
// export function getBookRepository() : IBookRepository {
    // return singletonBookRepository;
// }

const bookRepository = new FileBookRepository(config.fileStorePath);
bookRepository.InitializeStore().then(() => console.log("BookStore is ready"));
export function getBookRepository() : IBookRepository {
    return new FileBookRepository(config.fileStorePath);
}

export function getBookService() : BookService {
    return new BookService(getBookRepository());
}
