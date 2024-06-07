import { Recipe, User } from '../models/index.js';
import { CONST } from '../constants/constants.js';

// combined search for recipes, users, and tags

// search for a specific recipe
export const searchAll = async function(req, res, next) {
    const {q} = req.query;
    let response = [];

    // Check if the query parameter matches one of the allowed tags
    if (CONST.POSSIBLE_TAGS.includes(q)) {
        try {
            // Construct the query object
            const query = {};
            query[`tags.${q}`] = true;

            // Find users with the specified tag set to true
            const recipes = await Recipe.find(query).populate('user').exec();

            let response1 = [];

            // if we get a recipe matching our search query, 
            if (recipes?.length) {
                response1 = recipes.map((recipe) => {
                    const { user, ...other } = recipe.toObject();  /* only get user */ 
                    const username = user.username;

                    return {username, ...other};
                })
            }

            response = response.concat(response1);

        } 
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Crumbs! There was an error searching by tag." });
        }

    }
    else {
        try {
            const user = await User.find({username: q}).exec();
            // find a recipe matching a specific id

            if (!user) {
                return res.status(404).json({error: "Nuts! We couldn't find that user."});
            }

            response = response.concat(user);

        }
        catch (error) {
            console.log(error);
            res.status(500).json({error: "Crumbs! There was an error finding that user."});

        }

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
                    ingredients: 1,
                    image: 1,
                    tags: 1,
                    averageRating: 1,
                    ratings: 1,
                }
            },
        ];

        // aggregate function to chain multiple pipelines (descending order)
        const recipes = await Recipe.aggregate(pipeline).sort({_id: -1}).exec();
        let response2 = [];

        // if we get a recipe matching our search query, 
        if (recipes?.length) {
            response2 = recipes.map((recipe) => {
                const { user, ...other } = recipe;  /* only get user */ 
                const username = user[0].username;

                return { username, ...other };
            })
        }

        response = response.concat(response2);

    }

    res.status(200).json(response);

};

