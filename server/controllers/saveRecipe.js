import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';
import jwt from "jsonwebtoken";

export const saveRecipe = async (req, res) => {
    try {
        // No need to check for authenticated user
        const user = await User.findById(req.body.userID);
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from .env
        } catch (error) {
            console.error('Token verification error:', error.name, error.message);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired.' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: 'Invalid token.' });
            } else {
                return res.status(400).json({ message: 'Token verification failed.' });
            }
        }

        const associatedUserID = decoded.id;

        if (associatedUserID != req.body.userID) {
            return res.status(400).json({ message: 'Ooops not using a different userID is not allowed :p' });
        }

        if (user.saved_recipes.includes(recipe._id)) {
            return res.status(400).json({ message: 'You have already saved this recipe' });
        }

        user.saved_recipes.push(recipe._id);

        await user.save();

        res.status(200).json({ message: 'Recipe saved' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error was thrown :p', error: error.message });
    }
};


export const unsaveRecipe = async (req, res) => {
    try {
        console.log("Unsave recipe request received");
        const user = await User.findById(req.body.userID);
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from .env
        } catch (error) {
            console.error('Token verification error:', error.name, error.message);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired.' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: 'Invalid token.' });
            } else {
                return res.status(400).json({ message: 'Token verification failed.' });
            }
        }

        const associatedUserID = decoded.id;

        if (associatedUserID != req.body.userID) {
            return res.status(400).json({ message: 'Ooops not using a different userID is not allowed :p' });
        }

        if (!user.saved_recipes.includes(recipe._id)) {
            return res.status(400).json({ message: 'You have not saved this recipe' });
        }

        user.saved_recipes = user.saved_recipes.filter(savedRecipeId => savedRecipeId.toString() !== recipe._id.toString());

        await user.save();

        res.status(200).json({ message: 'Recipe unsaved' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error was thrown :p', error: error.message });
    }
};
