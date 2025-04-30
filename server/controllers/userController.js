import { deletUser, updateUser, getUser, followUser } from "../services/userService.js";


export const updateUserController = async (req, res) => {
    const id = req.params.id
    const updates = req.body

    try {
        const updateDataUser = await updateUser(
            id,
            updates
        )
        if (!updateDataUser) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User update successfully",
            updateDataUser
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error updating user", error: error.message })
    }

}


export const deletUserController = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await deletUser(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User successfully deleted.",
            user: user
        })
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user.', error: error.message });
    }
}

export const getUserController = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        const userData = user.toObject()
        delete userData.password
        res.status(200).json({
            userData,
            message: "Account has been fetched Successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


export const followUserController = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            console.error('Error: Authenticated user ID not available in req.user');
            return res.status(401).json({ message: "Authentication failed or user ID missing." });
        }

        const followerId = req.user.id

        const followedUserId = req.params.id
        if (!followedUserId) {
            return res.status(400).json({ message: "Followed user ID is missing from URL." });
        }

        const followerInfo = { id: followerId };
        const followedUserInfo = { id: followedUserId };

        const updatedUsers = await followUser(followerInfo, followedUserInfo);

        res.status(200).json({
            updatedUsers,
            message: 'User followed successfully.'
        })
    }
    catch (error) {
        if (error.message === "You cannot follow yourself" || error.message === "You have already followed this user") {
            return res.status(400).json({ message: error.message });
        }
        else {
            console.error('Error in followUserController:', error);
            res.status(500).json({ message: 'An internal error occurred while following user.', error: error.message });
        }
    }
}