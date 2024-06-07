import { Recipe, User } from '../models/index.js';
import { upload } from '../cloudinary/index.js'
import { checkImageType } from '../utils/index.js'
import {CONST} from '../constants/constants.js';


export const postRecipe = async function(req, res, next) {

    // bad request if you didn't add a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({error: "Holy mackerel! No images were uploaded."});
    }

    const image = req.files.image;

    // file type must match our supported image types
    if (!checkImageType(image)) {
        return res.status(422).json({error: "In a nutshell, we don't support that image type."})
    }

    // define imageUrl and imageId
    let imageUrl = '';
    let imageId = '';

    // will get imageUrl and imageId from cloudinary
    try {
        const res = await upload(image.data, "Images");
        if (res) {
            imageUrl = res.secure_url;
            imageId = res.public_id;
        }
    } 
    catch (error) {
        console.log(error, "I'll spill the beans, there's a Cloudinary error");
        return res.status(500).json({ error: error})
    }

    const {
        userID,
        title,  
        description, 
        ingredients,
        vegetarian,
        vegan, 
        glutenfree, 
        nutfree,
        dairyfree,
        lowsodium,
        lowcarb, 
        keto
    } = req.body;

    if (ingredients.length < 2) {
        return res.status(422).json({error: "You must have at least two ingredients."});
    }

    try {
        const newRecipe = await Recipe.create({
            user: userID, title, description, ingredients, 
            image: { url: imageUrl, id: imageId }, 
            tags: {
                vegetarian: vegetarian, 
                vegan: vegan, 
                glutenfree: glutenfree, 
                nutfree: nutfree,
                dairyfree: dairyfree,
                lowsodium: lowsodium,
                lowcarb: lowcarb, 
                keto: keto
            }
        });
        return res.status(201).json({message: 'Recipe created! Piece of cake.', ...newRecipe});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "An error occurred. What a pickle."});
    }


};

// search for a specific recipe
export const searchRecipe = async function(req, res, next) {
    const {q} = req.query;

    // aggregation pipeline for searching
    const pipeline = [
        {
            // basic search query , returns all matches of q
            $search: {
                index: "recipe",
                text: { query: q, path: {wildcard: "*"} }
            }  
        },
        {
            // lookup the user in the collection, after query return back as user (instead of _id)
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            // want to display all aspects of recipe schema to user
            $project: {
                user: 1,
                title: 1,
                description: 1,
                note: 1,
                ingredients: 1,
                image: 1,
                tags: 1,
            }
        },
      ];

    // aggregate function to chain multiple pipelines (descending order)
    const recipes = await Recipe.aggregate(pipeline).sort({_id: -1}).exec();
    let response = [];

    // if we get a recipe matching our search query, 
    if (recipes?.length) {
        response = recipes.map((recipe) => {
            const { user, ...other } = recipe;  /* only get user */ 
            const username = user[0].username;

            return { username, ...other }
        })
    }

    // will return an empty array if cannot find any match to the query
    // will return the username of the user who posted the recipe if found a match to the query
    res.status(200).json(response);

}

// get all the recipes in the database from all users
export const getAllRecipes = async function(req, res, next) {
    try {
        const recipes = await Recipe.find({}).populate('user', 'username').sort({_id: -1}).exec();
        /* go to user's collection and find the user that has that id to get their recipes */
        /* sort in reverse so newer recipes are shown first */
        /* exec to execute query */

        return res.status(200).json(recipes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error getting those recipes."});

    }
};

// get all the recipes in the database from all users
export const getBestRecipes = async function(req, res, next) {
    try {
        const recipes = await Recipe.find({}).populate('user', 'username').sort({averageRating: -1}).exec();
        /* go to user's collection and find the user that has that id to get their recipes */
        /* sort in reverse so newer recipes are shown first */
        /* exec to execute query */

        return res.status(200).json(recipes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error getting those recipes."});

    }
};

// get all the recipes in the database from all users
export const getFollowingRecipes = async function(req, res, next) {
    try {

        const { userID } = req.params;
        const user = await User.findById(userID).select('following').exec();
        const followingList = user.following;

        const recipes = await Recipe.find({user: {$in: followingList}}).populate('user', 'username').sort({_id: -1}).exec();

        return res.status(200).json(recipes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error getting those recipes."});

    }
};

export const getSavedRecipes = async function(req, res, next) {
    try {


        const { userID } = req.params;
        const user = await User.findById(userID).select('saved_recipes').exec();
        const saved_list = user.saved_recipes;


        const recipes = await Recipe.find({_id: {$in: saved_list}}).populate('user', 'username').sort({_id: -1}).exec();


        return res.status(200).json(recipes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error getting those recipes."});


    }
};


// get one recipe matching the search query
export const getOneRecipe = async function(req, res, next) {
    const {id} = req.params;  // middleware checks before whether params is empty

    try {
        const recipe = await Recipe.findById(id).populate('user', 'username').exec();
        // find a recipe matching a specific id

        if (!recipe) {
            return res.status(404).json({error: "Nuts! We couldn't find that recipe."});
        }

        return res.status(200).json(recipe);  // maybe get rid of return statement
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error finding that recipe."});

    }
};

// get all recipes belonging to a certain user 
export const getUserRecipes = async function(req, res, next) {
    const { userID } = req.params;  // middleware checks before whether params is empty

    try {
        const recipes = await Recipe.find({ user: userID }).populate('user', 'username').sort({ _id: -1 }).exec();
        // find all recipes belonging to the given id

        if (!recipes?.length) {
            return res.status(404).json({error: "Nuts! We couldn't find any recipes belonging to that user."});
        }

        return res.status(200).json(recipes);  // maybe get rid of return statement
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error finding that user."});

    }
};