import { Router } from 'express';
import validate from './../middlewares/validate.js';
import { findOneRecipeSchema, getAllUserRecipesSchema, makeRecipeSchema, searchRecipeSchema } from '../validateSchema/index.js';

const router = Router();

router.post('/login')

router.get('/search', validate(searchRecipeSchema));
router.get('/');
router.post('/make', validate(makeRecipeSchema))
router.get('/user/:userID', validate(getAllUserRecipesSchema));
router.get('/:id', validate(findOneRecipeSchema));

export {router};
