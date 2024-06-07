import { User } from '../models/user.js';

export const getUserData = async (req, res) => {

    const { userID } = req.params;  // middleware checks before whether params is empty

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'Authenticated user not found' });
        }
    
        const response = {
            id: userID,
            username: user.username,
            followers: user.followers,
            following: user.following,
            saved_recipes: user.saved_recipes,
            createdAt: user.createdAt
        };
        
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error finding that user."});

    }
};

// get one user matching the search query
export const searchUser = async function(req, res, next) {
    const {q} = req.query;  // middleware checks before whether params is empty

    try {
        const user = await User.find({username: q}).exec();
        // find a user matching a specific id

        if (!user) {
            return res.status(404).json({error: "Nuts! We couldn't find that user."});
        }

        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Crumbs! There was an error finding that user."});

    }
};


export const followUser = async (req, res) => {
    try {
        // Find the authenticated user (user performing the follow)
        const authenticatedUser = await User.findById(req.body.userID);

        if (!authenticatedUser) {
            console.error("Authenticated user not found");
            return res.status(404).json({ message: 'Authenticated user not found' });
        }

        // Find the user to follow by ID provided in the request body
        const userToFollow = await User.findById(req.params.id);

        if (!userToFollow) {
            console.error("User to follow not found");
            return res.status(404).json({ message: 'User to follow not found' });
        }

        if (authenticatedUser.following.includes(userToFollow._id)) {
            console.error("User already being followed");
            return res.status(400).json({ message: 'You are already following this user' });
        }

        authenticatedUser.following.push(userToFollow._id);
        userToFollow.followers.push(authenticatedUser._id);

        await authenticatedUser.save();
        await userToFollow.save();

        res.status(200).json({ message: 'User followed' });
    } catch (error) {
        console.error("Error in follow route:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        // Find the authenticated user
        const authenticatedUser = await User.findById(req.body.userID);

        if (!authenticatedUser) {
            console.error("Authenticated user not found");
            return res.status(404).json({ message: 'Authenticated user not found' });
        }

        // Find the user to unfollow by ID provided in the request body
        const userToUnfollow = await User.findById(req.params.id);

        if (!userToUnfollow) {
            console.error("User to unfollow not found");
            return res.status(404).json({ message: 'User to unfollow not found' });
        }

        if (!authenticatedUser.following.includes(userToUnfollow._id)) {
            console.error("User not being followed");
            return res.status(400).json({ message: 'You are not following this user' });
        }

        authenticatedUser.following = authenticatedUser.following.filter(followingId => followingId.toString() !== userToUnfollow._id.toString());
        userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== authenticatedUser._id.toString());

        await authenticatedUser.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed' });
    } catch (error) {
        console.error("Error in unfollow route:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};