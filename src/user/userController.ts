import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userType";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // getting data from req.body
    const { name, email, password } = req.body

    // checking whether req.body is empty or not
    if (!name || !email || !password) {
        const error = createHttpError(400, "All Fields Are Required.")
        return next(error)
    }

    try {
        // checking whether email exist in our db or not
        const user = await userModel.findOne({ email: email })
        if (user) {
            const error = createHttpError(400, "User already exist with this email")
            return next(error)
        }

    } catch (error) {
        return next(createHttpError(500, "Error while getting user."))
    }

    let newUser: User

    try {
        // creating a hashed password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating out new user
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
    } catch (error) {
        return next(createHttpError(500, "Error while creating new user"))
    }

    try {
        // generating token using jwt
        const token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: '7d' });
        res.json({ accessToken: token })
    } catch (error) {
        return next(createHttpError(500, "Error while singing the token"))
    }

}









export { createUser }