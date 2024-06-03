import pkg from 'passport-jwt';
const { Strategy: JwtStrategy, ExtractJwt } = pkg;
import { User } from '../models/user.js';

import dotenv from 'dotenv';
dotenv.config();  // allows .env to be accessed

const jwt_options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const authenticate = function(passport) {
    passport.use(
        new JwtStrategy(jwt_options, async function(jwt_payload, done) {
            try {
                // check database if there is a user that matches the id
                const user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user?._id);  // returns the corresponding user
                }
                else return done(null, false); // returns no user
            }
            catch (error) {
                console.log(error);
            }
        })
    )
};

export { authenticate };