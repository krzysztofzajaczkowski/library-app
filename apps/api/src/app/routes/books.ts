
import * as express from 'express';
import { getBookService } from "../infrastructure/dependency-injection/dependency-injection";



const router = express.Router()
router.post('/api/books', getBookService().AddBook)
router.get('/api/books', getBookService().GetAllBooks)
router.get('/api/books/:bookNumber', getBookService().GetBookByNumber)
router.put('/api/books/:bookNumber', getBookService().UpdateBook);
router.delete('/api/books/:bookNumber', getBookService().DeleteBook);

export { router as bookRoutes }
