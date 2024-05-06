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
        res.status(201).json({ accessToken: token })
    } catch (error) {
        return next(createHttpError(500, "Error while singing the token"))
    }

};




const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(createHttpError(400, "all fields are required"))
    }

    const user = await userModel.findOne({ email })

    try {
        if (!user) {
            return next(createHttpError(404, "User not found."))
        }
    } catch (error) {
        return next(error)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    try {
        if (!isMatch) {
            return next(createHttpError(400, "username or password incorrect"))
        }
    } catch (error) {
        return next(error)
    }

    try {
        // creating access token
        const token = sign({ sub: user._id }, config.jwtSecret as string, { expiresIn: '7d' });
        res.json({ accessToken: token })
    } catch (error) {
        return next(createHttpError(400, "Eorror while generating the token"))
    }



}









export { createUser, loginUser }