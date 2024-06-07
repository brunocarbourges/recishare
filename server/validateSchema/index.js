import * as yup from 'yup'
import {CONST} from '../constants/constants.js'

export const searchAllSchema = yup.object({
    query: yup.object({
        q: yup.string().required("You're cooked! Nothing matches this search.")
    }),
});    // get a specific user from the database

export const loginSchema = yup.object({
    body: yup.object({
        username: yup
            .string()
            .min(CONST.MIN_UN_LEN, 'Your username must contain 8 or more characters.')
            .required('You must include a username.'),
        password: yup
            .string()
            .min(CONST.MIN_PW_LEN, 'Your password must contain 8 or more characters.')
            .required('You must include a password.'),
    }),
});  // requirements to login to ReciShare

export const registerSchema = yup.object({
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

export const searchUserSchema = yup.object({
    query: yup.object({
        q: yup.string().required("You're cooked! No users match this search.")
    }),
});    // get a specific user from the database

export const followSchema = yup.object({
    params: yup.object({
        id: yup.string().required("Guess what? You'll need a valid user ID to follow."),
    }),
    body: yup.object({
        userID: yup.string().required("You'll also need a valid userID string"),
    }),
});

export const postRecipeSchema = yup.object({
    body: yup.object({
        title: yup.string().required("You must include a title for your recipe."),
        note: yup.string(),
        ingredients: yup.array().of(yup.string()).required("You must include an ingredients list."),
        description: yup.string().required("You must include a brief description about your recipe."),
        tags: yup.object({
            vegetarian: yup.boolean().notRequired(),
            vegan: yup.boolean().notRequired(),
            glutenfree: yup.boolean().notRequired(),
            nutfree: yup.boolean().notRequired(),
            dairyfree: yup.boolean().notRequired(),
            lowsodium: yup.boolean().notRequired(),
            lowcarb: yup.boolean().notRequired(),
            keto: yup.boolean().notRequired(),
        }).default(() => ({
            vegetarian: false,
            vegan: false,
            glutenfree: false,
            nutfree: false,
            dairyfree: false,
            lowsodium: false,
            lowcarb: false,
            keto: false,
        })),
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

export const getFollowingRecipesSchema = yup.object({
    params: yup.object({
        userID: yup.string().min(CONST.UID_LEN).required("This user cannot be found. Nuts!"),
    }),
});  // get all recipes that belong to a specific user

export const getSavedRecipeSchema = yup.object({
    params: yup.object({
        userID: yup.string().min(CONST.UID_LEN).required("This user cannot be found. Nuts!"),
    }),
});  // get all saved recipes

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