import { Recipe } from "../models/recipe.js";

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
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default createRecipe;
