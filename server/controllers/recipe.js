import { User } from '../models/user.js';
import { Recipe } from "../models/recipe.js";


const saveRecipe = async (req, res) => {
    const userId = req.body.userId;
    const recipeId = req.params.id;


    try {
        const user = await User.findById(userId);


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        if (!user.saved_recipes.includes(recipeId)) {
            user.saved_recipes.push(recipeId);
            await user.save();
            return res.status(200).json({ message: 'Recipe saved successfully' });
        } else {
            return res.status(400).json({ error: 'Recipe already saved' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Some sort of error was thrown :P' });
    }
};


export { saveRecipe };


const createRecipe = async (req, res, next) => {
    const { title, description, note, ingredients, image } = req.body;


    try {
        // Create a new recipe
        const newRecipe = await Recipe.create({
            title,
            description,
            note,
            ingredients,
            image
        });


        // Respond with the newly created recipe
        return res.status(201).json({ recipe: newRecipe });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ error: "Some sort of error was thrown :P" });
    }
};

export default createRecipe;