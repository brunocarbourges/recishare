import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { authRouter, recipeRouter, userRouter, searchRouter } from "./routes/index.js";
import passport from "passport";
import { authenticate } from "./config/index.js";

import records from "./routes/record.js";

import fileUpload from "express-fileupload";

import {CONST} from './constants/constants.js'

import path from 'path';

// Reads from the .env file to set process.env
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
}));

app.use(express.json());

app.use("/records", records);

// if fileSize is larger than 50 MB, abort
app.use(
    fileUpload({ 
        limits: {fileSize: CONST.MAX_FILE_SIZE*1024*1024},
        abortOnLimit: true
    })
);

app.use(passport.initialize()); // initialize passport (for authentication)

authenticate(passport);  // validates the route, only logged in users can access the database

app.use('/auth', authRouter);  // authenticate user
app.use('/recipe', recipeRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter)

// Start Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', function(req, res, next) {
    res.send("ReciShare is in the oven, let us cook!");
});


