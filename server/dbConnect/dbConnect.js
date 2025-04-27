import mongoose from "mongoose"

export const dbConnect = ()=>{
    try {
        mongoose.connect()
        console.log(process.env.DB_URL)
    } catch (error) {
        console.error(error)
    }
} 