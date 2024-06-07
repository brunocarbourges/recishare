import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';

export const rateRecipe = async (req, res) => {
    try {
        const { userID, rating } = req.body;
        const { id } = req.params;

        // Validate the rating
        if (![1, 2, 3, 4, 5].includes(rating)) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Decrement previous rating if user has already rated the recipe
        if (recipe.ratings.has(userID)) {
            const previousRating = recipe.ratings.get(userID.toString());
            const rrating = recipe.ratings.get(previousRating.toString())
            recipe.ratings.set(previousRating.toString(), rrating - 1);
            recipe.ratings.set(userID.toString(), rating);
        } else {
            recipe.ratings.set(userID.toString(), rating);
        }

        recipe.ratings.set(rating.toString(), (recipe.ratings.get(rating.toString()) || 0) + 1);

        let totalRating = 0;
        let totalCount = 0;
        let allHash = ["1","2","3","4","5"];
        for(let i = 0; i < allHash.length; i++) {
            totalRating += recipe.ratings.get(allHash[i]);
            if(allHash[i] == "1") {
                totalCount += recipe.ratings.get(allHash[i]);
            } else if(allHash[i] == "2") {
                totalCount += 2 * recipe.ratings.get(allHash[i]);
            } else if(allHash[i] == "3") {
                totalCount += 3 * recipe.ratings.get(allHash[i]);
            } else if(allHash[i] == "4") {
                totalCount += 4 * recipe.ratings.get(allHash[i]);
            } else if(allHash[i] == "5") {
                totalCount += 5 * recipe.ratings.get(allHash[i]);
            }
        }
        const averageRating =  totalCount / totalRating;

        // Update the averageRating field in the recipe
        recipe.averageRating = averageRating;

        await recipe.save();

        return res.status(200).json({ message: 'Recipe rated', ratings: Object.fromEntries(recipe.ratings) });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};