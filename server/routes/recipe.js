import { Router } from 'express';
import validate from './../middlewares/validate.js';
import { findOneRecipeSchema, getAllUserRecipesSchema, makeRecipeSchema, searchRecipeSchema, saveRecipeSchema } from '../validateSchema/index.js';
import createRecipe from '../controllers/recipe.js';
import saveRecipe from '../controllers/recipe.js';
const router = Router();


router.post('/login')
router.get('/search', validate(searchRecipeSchema));
router.get('/');
router.post('/make', validate(makeRecipeSchema), createRecipe);
router.put('/:id/save', validate(saveRecipeSchema), saveRecipe);
router.get('/user/:userID', validate(getAllUserRecipesSchema));
router.get('/:id', validate(findOneRecipeSchema));


export {router};
