import { Router } from 'express';
import passport from 'passport';
import validate from './../middlewares/validate.js';
import { getOneRecipeSchema, getUserRecipesSchema, postRecipeSchema, saveRecipeSchema, searchRecipeSchema, rateRecipeSchema } from '../validateSchema/index.js';
import {postRecipe, searchRecipe, getAllRecipes, getUserRecipes, getOneRecipe } from '../controllers/recipe.js'
import { saveRecipe, unsaveRecipe } from '../controllers/saveRecipe.js';
import { rateRecipe } from '../controllers/rateRecipe.js';



const router = Router();

let p_auth = passport.authenticate('jwt', {session: false});  // protect the route if not logged in

router.get('/', p_auth, getAllRecipes);

router.get('/find', p_auth, validate(searchRecipeSchema), searchRecipe);
router.post('/post', p_auth, validate(postRecipeSchema), postRecipe)
router.get('/user/:userID', p_auth, validate(getUserRecipesSchema), getUserRecipes);
router.get('/:id', p_auth, validate(getOneRecipeSchema), getOneRecipe);
router.post('/save/:id', p_auth, validate(saveRecipeSchema), saveRecipe);
router.post('/unsave/:id', p_auth, validate(saveRecipeSchema), unsaveRecipe);
router.post('/rate/:id', p_auth, validate(rateRecipeSchema), rateRecipe);


export {router};


