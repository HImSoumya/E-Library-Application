import { NextFunction, Request, Response } from "express";
import fs from 'node:fs'
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import bookModel from "./bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log("files", req.files)

    const { title, genre } = req.body
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // 'application/pdf'
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        fileName
    );


    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFileName
    );

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "book-covers",
            format: coverImageMimeType,
        });


        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: "book-pdfs",
            format: "pdf"
        })

        console.log(uploadResult)
        console.log(bookFileUploadResult)

        const newBook = await bookModel.create({
            title,
            genre,
            author: "665afedd0107c1d59131c58b",
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url
        })

        await fs.promises.unlink(filePath)
        await fs.promises.unlink(bookFilePath)

        res.status(201).json({ id: newBook._id })

    } catch (error) {
        next(createHttpError(400, "Error while creating book."))
    }



}


export { createBook }