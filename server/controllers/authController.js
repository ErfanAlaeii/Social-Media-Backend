import { loginUser, registerUser } from '../services/authService.js';


//ثبت نام 

export const register = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    try {
        //ما اطلاعاتی که از بدنه ی درخواست گرفتیم میدیم به تابع سرویس ثبت نام 
        const newUser = await registerUser(username, email, password)

        //یک نسخه کپی به صورت شی جاوا اسکریپتی از چیزی که داخل دیتابیس ذخیره کردم
        const savedUserObject = newUser.toObject()

        //فیلد پسوورد ازش حذف میکنم چون زمانی که میخوام اطلاعت کاربر برگردانم نباید این داخلش باشه
        delete savedUserObject.password

        res.status(200).json({
            savedUserObject,
            message: "User has been registered successfully."
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            error: error,
            message: "Error Occurred Registering User"
        })
    }
}


export const login = async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    try {
        const { user, token } = await loginUser(email, password, role)

        return res.status(200).json({
            message: "Login successful",
            user,
            token
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error occurred login user" })
    }
}
