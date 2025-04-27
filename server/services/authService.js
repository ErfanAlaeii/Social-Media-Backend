import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

//ثبت نام 
export const registerUser = async (username, email, password) => {

    //هش کردن رمز عبور
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword
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
        return res.status(401).json({ error: "Invalid Password" })
    }

    const payload = {
        id:user.id,
        email:user.email
    }

    const token = jwt.sign(payload,jwtSecret,{expiresIn:'1h'})

    const userObject = user.toObject()

    delete userObject.password

    return {user:userObject,token}

}

