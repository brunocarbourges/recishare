import { Router } from 'express';
import passport from 'passport';
import validate from '../middlewares/validate.js';
import { getUserDataSchema, searchUserSchema, followSchema } from '../validateSchema/index.js';
import { getUserData, searchUser, followUser, unfollowUser } from '../controllers/user.js';

const router = Router();

let p_auth = passport.authenticate('jwt', {session: false});  // protect the route if not logged in

router.get('/id/:userID', validate(getUserDataSchema), getUserData);

// Search for a user
router.get('/find', p_auth, validate(searchUserSchema), searchUser);


//Follow a user
router.post('/follow/:id', p_auth, validate(followSchema), followUser);

//Unfollow a user
router.post('/unfollow/:id', p_auth, validate(followSchema), unfollowUser);

export {router};