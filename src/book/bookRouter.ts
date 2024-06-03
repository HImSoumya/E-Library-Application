import path from "node:path"
import express from "express"
import { createBook, updateBook,listBooks,getSingleBook } from "./bookController"
import multer from "multer"
import authenticate from "../middlewares/authenticate"

const bookRouter = express.Router()

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fieldSize: 10000 }//10 mb
})

bookRouter
    .post("/",
        authenticate,
        upload.fields([
            { name: 'coverImage', maxCount: 1 },
            { name: 'file', maxCount: 1 }
        ]), createBook)
    .patch("/:bookId",
        authenticate,
        upload.fields([
            { name: 'coverImage', maxCount: 1 },
            { name: 'file', maxCount: 1 }
        ]), updateBook)
    .get("/",listBooks)
    .get("/:bookId",getSingleBook)

export default bookRouter