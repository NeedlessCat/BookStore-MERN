import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Route for Save a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

//Route to GET All Books from database...
router.get('/', async (request,response) => {
    try {
        const book = await Book.find({});
        //return response.status(200).json(books);
        return response.status(200).json({
            count: book.length,
            data: book
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route to GET All Books from database by id.....
router.get('/:id', async (request,response) => {
    try {
        const { id } = request.params;

        const book = await Book.findByID(id);
        //return response.status(200).json(books);
        return response.status(200).json({
            count: book.length,
            data: book
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route to Update a BOOK
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);

        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({ messgae: 'Book updated successfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({messgae: error.messgae});
    }
})

//Route to Delete a book...
router.delete('/:id',async(request,response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        
        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }
        
        return response.status(200).send({ message: 'Book deleted successfully' });
    }
    catch {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;