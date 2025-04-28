import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET;

export const authmiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." })
    }
    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()
    }
    catch (error) {
        console.error("JWT Verification Error:", error.message);
        console.error("JWT Verification Error Name:", error.name);
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

export const checkAdminRole = async (req, res, next) => {
    if (req.user.role === "admin"){
        next()
    }
    else{
        return res.status(403).json({message:"Access denied. Admins only."})
    }
}