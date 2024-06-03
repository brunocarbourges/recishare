import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';

export const likeRecipe = async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (!recipe.likes.includes(user._id)) {
            recipe.likes.push(user._id);
            await recipe.save();
            return res.status(200).json({ message: 'Recipe liked' });
        } else {
            return res.status(400).json({ message: 'You have already liked this recipe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const unlikePost = async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.likes.includes(user._id)) {
            recipe.likes = recipe.likes.filter(userId => userId.toString() !== user._id.toString());
            await recipe.save();
            return res.status(200).json({ message: 'Recipe unliked' });
        } else {
            return res.status(400).json({ message: 'You have not liked this recipe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};