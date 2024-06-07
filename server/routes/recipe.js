import { Router } from 'express';
import passport from 'passport';
import validate from './../middlewares/validate.js';
import {
        getOneRecipeSchema, getUserRecipesSchema, getFollowingRecipesSchema, postRecipeSchema,
        saveRecipeSchema, searchRecipeSchema, rateRecipeSchema,
        getSavedRecipeSchema
        } from '../validateSchema/index.js';


import {
        postRecipe, searchRecipe, getAllRecipes, getBestRecipes,
        getFollowingRecipes, getUserRecipes, getOneRecipe, getSavedRecipes
        } from '../controllers/recipe.js'


import { saveRecipe, unsaveRecipe } from '../controllers/saveRecipe.js';
import { rateRecipe } from '../controllers/rateRecipe.js';



const router = Router();

let p_auth = passport.authenticate('jwt', {session: false});  // protect the route if not logged in

router.get('/find', validate(searchRecipeSchema), searchRecipe);
router.post('/post', validate(postRecipeSchema), postRecipe);

router.get('/', getAllRecipes);
router.get('/bestrec', getBestRecipes);
// router.get('/tags', p_auth, getBestRecipes);

router.get('/saved/:userID', validate(getSavedRecipeSchema), getSavedRecipes);
router.get('/user/:userID', validate(getUserRecipesSchema), getUserRecipes);
router.get('/following/:userID', validate(getFollowingRecipesSchema), getFollowingRecipes);

router.get('/:id', validate(getOneRecipeSchema), getOneRecipe);
router.post('/save/:id', validate(saveRecipeSchema), saveRecipe);
router.post('/unsave/:id', validate(saveRecipeSchema), unsaveRecipe);
router.post('/rate/:id', validate(rateRecipeSchema), rateRecipe);


export {router};


