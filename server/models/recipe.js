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
            type: Array, required: true, index: true
        },
        image: {
            url: { type: String, required: true},
            id:  { type: String, required: true},
        },
        ratings: {
            type: Map,
            of: Number,
            default: {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
        },
        averageRating: {
            type: Number,
            default: 0
        },
        tags: {
            vegetarian: {type: Boolean, default: false},
            vegan: {type: Boolean, default: false},
            glutenfree: {type: Boolean, default: false},            
            nutfree: {type: Boolean, default: false},
            dairyfree: {type: Boolean, default: false},
            lowsodium: {type: Boolean, default: false},
            lowcarb: {type: Boolean, default: false},
            keto: {type: Boolean, default: false},
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