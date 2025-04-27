import mongoose from "mongoose"


export const dbConnect = ()=>{
    try {
        mongoose.connect(process.env.DB_URL)
        console.log("Database has been connected Successfully")
    } catch (error) {
        console.error(error)
    }
} 