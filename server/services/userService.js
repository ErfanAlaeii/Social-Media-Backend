import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"


export const updateUser = async (id, updateData) => {
    if (updateData.password) {
        try {
            updateData.password = await bcrypt.hash(updateData.password, 10)
        }
        catch (error) {
            throw error;
        }
    }
    try {
        const user = await userModel.findByIdAndUpdate(
            id,
            {
                $set: updateData
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!user) {
            const error = new Error('User not found.');
            error.status = 404;
            throw error;
        }

        return user
    }
    catch (error) {
        throw error
    }
}


export const deletUser = async (id) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        return deletedUser;
    }
    catch (error) {
        throw error
    }
} 