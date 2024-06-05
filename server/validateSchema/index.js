import * as yup from 'yup'
import {CONST} from '../constants/constants.js'

export const loginSchema = yup.object({
    body: yup.object({
        username: yup
            .string()
            .min(CONST.MIN_UN_LEN, 'Your username must contain 8 or more characters.')
            .required('You must create a username.'),
        password: yup
            .string()
            .min(CONST.MIN_PW_LEN, 'Your password must contain 8 or more characters.')
            .required('You must create a password.'),
    }),
});  // requirements to login to ReciShare

export const getUserDataSchema = yup.object({
    params: yup.object({
        userID: yup.string().min(CONST.UID_LEN).required("This user cannot be found. Nuts!"),
    }),
});  // get all recipes that belong to a specific user

export const followSchema = yup.object({
    params: yup.object({
        id: yup.string().required('User ID is required')
    })
}); //validating if user can make a follow request

export const postRecipeSchema = yup.object({
    body: yup.object({
        title: yup.string().required("You must include a title for your recipe."),
        note: yup.string(),
        ingredients: yup.string().required("You must include an ingredients list."),
        description: yup.string().required("You must include a brief description about your recipe.")
    }),
});  // requirements for posting a recipe to ReciShare

export const searchRecipeSchema = yup.object({
    query: yup.object({
        q: yup.string().required("You're cooked! No recipes match this search.")
    }),
});    // get a specific recipe from the database

export const getOneRecipeSchema = yup.object({
    params: yup.object({
        id: yup.string().min(CONST.RID_LEN).required("Holy guacamole, this recipe does not exist!"),
    }),
});  // get all recipes of a specific description

export const getUserRecipesSchema = yup.object({
    params: yup.object({
        userID: yup.string().min(CONST.UID_LEN).required("This user cannot be found. Nuts!"),
    }),
});  // get all recipes that belong to a specific user

export const saveRecipeSchema = yup.object({
    params: yup.object({
        id: yup.string().required("Guess what? You'll need a valid Recipe ID."),
    }),
    body: yup.object({
        userID: yup.string().required("You'll also need a valid userID string"),
    }),
});


export const rateRecipeSchema = yup.object({
    params: yup.object({
        id: yup.string().required("Recipe ID is required to rate a post"),
    }),
    body: yup.object({
        userID: yup.string().required("User ID is required"),
        rating: yup.number().required("Rating is required").min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    })
});