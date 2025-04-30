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


export const getUser = async (id) => {
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (err) {
        throw err;
    }
};


export const followUser = async (followerInfo, followedUserInfo) => {
    //چک می‌کند که آیا کاربر تلاش می‌کند خودش را دنبال کند
    if (followerInfo.id === followedUserInfo.id) {
        throw new Error("You cannot follow yourself");
    }
    else {
        try {
            //پیدا کردن داکیومنت کاربر دنبال‌کننده از دیتابیس
            const user = await userModel.findById(followerInfo.id)
            //پیدا کردن داکیومنت کاربری که قرار است دنبال شود از دیتابیس
            const currentUser = await userModel.findById(followedUserInfo.id)

            if (!user.followings.includes(currentUser.id)) {
                //اضافه کردن آیدی کاربر دنبال‌کننده به لیست followers کاربر دنبال‌شونده در دیتابیس
                await currentUser.updateOne({ $push: { followers: followerInfo.id } })
                //اضافه کردن آیدی کاربر دنبال‌شونده به لیست followings کاربر دنبال‌کننده در دیتابیس
                await user.updateOne({ $push: { followings: followedUserInfo.id } })

                return { user, currentUser }
            }
            else {
                throw new Error("You have already followed this user");
            }
        }
        catch (error) {
            throw error
        }
    }
}