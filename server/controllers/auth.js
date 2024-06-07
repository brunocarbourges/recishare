import {User} from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {CONST} from "../constants/constants.js";


import dotenv from "dotenv";
dotenv.config();


const jwtSign = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}
// maybe add an expiration for the token


const login_func = ( async function(req, res, next) {
    const {username, password} = req.body;


    try {
        const maybeUser = await User.findOne({username}).select("+password").exec();
        // if user in database, check if password matches
        if (maybeUser) {
            if (!(await(bcrypt.compare(password, maybeUser?.password)))) {
                return res.status(400).json({error: "This user cannot be found. Crumbs!"});
            }


            const token = jwtSign(maybeUser?._id);
            return res.status(200).json({token, username, id: maybeUser?._id});  
            // returns successfully to the client if user exists
        }
        return res.status(400).json({error: "Don't go bananas, no user with this username and password exists."});


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "What a bunch of baloney! We couldn't process your information, please try again."});
        // server side error
    }
});




const register_func = ( async function(req, res, next) {
    const {username, password} = req.body;

    if (CONST.POSSIBLE_TAGS.includes(username)) {
        return res.status(400).json({error: "Please pick a different username."});
    }

    try {
        const maybeUser = await User.findOne({username}).select("+password").exec();

        if (maybeUser) {
            return res.status(400).json({error: "This username is already taken. Don't cry over spilled milk."});  
        }
        const newUser = await User.create({username, password : await bcrypt.hash(password, CONST.SALT)});


        const token = jwtSign(newUser._id);


        return res.status(201).json({token, username: newUser?.username, id: newUser._id});
        // automatically creates a new user with their input username and password


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "What a bunch of baloney! We couldn't process your information, please try again."});
        // server side error
    }
});


export { login_func, register_func };


// if user in database, log user in
// if user not in database, "register" user by adding them to database, then log new user in



