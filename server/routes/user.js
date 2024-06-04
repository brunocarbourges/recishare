import { Router } from 'express';
import passport from 'passport';
import validate from '../middlewares/validate.js';
import { followSchema } from '../validateSchema/index.js';
import { followUser, unfollowUser } from '../controllers/user.js';

const router = Router();

let p_auth = passport.authenticate('jwt', {session: false});  // protect the route if not logged in

//Follow a user
router.post('/follow/:id', p_auth, validate(followSchema), followUser);

//Unfollow a user
router.post('/unfollow/:id', p_auth, validate(followSchema), unfollowUser);

export {router};