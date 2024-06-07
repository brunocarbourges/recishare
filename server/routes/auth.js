import Router from 'express';
import {login_func, register_func} from '../controllers/auth.js';
import validate from './../middlewares/validate.js';
import {loginSchema, registerSchema} from '../validateSchema/index.js';


const router = Router();


router.post('/login', validate(loginSchema), login_func);
router.post('/register', validate(registerSchema), register_func);


export { router };



