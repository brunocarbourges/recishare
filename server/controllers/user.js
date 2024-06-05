import { User } from '../models/user.js';

export const getUserData = async (req, res) => {

    const user = await User.findById(req.user._id);
    console.log(user)

    const response = {
        username: user.username,
        followers: user.followers,
        following: user.following,
        saved_recipes: user.saved_recipes,
        createdAt: user.createdAt
    };
    
    return res.status(200).json(response);
};

export const followUser = async (req, res) => {
    try {
        console.log("Followed by user:", req.user._id);
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Authenticated user not found' });
        }
        const userToFollow = await User.findById(req.params.id);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User to follow not found' });
        }

        if (user.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);

        await user.save();
        await userToFollow.save();

        res.status(200).json({ message: 'User followed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        console.log("Unfollowed by user:", req.user._id);
        const user = await User.findById(req.user._id)
        if (!user) {
            console.error("Authenticated user not found");
            return res.status(404).json({ message: 'Authenticated user not found' });
        }

        const userToUnfollow = await User.findById(req.params.id);
        if (!userToUnfollow) {
            console.error("User to unfollow not found");
            return res.status(404).json({ message: 'User to unfollow not found' });
        }

        if (!user.following.includes(userToUnfollow._id)) {
            console.error("User not being followed");
            return res.status(400).json({ message: 'You are not following this user' });
        }

        user.following = user.following.filter(followingId => followingId.toString() !== userToUnfollow._id.toString());
        userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== user._id.toString());

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed' });
    } catch (error) {
        console.error("Error in unfollow route:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};