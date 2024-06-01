import pkg from "mongoose";
let {Schema, model, models} = pkg

// users will have a username and a password associated to them
// the id will be assigned by mongoDB
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,  // do not want two users to use the same username
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,  // must have a password to make an account
            select: false  // password should not come back from queries w/o requesting it
        }
    },
    {
        timestamps: true,  // can view created/updated fields for posts
        autoIndex: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

// if user already exists, use that, else create a new user
const User = models.User || model("User", userSchema);

export { User };
