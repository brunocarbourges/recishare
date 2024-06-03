import * as yup from 'yup'
import {CONST} from '../constants/constants.js'

const loginSchema = yup.object({
    body: yup.object({
        username: yup
            .string()
            .min(8, 'Your username must contain 8 or more characters.')
            .required('You must create a username.'),
        password: yup
            .string()
            .min(8, 'Your password must contain 8 or more characters.')
            .required('You must create a password.'),
    }),
});  // requirements to login to ReciShare

const followSchema = yup.object({
    params: yup.object({
        id: yup.string().required('User ID is required')
    })
}); //validating if user can make a follow request

const postRecipeSchema = yup.object({
    body: yup.object({
        title: yup.string().required("You must include a title for your recipe."),
        note: yup.string(),
        ingredients: yup.string().required("You must include an ingredients list."),
        description: yup.string().required("You must include a brief description about your recipe.")
    }),
});  // requirements for posting a recipe to ReciShare

const searchRecipeSchema = yup.object({
    query: yup.object({
        q: yup.string().required("You're cooked! No recipes match this search.")
    }),
});    // get a specific recipe from the database

const getOneRecipeSchema = yup.object({
    params: yup.object({
        id: yup.string().min(CONST.RID_LEN).required("Holy guacamole, this recipe does not exist!"),
    }),
});  // get all recipes of a specific description

const getUserRecipesSchema = yup.object({
    params: yup.object({
        userID: yup.string().min(CONST.UID_LEN).required("This user cannot be found. Nuts!"),
    }),
});  // get all recipes that belong to a specific user

const saveRecipeSchema = yup.object({
    params: yup.object({
        id: yup.string().required("Guess what? You'll need a valid Recipe ID."),
    }),
    body: yup.object({
        userID: yup.string().required("You'll also need a value userId string"),
    }),
});

const likePostSchema = yup.object({
    params: yup.object({
        user: yup.string().required("User ID is required to like a post"),
    })
});

export {loginSchema, followSchema, postRecipeSchema, searchRecipeSchema, getOneRecipeSchema, getUserRecipesSchema, saveRecipeSchema, likePostSchema };
