import Router from 'express';
import login_func from '../controllers/auth.js';
import validate from './../middlewares/validate.js';
import {loginSchema} from '../validateSchema/index.js';

const router = Router();

router.post('/login', validate(loginSchema), login_func);

export { router };
