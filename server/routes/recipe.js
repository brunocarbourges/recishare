import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';
import { Router } from 'express';
import validate from './../middlewares/validate.js';
import { findOneRecipeSchema, getAllUserRecipesSchema, makeRecipeSchema, saveRecipeSchema, searchRecipeSchema } from '../validateSchema/index.js';
import authenticate from '../middlewares/authenticate.js'
import createRecipe from '../controllers/recipe.js'; // Importing createRecipe

const router = Router();

router.post('/login')
router.get('/search', validate(searchRecipeSchema));
router.get('/');
router.post('/make', validate(makeRecipeSchema), createRecipe);
router.get('/user/:userID', validate(getAllUserRecipesSchema));
router.get('/:id', validate(findOneRecipeSchema));
// save a post
router.post('/save/:id', validate(saveRecipeSchema), async (req, res) => {
    try {
        // No need to check for authenticated user
        const user = await User.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (user.saved_recipes.includes(recipe._id)) {
            return res.status(400).json({ message: 'You have already saved this recipe' });
        }

        user.saved_recipes.push(recipe._id);

        await user.save();

        res.status(200).json({ message: 'Recipe saved' });
    } catch (error) {
        res.status(500).json({ message: 'Server error was thrown :p', error: error.message });
    }
});

router.post('/unsave/:id', validate(saveRecipeSchema), async (req, res) => {
    try {
        console.log("Unsave recipe request received");
        // No need to check for authenticated user
        const user = await User.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (!user.saved_recipes.includes(recipe._id)) {
            return res.status(400).json({ message: 'You have not saved this recipe' });
        }

        user.saved_recipes = user.saved_recipes.filter(savedRecipeId => savedRecipeId.toString() !== recipe._id.toString());

        await user.save();

        res.status(200).json({ message: 'Recipe unsaved' });
    } catch (error) {
        res.status(500).json({ message: 'Server error was thrown :p', error: error.message });
    }
});



export {router};
