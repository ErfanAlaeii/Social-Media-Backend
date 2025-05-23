import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

//ثبت نام 
export const registerUser = async (username, email, password, role) => {

    //هش کردن رمز عبور
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
        role:role
    })
    // ذخیره اطلاعات کاربر در دیتابیس
    await newUser.save()

    return newUser


}


export const loginUser = async (email, password) => {
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ meesage: "USer not found ...." })
    }
    const trimmedPassword = password.trim();

    const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!passwordMatch) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const payload = {
        id:user.id,
        email:user.email,
        role:user.role
    }

    const token = jwt.sign(payload,jwtSecret,{expiresIn:'1h'})

    const userObject = user.toObject()

    delete userObject.password

    return {user:userObject,token}

}

