import { model, Schema, SchemaTypes } from "mongoose";

const recipeSchema = new Schema(
    {
        user: { 
            type: SchemaTypes.ObjectId, ref: "User"
        },
        /* each recipe belongs to a user, passing key of user (user id created by mongoDB) to their recipe */
        title: { 
            type: String, required: true, index: true
        },
        description: {
            type: String, required: true, index: true
        },
        note: {
            type: String, index: true
        },
        ingredients: {
            type: String, required: true, index: true
        },
        image: {
            url: { type: String, required: true},
            id:  { type: String, required: true},
        },
    },
    {
        timestamps: true,  // can view created/updated fields for posts
        autoIndex: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

const Recipe = model("Recipe", recipeSchema);

export {Recipe};