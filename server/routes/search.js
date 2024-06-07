import { Router } from 'express';
import passport from 'passport';
import validate from './../middlewares/validate.js';
import { searchAllSchema } from '../validateSchema/index.js';
import { searchAll } from '../controllers/search.js'

const router = Router();

let p_auth = passport.authenticate('jwt', {session: false});  // protect the route if not logged in

router.get('/find', p_auth, validate(searchAllSchema), searchAll);

export {router};