import { Router } from 'express';
import validate from './../middlewares/validate.js';
import { findOneRecipeSchema, getAllUserRecipesSchema, makeRecipeSchema, searchRecipeSchema } from '../validateSchema/index.js';
import createRecipe from '../controllers/recipe.js';

const router = Router();

router.post('/login')

router.get('/search', validate(searchRecipeSchema));
router.get('/');
router.post('/make', validate(makeRecipeSchema), createRecipe)
router.get('/user/:userID', validate(getAllUserRecipesSchema));
router.get('/:id', validate(findOneRecipeSchema));

export {router};
