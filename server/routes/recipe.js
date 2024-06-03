import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';
import { Router } from 'express';
import validate from './../middlewares/validate.js';
import { findOneRecipeSchema, getAllUserRecipesSchema, makeRecipeSchema, saveRecipeSchema, searchRecipeSchema } from '../validateSchema/index.js';
import createRecipe from '../controllers/recipe.js'; // Importing createRecipe
import { saveRecipe } from '../controllers/saveRecipe.js';
import { unsaveRecipe } from '../controllers/saveRecipe.js';
import { likeRecipe } from '../controllers/likeRecipe.js';
import { unlikePost } from '../controllers/likeRecipe.js';

const router = Router();

router.post('/login')
router.get('/search', validate(searchRecipeSchema));
router.get('/');
router.post('/make', validate(makeRecipeSchema), createRecipe);
router.get('/user/:userID', validate(getAllUserRecipesSchema));
router.get('/:id', validate(findOneRecipeSchema));
router.post('/save/:id', validate(saveRecipeSchema), saveRecipe);
router.post('/unsave/:id', validate(saveRecipeSchema), unsaveRecipe);
router.post('/like/:id', validate(saveRecipeSchema), likeRecipe);
router.post('/unlike/:id', validate(saveRecipeSchema), unlikePost);


export {router};
